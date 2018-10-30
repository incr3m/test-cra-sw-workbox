const nanoid = require("nanoid");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");
// const { echo } = require("async-shelljs");

const swConfig = {
  version: nanoid()
};

process.env["NODE_ENV"] = "production";
process.env["NODE_PATH"] = "./src";
// process.env["REACT_APP_RAND_HASH"] = swConfig.version;

// var BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;

// echo(JSON.stringify(swConfig)).to("server/sw-config.json");

const webpackConfigProd = require("react-scripts/config/webpack.config.prod");

// webpackConfigProd.plugins.push(
//   new BundleAnalyzerPlugin({
//     analyzerMode: "static",
//     reportFilename: "report.html"
//   })
// );

// webpackConfigProd.resolve.alias["@ant-design/icons"] = "purched-antd-icons";
let generateSwIdx;
webpackConfigProd.plugins.forEach((p, i) => {
  if (p.constructor.name === "GenerateSW") {
    generateSwIdx = i;
  }
});

if (generateSwIdx) webpackConfigProd.plugins.splice(generateSwIdx, 1);

webpackConfigProd.plugins.push(
  new WorkboxWebpackPlugin.GenerateSW({
    clientsClaim: true,
    skipWaiting: true,
    exclude: [/\.map$/, /asset-manifest\.json$/],
    importWorkboxFrom: "cdn",
    cacheId: "sw-app",
    navigateFallback: "/index.html",
    navigateFallbackBlacklist: [
      // Exclude URLs starting with /_, as they're likely an API call
      new RegExp("^/_"),
      // Exclude URLs containing a dot, as they're likely a resource in
      // public/ and not a SPA route
      new RegExp("/[^/]+\\.[^/]+$")
    ],
  })
);

require("react-scripts/scripts/build");
