import { Vector2 } from '/js/lib/math.js';
import { Entity } from '/js/lib/world.js';

export class Boid extends Entity {
  static SPEED = 150.0;
  static TURN_SPEED = 5.0;
  static SIGHT_DISTANCE = 50.0;
  static FLOCK_DISTANCE = 50.0;
  static AVOID_DISTANCE = 25.0;

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
    const steerTowards = (direction, weight = 1.0) => {
      if (this.direction.angle > direction.angle) {
        this.direction = this.direction.rotated(-Boid.TURN_SPEED * weight * delta);
      }
      if (this.direction.angle < direction.angle) {
        this.direction = this.direction.rotated(Boid.TURN_SPEED * weight * delta);
      }
    };

    const checkPosition = this.position.add(
      this.direction.mult(Boid.SIGHT_DISTANCE),
    );

    /** @type {Boid[]} */
    const flockmates = world.entities.filter(e => {
      return e instanceof Boid
        && this.position.distanceTo(e.position) <= Boid.FLOCK_DISTANCE;
    });

    if (flockmates.length > 0 && world.bounds.contains(checkPosition)) {
      // Avoid flockmates
      const averageFlockmateRelativePosition = flockmates
        .filter(flockmate => this.position.distanceTo(flockmate.position) <= Boid.AVOID_DISTANCE)
        .reduce((sum, flockmate) => sum.add(flockmate.position.sub(this.position)), Vector2.ZERO)
        .div(flockmates.length);

      steerTowards(averageFlockmateRelativePosition.mult(-1), 1.0);

      // Align with flockmates
      const averageFlockmateDirection = flockmates
        .reduce((sum, flockmate) => sum.add(flockmate.direction), Vector2.ZERO)
        .div(flockmates.length);

      steerTowards(averageFlockmateDirection, 0.5);

      const flockmateCenterOfMass = flockmates
        .reduce((sum, flockmate) => sum.add(flockmate.position), Vector2.ZERO)
        .div(flockmates.length);

      steerTowards(flockmateCenterOfMass.sub(this.position), 0.5);
    }

    // Avoid bounds
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
