import { ANIMATION_FRAME, LINE_WIDTH, LINE_WIDTH_RATIO } from "./constants.js";

export class Branch {
  constructor(startX, startY, endX, endY, depth, treeSize, color) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.depth = depth;
    this.treeSize = treeSize;
    this.color = color;

    this.frame = ANIMATION_FRAME;
    this.currentFrame = 0;

    // coordinate gap for one frame
    this.gapX = (this.endX - this.startX) / this.frame;
    this.gapY = (this.endY - this.startY) / this.frame;

    // current line end position for animation
    this.currentX = this.startX;
    this.currentY = this.startY;
  }

  draw(ctx) {
    // return true when the branch drawing finished
    if (this.currentFrame === this.frame) return true;

    this.currentX += this.gapX;
    this.currentY += this.gapY;

    ctx.beginPath();

    ctx.moveTo(this.startX, this.startY); // start position
    ctx.lineTo(this.currentX, this.currentY); // end position

    ctx.lineWidth = LINE_WIDTH[this.depth] * this.treeSize * LINE_WIDTH_RATIO;

    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;

    ctx.stroke();
    ctx.closePath();

    this.currentFrame++;
    return false;
  }
}
