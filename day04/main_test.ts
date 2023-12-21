import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { cleanUpInput, computeMatches, part1 } from "./part1.ts";

const testInput = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const cleanInputGames = [
  {
    card: 1,
    winners: [41, 48, 83, 86, 17],
    matchers: [83, 86, 6, 31, 17, 9, 48, 53],
  },
  {
    card: 2,
    winners: [13, 32, 20, 16, 61],
    matchers: [61, 30, 68, 82, 17, 32, 24, 19],
  },
  {
    card: 3,
    winners: [1, 21, 53, 59, 44],
    matchers: [69, 82, 63, 72, 16, 21, 14, 1],
  },
  {
    card: 4,
    winners: [41, 92, 73, 84, 69],
    matchers: [59, 84, 76, 51, 58, 5, 54, 83],
  },
  {
    card: 5,
    winners: [87, 83, 26, 28, 32],
    matchers: [88, 30, 70, 12, 93, 22, 82, 36],
  },
  {
    card: 6,
    winners: [31, 18, 13, 56, 72],
    matchers: [74, 77, 10, 23, 35, 67, 36, 11],
  },
];

const testChecks = [
  { card: 1, matches: [48, 83, 17, 86], points: 8 },
  { card: 2, matches: [32, 61], points: 2 },
  { card: 3, matches: [1, 21], points: 2 },
  { card: 4, matches: [84], points: 1 },
  { card: 5, matches: [], points: 0 },
  { card: 6, matches: [], points: 0 },
];

Deno.test(function cleanUpInputTest() {
  assertEquals(cleanUpInput(2, 3), 5);
});
Deno.test(function computeMatchesTest() {
  assertEquals(computeMatches(2, 3), 5);
});
Deno.test(function part1Test() {
  assertEquals(part1(2, 3), 5);
});
