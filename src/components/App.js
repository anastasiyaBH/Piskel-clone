import Canvas from './Canvas/Canvas';
import Pen from './Tools/Pen';

export default class App {
  constructor () {
  }

  start () {
    const canvas = new Canvas();
    const pen = new Pen(canvas);
    pen.set();
  }
}
