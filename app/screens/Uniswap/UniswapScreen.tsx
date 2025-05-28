import { useRef, useState, useCallback } from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";
import { useWalletStore } from "@/stores/walletStore";
import { ethers } from "ethers";
import {
  getDefaultNetwork,
  getChainHex,
  getNetworkVersion,
} from "@/utils/networkUtils";
import { SUPPORTED_NETWORKS } from "@/config/networks";
import type { NetworkConfig } from "@/config/networks";

const UNISWAP_URL = "https://app.uniswap.org/#/swap";

export default function UniswapScreen() {
  const webviewRef = useRef<WebView | null>(null);
  const { mnemonic, address } = useWalletStore();
  const [currentNetwork, setCurrentNetwork] = useState(getDefaultNetwork());
  const [chainId, setChainId] = useState(
    currentNetwork ? getChainHex(currentNetwork) : "0x1"
  );
  const [networkVersion, setNetworkVersion] = useState(
    currentNetwork ? getNetworkVersion(currentNetwork) : "1"
  );
  const [provider, setProvider] = useState(
    currentNetwork
      ? new ethers.providers.JsonRpcProvider(currentNetwork.rpcUrl)
      : null
  );
  const [walletWithProvider, setWalletWithProvider] = useState(
    mnemonic && provider
      ? ethers.Wallet.fromMnemonic(mnemonic).connect(provider)
      : null
  );

  // Helper to update all network-related state
  const updateNetwork = useCallback(
    (network: NetworkConfig) => {
      setCurrentNetwork(network);
      setChainId(getChainHex(network));
      setNetworkVersion(getNetworkVersion(network));
      const newProvider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
      setProvider(newProvider);
      setWalletWithProvider(
        mnemonic
          ? ethers.Wallet.fromMnemonic(mnemonic).connect(newProvider)
          : null
      );
    },
    [mnemonic]
  );

  // provider 주입 + 사이트별 허용(permissions) 상태를 localStorage에 저장/불러오기 + 자동 연결 트리거
  const getInjectedJS = (
    address: string,
    chainId: string,
    networkVersion: string
  ) => `
    (function() {
      const oldLog = console.log;
      console.log = function(...args) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'WEBVIEW_CONSOLE_LOG',
          args
        }));
        oldLog.apply(console, args);
      };
      let allowed = false;
      try {
        allowed = window.localStorage.getItem('wallet_allowed') === 'true';
      } catch (e) {}
      window.ethereum = {
        isMetaMask: true,
        isWalletConnect: false,
        selectedAddress: "${address}",
        chainId: "${chainId}",
        networkVersion: "${networkVersion}",
        isConnected: () => allowed,
        enable: function() { return this.request({ method: 'eth_requestAccounts' }); },
        request: (args) => {
          return new Promise((resolve) => {
            if (args.method === 'eth_accounts') {
              resolve(allowed ? [window.ethereum.selectedAddress] : []);
            } else if (args.method === 'eth_requestAccounts') {
              if (!allowed) {
                allowed = true;
                try { window.localStorage.setItem('wallet_allowed', 'true'); } catch (e) {}
                window.ethereum.selectedAddress = "${address}";
                if (typeof window.ethereum._onAccountsChanged === 'function') {
                  window.ethereum._onAccountsChanged([window.ethereum.selectedAddress]);
                }
                window.dispatchEvent(new Event('accountsChanged'));
              }
              resolve([window.ethereum.selectedAddress]);
            } else if (args.method === 'eth_chainId') {
              resolve("${chainId}");
            } else if (args.method === 'net_version') {
              resolve("${networkVersion}");
            } else {
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: "METAMASK_REQUEST",
                args
              }));
              window.addEventListener('metamask-session', (event) => {
                resolve(event.detail);
              }, { once: true });
            }
          });
        },
        on: function(event, handler) {
          if (event === 'accountsChanged') {
            window.ethereum._onAccountsChanged = handler;
          }
        },
        removeListener: function(event) {
          if (event === 'accountsChanged') {
            window.ethereum._onAccountsChanged = null;
          }
        },
        autoRefreshOnNetworkChange: false,
        _events: {},
        _state: {},
        _onAccountsChanged: null,
      };
      window.web3 = { currentProvider: window.ethereum };
      window.localStorage.setItem('wallet_allowed', 'true');
    })();
    true;
  `;

  // dApp에서 오는 요청 처리 + WebView console.log 처리
  const handleWebViewMessage = async (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === "WEBVIEW_CONSOLE_LOG") {
        console.log("[WebView]", ...data.args);
        return;
      }
      console.log("data", data);
      if (!walletWithProvider) return;
      if (data && data.type === "METAMASK_REQUEST") {
        let result = null;
        const { method, params } = data.args;
        if (method === "personal_sign") {
          const message = params[0];
          result = await walletWithProvider.signMessage(message);
        } else if (method === "eth_sign") {
          const message = params[1];
          result = await walletWithProvider.signMessage(message);
        } else if (method === "eth_sendTransaction") {
          try {
            const txRequest = { ...params[0] };
            if (
              txRequest.from &&
              txRequest.from.toLowerCase() !==
                walletWithProvider.address.toLowerCase()
            ) {
              throw new Error("From address does not match wallet");
            }
            // gas → gasLimit 변환
            if (txRequest.gas) {
              txRequest.gasLimit = txRequest.gas;
              delete txRequest.gas;
            }
            // chainId 제거 (ethers가 provider의 chainId 사용)
            if (txRequest.chainId) {
              delete txRequest.chainId;
            }
            const { from, ...txData } = txRequest;
            const txResponse = await walletWithProvider.sendTransaction(txData);
            result = txResponse.hash;
          } catch (err) {
            console.error("Auto-sign tx error:", err);
            result = null;
          }
        } else if (method === "wallet_switchEthereumChain") {
          try {
            const requestedChainId = params[0]?.chainId;
            const found = SUPPORTED_NETWORKS.find(
              (n) => n.chainHex.toLowerCase() === requestedChainId.toLowerCase()
            );
            if (!found) throw new Error("Unsupported chainId");
            updateNetwork(found);
            // Re-inject provider info to WebView
            if (webviewRef.current) {
              webviewRef.current.injectJavaScript(
                getInjectedJS(
                  address || "",
                  getChainHex(found),
                  getNetworkVersion(found)
                )
              );
            }
            result = { chainId: getChainHex(found) };
          } catch (err) {
            console.error("Network switch error:", err);
            result = null;
          }
        } else if (method === "eth_blockNumber") {
          try {
            if (!provider) throw new Error("No provider");
            const blockNumber = await provider.getBlockNumber();
            result = "0x" + blockNumber.toString(16);
          } catch (err) {
            console.error("eth_blockNumber error:", err);
            result = null;
          }
        } else if (method === "eth_getTransactionByHash") {
          try {
            if (!provider) throw new Error("No provider");
            const txHash = params[0];
            const tx = await provider.getTransaction(txHash);
            // ethers.js returns null if not found
            result = tx ? { ...tx } : null;
          } catch (err) {
            console.error("eth_getTransactionByHash error:", err);
            result = null;
          }
        } else {
          result = null;
        }
        if (webviewRef.current) {
          webviewRef.current.injectJavaScript(`
            window.dispatchEvent(new CustomEvent('metamask-session', {
              detail: ${JSON.stringify(result)}
            }));
          `);
        }
      }
    } catch (e) {
      if (webviewRef.current) {
        webviewRef.current.injectJavaScript(`
          window.dispatchEvent(new CustomEvent('metamask-session', {
            detail: null
          }));
        `);
      }
    }
  };

  return (
    <View className="flex-1 bg-white">
      <WebView
        ref={webviewRef}
        source={{ uri: UNISWAP_URL }}
        style={{ flex: 1 }}
        originWhitelist={["*"]}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        injectedJavaScriptBeforeContentLoaded={getInjectedJS(
          address || "",
          chainId,
          networkVersion
        )}
        onMessage={handleWebViewMessage}
      />
    </View>
  );
}
