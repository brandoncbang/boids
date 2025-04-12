import { Boid } from '/js/game/boid.js';
import { useCanvas } from '/js/lib/dom.js';
import { useGameLoop } from '/js/lib/loop.js';
import { Rect, Vector2 } from '/js/lib/math.js';
import { World } from '/js/lib/world.js';

/**
 * @param {string} canvasSelector
 */
function setUpApp(canvasSelector) {
  const ctx = useCanvas('#canvas');

  const world = new World({
    bounds: new Rect(0, 0, canvas.width, canvas.height),
  });

  world.add(
    new Boid({
      position: new Vector2(50, 250),
    }),
    new Boid({
      position: new Vector2(100, 100),
    }),
  );

  const [start, onUpdate] = useGameLoop();

  onUpdate((delta) => {
    world.tick(delta);

    world.draw(ctx);
  });

  start();
}

setUpApp('#canvas');
