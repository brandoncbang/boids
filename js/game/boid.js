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

  process(delta, world) {
    // const checkPosition = this.position.add(
    //   this.direction.mult(100.0),
    // );

    // if (!world.bounds.contains(checkPosition)) {
    //   this.direction = this.direction.rotated(Boid.TURN_SPEED * delta);
    // }

    this.direction = this.direction.rotated(2.5 * delta);

    this.position = this.position.add(
      this.direction.mult(Boid.SPEED * delta),
    );
  }

  draw(ctx) {
    // TODO: Maybe move wrapped save() and restore() methods before and after calling draw() for each boid.
    ctx.save();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(this.direction.angle * Math.PI / 180.0 + 90);
    ctx.fillStyle = 'red';
    ctx.fillRect(-4.0, -8.0, 8.0, 8.0);
    ctx.fillRect(-8.0, 0.0, 16.0, 8.0);
    ctx.restore();
  }
}
