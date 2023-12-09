import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { add } from "./main.ts";

const testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

Deno.test(function addTest() {
  assertEquals(add(2, 3), 5);
});
