import Post from '@models/Post';
import './styles/styles.css';
import './styles/test.scss';
import './babel'
import './ts_1'
import json from './assets/test.json';
import WebpackLogo from './assets/webpackLogo.png';

const post = new Post('Webpack title course', WebpackLogo);
console.log(post.toString());
console.log("Json", json);

class Util {
  static id = Date.now();
}

console.log(Util.id);
import('lodash').then( _ => {
  console.log('Lodash',  _.random(0, 42, true));
})
