import Canvas from './Canvas/Canvas';
import Pen from './Tools/Pen';
import Eraser from './Tools/Eraser';
import ToolsWrapper from './containers/ToolsWrapper'
import PaintBucket from './Tools/PaintBucket'
import ColorSelector from './Tools/ColorSelector'

export default class App {
  constructor () {
  }

  start () {
    const canvas = new Canvas();

    const toolsWrapper = new ToolsWrapper();

    const pen = new Pen(canvas), eraser = new Eraser(canvas), paintBucket = new PaintBucket(canvas);
    const colorS = new ColorSelector();

    colorS.set();
    pen.set();
    eraser.set();
    paintBucket.set();

    toolsWrapper.set();
  }
}
