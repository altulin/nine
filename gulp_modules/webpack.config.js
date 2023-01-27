import TerserPlugin from "terser-webpack-plugin";

const getConfig = (mode) => {
  return {
    mode: "production",
    optimization: {
      minimize: mode,
      minimizer: [new TerserPlugin({})],
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: "/node_modules/",
          loader: "babel-loader",
        },
      ],
    },
    performance: {
      hints: false,
    },

    // devtool: 'eval-source-map'
  };
};

export default getConfig;
