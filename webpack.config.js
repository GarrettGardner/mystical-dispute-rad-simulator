const path = require('path');

module.exports = (env) => {
  let config = {
    entry: "./src/index.tsx",
    devtool: 'inline-source-map',
    mode: "development",
    output: {
      path: path.join(__dirname, 'dev/assets/javascript'),
      filename: "app.js"
    },
    resolve: {
      extensions: ['.Webpack.js', '.web.js', '.ts', '.js', '.jsx', '.tsx']
    },
    module: {
      rules: [
        {
          test: /\.tsx$/,
          exclude: /(node_modules|bower_components)/,
          use: {
              loader: 'ts-loader'
          }
        },
        {
          test: /\.ts$/,
          exclude: /(node_modules|bower_components)/,
          use: {
              loader: 'ts-loader'
          }
        }
      ]
    },
    plugins: []
  };

  if (env.env == "prod") {
      config["mode"] = "production";
      config["devtool"] = false;
      config["output"]["path"] = path.join(__dirname, 'dist/assets/javascript');
  }

  return config;
};
