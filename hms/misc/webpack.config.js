const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // мод в котором делается сборка. Для production применяются оптимизации, для development добавляется функционал для удобной разработки
  mode: 'development',
  // начальный файл проекта, с которого начинается сборка
  entry: './src/index.tsx',

  module: {
    // массив лоадеров, т.к. webpack умеет собирать только JS файлы,
    // то нам нужны для каждого отличного от JS файла лоадер, который научит webpack работать с соответствующим расширением
    rules: [
      // лоадер, который учит работать с .ts и .tsx файлами
      {
        // test - какие файлы должен обрабатывать лоадер
        test: /\.tsx?$/,
        // use - название лоадера
        use: 'ts-loader',
        // test - какие файлы должен игнорировать лоадер
        exclude: /node_modules/,
      },
      // лоадер, который учит работать с .css файлами
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  // плагины – это дополнительная логика для нашего проекта
  plugins: [
    // HtmlWebpackPlugin позволяет не просто собирать все файлы в один, но и вставлять этот единственный файл в html в тег <script>
    new HtmlWebpackPlugin({
      // шаблон в который будем вставлять наш скрипт
      template: './public/index.html'
    }),
    // CleanWebpackPlugin - при новой сборке очищает папки от мусора, оставшегося с предыдущих сборок
    new CleanWebpackPlugin(),
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },

  devServer: {
    historyApiFallback: true,
  },
}
