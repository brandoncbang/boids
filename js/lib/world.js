export class World {
  /** @type {Entity[]} */
  entities = [];

  /**
   * @param {object} params
   * @param {Rect} params.bounds
   */
  constructor(params) {
    this.bounds = params.bounds;
  }

  /**
   * @param {Entity} entities
   */
  add(...entities) {
    this.entities.push(...entities);
  }

  /**
   * @param {number} delta
   */
  tick(delta) {
    for (const entity of this.entities) {
      entity.process(delta);
    }
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const entity of this.entities) {
      entity.draw(ctx);
    }
  }
}

export class Entity {
  /** @type {string} */
  id;

  /**
   * @param {number} delta
   * @param {World} world
   */
  process(delta, world) {
    // ...
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    // ...
  }
}
