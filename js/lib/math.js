export function randomInt(min, max) {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min),
  );
}

export class Vector2 {
  static ZERO = new Vector2(0.0, 0.0);
  static UP = new Vector2(0.0, -1.0);

  /**
   * @param {number} x
   * @param {number} y
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get angle() {
    return Math.atan2(this.y, this.x) * 180 / Math.PI;
  }

  /**
   * @param {Vector2} value
   * @return Vector2
   */
  add(value) {
    return new Vector2(
      this.x + value.x,
      this.y + value.y,
    );
  }

  /**
   * @param {Vector2} value
   * @return Vector2
   */
  sub(value) {
    return new Vector2(
      this.x - value.x,
      this.y - value.y,
    );
  }

  /**
   * @param {number} value
   * @return Vector2
   */
  mult(value) {
    return new Vector2(
      this.x * value,
      this.y * value,
    );
  }

  /**
   * @param {number} value
   * @return Vector2
   */
  div(value) {
    return new Vector2(
      this.x / value,
      this.y / value,
    );
  }

  rotated(degrees) {
    return new Vector2(
      this.x * Math.cos(degrees) - this.y * Math.sin(degrees),
      this.x * Math.sin(degrees) + this.y * Math.cos(degrees),
    );
  }

  /**
   * @param {Vector2} v
   */
  distanceTo(v) {
    return Math.sqrt((v.x - this.x) ** 2 + (v.y - this.y) ** 2);
  }
}

export class Rect {
  /**
   * @param {number} x
   * @param {number} y
   * @param {number} width
   * @param {number} height
   */
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /**
   * @param {Vector2} point
   * @return boolean
   */
  contains(point) {
    return point.x >= this.x
      && point.x < this.x + this.width
      && point.y >= this.y
      && point.y < this.y + this.height;
  }
}
