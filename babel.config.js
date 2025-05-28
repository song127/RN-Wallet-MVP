module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blocklist: null,
          allowlist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      [
        "module-resolver",
        {
          root: ["./app"],
          alias: {
            "@/components": "./app/components",
            "@/config": "./app/config",
            "@/domain": "./app/domain",
            "@/hooks": "./app/hooks",
            "@/infra": "./app/infra",
            "@/navigation": "./app/navigation",
            "@/plugins": "./app/plugins",
            "@/screens": "./app/screens",
            "@/stores": "./app/stores",
            "@/theme": "./app/theme",
            "@/utils": "./app/utils",
          },
        },
      ],
    ],
  };
};
