import { Branch } from "./branch.js";
import {
  BRANCH_COLORS,
  FLOWER_COLORS,
  MAX_ANGLE_DIFF,
  MIN_ANGLE_DIFF,
  TREE_LEVEL,
} from "./constants.js";

export class Tree {
  constructor(ctx, posX, posY, size) {
    this.ctx = ctx;
    this.posX = posX;
    this.posY = posY;
    this.size = size;
    this.color =
      BRANCH_COLORS[Math.floor(Math.random() * BRANCH_COLORS.length)];
    this.branches = [];
    this.depth = TREE_LEVEL;
    this.animation = 0;
    this.drawingDepth = 0;

    // add blank branch lists per branch depth
    for (let i = 0; i < this.depth; i++) {
      this.branches.push([]);
    }

    // initial branch creation & draw
    this.createBranch(this.posX, this.posY, -Math.PI / 2, 0);
    this.draw(this.ctx);
  }

  createBranch(startX, startY, angle, depth) {
    if (depth === this.depth) return;

    const length =
      depth === 0
        ? this.random(this.size, this.size * 1.5)
        : depth === this.depth - 1
        ? this.random(this.size * 0.3, this.size * 0.5) *
          ((this.depth - depth) / this.depth)
        : this.random(this.size * 0.4, this.size) *
          ((this.depth - depth) / this.depth);

    const endX = startX + Math.cos(angle) * length;
    const endY = startY + Math.sin(angle) * length;

    // add color on last branches
    this.branches[depth].push(
      new Branch(
        startX,
        startY,
        endX,
        endY,
        depth,
        this.size,
        depth === this.depth - 1
          ? FLOWER_COLORS[Math.floor(Math.random() * FLOWER_COLORS.length)]
          : this.color
      )
    );

    this.createBranch(
      endX,
      endY,
      angle + this.random(MIN_ANGLE_DIFF, MAX_ANGLE_DIFF),
      depth + 1
    );
    this.createBranch(
      endX,
      endY,
      angle - this.random(MIN_ANGLE_DIFF, MAX_ANGLE_DIFF),
      depth + 1
    );
  }

  draw() {
    if (this.drawingDepth == this.depth) {
      cancelAnimationFrame(this.animation);
      return;
    }
    let done = false;

    for (let i = 0; i < this.branches[this.drawingDepth].length; i++) {
      done = this.branches[this.drawingDepth][i].draw(this.ctx);
    }
    if (done) {
      this.drawingDepth++;
    }

    this.animation = requestAnimationFrame(this.draw.bind(this));
  }

  random(min, max) {
    const d = max - min;
    return min + Math.random() * d;
  }
}
