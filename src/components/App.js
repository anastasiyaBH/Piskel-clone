import Canvas from './canvas/Canvas';
import Pen from './tools/Pen';
import Eraser from './tools/Eraser';
import ToolsWrapper from './containers/ToolsWrapper'
import PaintBucket from './tools/PaintBucket'
import ColorSelector from './tools/ColorSelector'
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
