import path from 'path';// importamos la libreria para obtener el directorio raiz del proyecto

var ExtractTextPlugin = require('extract-text-webpack-plugin');// plugin para extraer el contenido css de la aplicacion
const extractCSS = new ExtractTextPlugin({// declaracion para el uso del plugin
      filename : (getPath) => {
      return getPath('css/[name].css').replace('js/css', 'css');
    },
      allChunks: true,
   });

const webpack = require('webpack');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({name : 'commons', filename : 'js/common.js'});// se implementa el plugin
                                                                                                            // para el uso de un common js


export default () => ({
  entry:{// directorios de entrada
    index :path.join(__dirname, 'src/index.js'),
  },
  output: {// archivos de salida
    path: path.join(__dirname,'/build'),
    filename: 'js/[name].js',
  },
  module: {// declaracion de modulos
    rules: [
      {// reglas para la interpretacion del codigo Javascript usando ES6, React y Redux
        test: /.js?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
              presets: [
                ['es2015', { modules: false }],
                'react',
                'stage-2',
              ],
            }
          }
        ]
      },
      {// reglas para la interpretacion de las hojas de estilo CSS y  SASS
          test: /\.scss$/,
          loader: extractCSS.extract('css-loader!sass-loader'),
        },
        {
          test: /\.css$/,
          loader:extractCSS.extract('style-loader', 'css-loader!'),
        },
    ]
  },
  // Aplicacion de los plugins antes declarados
  plugins: [extractCSS,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    commonsPlugin],
  devServer: {// uso del server
      contentBase: './build',
      hot: false,
    },
});
