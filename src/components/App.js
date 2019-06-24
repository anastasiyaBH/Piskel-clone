import Canvas from './Canvas/Canvas';
import Pen from './Tools/Pen';
import Eraser from './Tools/Eraser';
import ToolsWrapper from './containers/ToolsWrapper'
import PaintBucket from './Tools/PaintBucket'
import ColorSelector from './Tools/ColorSelector'
import AplicationActionWrapper from './containers/AplicationActionWrapper'
import Resize from './aplication-action/Resize'
import FrameWrapper from './containers/FrameWrapper'

export default class App {
  constructor () {
  }

  start () {
    const canvas = new Canvas();

    const toolsWrapper = new ToolsWrapper();
    const actionWrapper = new AplicationActionWrapper();
    const frameWrapper = new FrameWrapper(canvas);
    frameWrapper.set();

    const pen = new Pen(canvas), eraser = new Eraser(canvas), paintBucket = new PaintBucket(canvas);
    const colorS = new ColorSelector();

    const resize = new Resize();


    colorS.set();
    pen.set();
    eraser.set();
    paintBucket.set();

    resize.set();

    actionWrapper.set();
    toolsWrapper.set();
  }

}
