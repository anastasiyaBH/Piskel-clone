import Canvas from './canvas/Canvas';
import Pen from './tools/Pen';
import Eraser from './tools/Eraser';
import ToolsWrapper from './containers/ToolsWrapper'
import PaintBucket from './tools/PaintBucket'
import ColorSelector from './tools/ColorSelector'
import AplicationActionWrapper from './containers/AplicationActionWrapper'
import Resize from './application-action/Resize'
import FrameWrapper from './containers/FrameWrapper'
import Preview from '../components/preview/Preview'
import PaintSamePixels from './tools/PaintSamePixels'
import Rectangle from './tools/Rectangle'
import Circle from './tools/Circle'
import Stroke from './tools/Stroke'
import Lighten from './tools/Lighten'
import CanvasInfo from './canvas-info/CanvasInfo';
import Move from './tools/Move'

export default class App {
  constructor () {
  }

  start () {

    const loadingWindow = document.querySelector('.loading-window');
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        loadingWindow.classList.add('hidden')}, 700);
    });

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
    const circle = new Circle(canvas);
    const stroke = new Stroke(canvas);
    const lighten = new Lighten(canvas);
    const move = new Move(canvas);

    const resize = new Resize(canvas);
    const canvasInfo = new CanvasInfo(canvas);

    colorS.set();
    pen.set();
    eraser.set();
    paintBucket.set();
    paintSamePixels.set();
    rectangle.set();
    circle.set();
    stroke.set();
    lighten.set();
    move.set();

    resize.set();
    canvasInfo.set();

    actionWrapper.set();
    toolsWrapper.set();
  }

}
