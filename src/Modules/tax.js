/**
 * Calculates Income Tax (this will be show in index.ts when we hover on function)
 * @param {number} value
 * @returns {number}
 */
export function tax(value) {
  return value * 1.3;
}

// we can export js file and import it to ts file
// but we should enable allowJs in tsconfig file
