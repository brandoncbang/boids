import { Vector2 } from '/js/lib/math.js';
import { Entity } from '/js/lib/world.js';

export class Boid extends Entity {
  static SPEED = 150.0;
  static TURN_SPEED = 5.0;

  /**
   * @param {object} params
   * @param {Vector2} params.position
   * @param {Vector2} [params.direction]
   */
  constructor(params) {
    super();

    this.position = params.position;
    this.direction = params.direction ?? Vector2.UP;
  }

  /**
   * @param {number} delta
   */
  process(delta) {
    this.position = this.position.add(
      this.direction.mult(Boid.SPEED * delta),
    );
  }

  /**
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    // TODO: Maybe move wrapped save() and restore() methods before and after calling draw() for each boid.
    ctx.save();
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x - 4.0, this.position.y - 8.0, 8.0, 8.0);
    ctx.fillRect(this.position.x - 8.0, this.position.y, 16.0, 8.0);
    ctx.restore();
  }
}
