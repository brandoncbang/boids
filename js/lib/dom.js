/**
 * @param {string} selector
 * @return CanvasRenderingContext2D
 */
export function useCanvas(selector) {
  /** @type {HTMLCanvasElement} */
  const canvas = document.querySelector(selector);

  canvas.width = canvas.getBoundingClientRect().width;
  canvas.height = canvas.getBoundingClientRect().height;

  return canvas.getContext('2d');
}
