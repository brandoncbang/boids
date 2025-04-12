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
      entity.process(delta, this);
    }
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (const entity of this.entities) {
      ctx.save();
      ctx.translate(entity.position.x, entity.position.y);
      entity.draw(ctx);
      ctx.restore();
    }
  }
}

export class Entity {
  /** @type {string} */
  id;

  /** @type {Vector2} */
  position;

  /**
   * @param params
   * @param {Vector2} params.position
   */
  constructor(params) {
    this.position = params.position;
  }

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
