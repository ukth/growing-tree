import {
  BACKGROUND_COLOR,
  MAX_TREE_SIZE_RATIO,
  MIN_TREE_SIZE_RATIO,
  CANVAS_UPPER_OFFSET,
} from "./constants.js";
import { Tree } from "./tree.js";

class App {
  constructor() {
    // create canvas element and render it on body
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);

    // create 2d canvas rendering context
    this.ctx = this.canvas.getContext("2d");

    // for retina display
    // this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    // bind this for callback func & add it on listener
    this.initScreen();

    // window.addEventListener("mousemove", this.addTree.bind(this));
    window.addEventListener("click", this.addTree.bind(this));
  }

  initScreen() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    // resize canvas as pixel ratio & width, height
    this.canvas.width = this.stageWidth; // * this.pixelRatio;
    this.canvas.height = this.stageHeight; // * this.pixelRatio;
    // this.ctx.scale(this.pixelRatio, this.pixelRatio);

    // clear canvas on resize
    this.ctx.fillStyle = BACKGROUND_COLOR;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  addTree(event) {
    let size =
      ((this.stageHeight - event.offsetY) /
        (this.stageHeight - CANVAS_UPPER_OFFSET)) *
      MAX_TREE_SIZE_RATIO;

    if (size > MAX_TREE_SIZE_RATIO) size = MAX_TREE_SIZE_RATIO;

    if (size < MIN_TREE_SIZE_RATIO) {
      size = MIN_TREE_SIZE_RATIO;
    }
    new Tree(
      this.ctx,
      event.offsetX,
      this.stageHeight,
      size * this.stageHeight
    );
  }
}

window.onload = () => {
  new App();
};
