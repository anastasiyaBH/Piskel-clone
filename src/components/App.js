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
import {shortcuts} from './shortcuts/shortcuts'
import ShortcatsPanel from './shortcuts/ShortcutsPanel'

export default class App {
  constructor() {
  }

  start() {

    const loadingWindow = document.querySelector('.loading-window');
    document.addEventListener('DOMContentLoaded', () => {
      setTimeout(() => {
        loadingWindow.classList.add('hidden')
      }, 700);
    });

    const canvas = new Canvas();
    canvas.setCanvasData();

    const toolsWrapper = new ToolsWrapper();
    const actionWrapper = new AplicationActionWrapper();

    // eslint-disable-next-line no-console
    console.log(canvas, canvas.getCanvas());
    let frameWrapper = new FrameWrapper(canvas);

    let data = localStorage.getItem('frameList');
    if (data != null) {
      let frameListObj = JSON.parse(data);
      for (let key in frameListObj) {
        let img = new Image;
        img.src = frameListObj[key];
        frameWrapper.addNewFrameFunction(img);
      }
    }

    frameWrapper.set();

    const preview = new Preview(frameWrapper.getFrameList(), canvas);
    preview.set();

    const pen = new Pen(canvas),
      eraser = new Eraser(canvas),
      paintBucket = new PaintBucket(canvas),
      paintSamePixels = new PaintSamePixels(canvas),
      colorSelector = new ColorSelector(),
      rectangle = new Rectangle(canvas),
      circle = new Circle(canvas),
      stroke = new Stroke(canvas),
      lighten = new Lighten(canvas),
      move = new Move(canvas),
      resize = new Resize(canvas),
      canvasInfo = new CanvasInfo(canvas);

    colorSelector.set();
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

    const shortcatsPanel = new ShortcatsPanel;
    shortcatsPanel.set();

    window.addEventListener('keydown', (event) => {
      switch (event.key) {
        case shortcuts['Pen tool'], shortcuts['Pen tool'].toLocaleLowerCase(): {
          pen.start();
          break;
        }
        case shortcuts['Circle'], shortcuts['Circle'].toLocaleLowerCase(): {
          circle.start();
          break;
        }
        case shortcuts['Eraser tool'], shortcuts['Eraser tool'].toLocaleLowerCase(): {
          eraser.start();
          break;
        }
        case shortcuts['Lighten'], shortcuts['Lighten'].toLocaleLowerCase(): {
          lighten.start();
          break;
        }
        case shortcuts['Move tool'], shortcuts['Move tool'].toLocaleLowerCase(): {
          move.start();
          break;
        }
        case shortcuts['Paint Bucket'], shortcuts['Paint Bucket'].toLocaleLowerCase(): {
          paintBucket.start();
          break;
        }
        case shortcuts['Paint same pixels'], shortcuts['Paint same pixels'].toLocaleLowerCase(): {
          paintSamePixels.start();
          break;
        }
        case shortcuts['Recangle'], shortcuts['Recangle'].toLocaleLowerCase(): {
          rectangle.start();
          break;
        }
        case shortcuts['Stroke tool'], shortcuts['Stroke tool'].toLocaleLowerCase(): {
          stroke.start();
          break;
        }
        case shortcuts['Swap Primary/Secondary color'], shortcuts['Swap Primary/Secondary color'].toLocaleLowerCase(): {
          colorSelector.swap();
          break;
        }
        default: {
          return;
        }
      }
    });

    window.onbeforeunload = () => {
      let frameListObj = {};
      frameWrapper.getFrameList().forEach((value, i) => {
        frameListObj[i] = value.getCanvasIcon().toDataURL();
      });
      localStorage.setItem('frameList', JSON.stringify(frameListObj));
    };
  }
}
