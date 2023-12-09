export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  // any number adjacent to a symbol, even diagonally, is a "part number"

  // add up all the part numbers in the engine schematic

  console.log("Add 2 + 3 =", add(2, 3));
}
