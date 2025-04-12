import { Boid } from '/js/game/boid.js';
import { useCanvas } from '/js/lib/dom.js';
import { useGameLoop } from '/js/lib/loop.js';
import { randomInt, Rect, Vector2 } from '/js/lib/math.js';
import { World } from '/js/lib/world.js';

/**
 * @param {string} canvasSelector
 */
function setUpApp(canvasSelector) {
  const ctx = useCanvas(canvasSelector);

  const world = new World({
    bounds: new Rect(0, 0, ctx.canvas.width, ctx.canvas.height),
  });

  for (let i = 0; i < 100; i++) {
    world.add(
      new Boid({
        position: new Vector2(
          randomInt(0, world.bounds.width),
          randomInt(0, world.bounds.height),
        ),
      }),
    );
  }

  const [start, onUpdate] = useGameLoop();

  onUpdate((delta) => {
    if (!document.hasFocus()) {
      return;
    }

    world.tick(delta);

    world.draw(ctx);
  });

  start();
}

setUpApp('#canvas');
