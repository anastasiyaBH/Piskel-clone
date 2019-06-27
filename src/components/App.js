import Canvas from './canvas/Canvas';
import Pen from './tools/Pen';
import Eraser from './tools/Eraser';
import ToolsWrapper from './containers/ToolsWrapper'
import PaintBucket from './tools/PaintBucket'
import ColorSelector from './tools/ColorSelector'
import AplicationActionWrapper from './containers/AplicationActionWrapper'
import Resize from './aplication-action/Resize'
import FrameWrapper from './containers/FrameWrapper'
import Preview from '../components/preview/Preview'
import PaintSamePixels from './tools/PaintSamePixels'
import Rectangle from './tools/Rectangle'

export default class App {
  constructor () {
  }

  start () {
    const canvas = new Canvas();

    const toolsWrapper = new ToolsWrapper();
    const actionWrapper = new AplicationActionWrapper();
    const frameWrapper = new FrameWrapper(canvas);
    frameWrapper.set();

    const preview = new Preview (frameWrapper.getFrameList(), canvas);
    preview;


    const pen = new Pen(canvas), eraser = new Eraser(canvas), paintBucket = new PaintBucket(canvas);
    const paintSamePixels = new PaintSamePixels(canvas);
    const colorS = new ColorSelector();
    const rectangle = new Rectangle(canvas);

    const resize = new Resize();

    colorS.set();
    pen.set();
    eraser.set();
    paintBucket.set();
    paintSamePixels.set();
    rectangle.set();

    resize.set();

    actionWrapper.set();
    toolsWrapper.set();
  }

}
