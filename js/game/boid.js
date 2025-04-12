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
    super(params);

    this.direction = params.direction ?? Vector2.UP;
  }

  process(delta, world) {
    const checkPosition = this.position.add(
      this.direction.mult(100.0),
    );

    if (!world.bounds.contains(checkPosition)) {
      this.direction = this.direction.rotated(Boid.TURN_SPEED * delta);
    }

    this.position = this.position.add(
      this.direction.mult(Boid.SPEED * delta),
    );
  }

  draw(ctx) {
    ctx.rotate((this.direction.angle + 90.0) * Math.PI / 180.0);

    ctx.fillStyle = 'gray';

    ctx.beginPath();
    ctx.moveTo(0, -8);
    ctx.lineTo(6, 8);
    ctx.lineTo(-6, 8);
    ctx.fill();
  }
}
