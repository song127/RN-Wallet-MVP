// Feature flag 사용 예시
import { isFeatureEnabled } from "./index";

export function isUniswapEnabled() {
  return isFeatureEnabled("enableUniswap");
}
