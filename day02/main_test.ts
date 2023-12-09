import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";
import { cleanInput } from "./main.ts";

const testInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;

const testInputClean = [
  {
    gameNumber: 1,
    red: 4,
    green: 2,
    blue: 6,
  },
  {
    gameNumber: 2,
    green: 3,
    blue: 4,
    red: 1,
  },
  {
    gameNumber: 3,
    green: 13,
    blue: 6,
    red: 20,
  },
  {
    gameNumber: 4,
    green: 3,
    red: 14,
    blue: 15,
  },
  {
    gameNumber: 5,
    red: 6,
    blue: 2,
    green: 3,
  },
];

const testPossibleGames = [2, 3, 5];

const testPossibleSum = 8;

const testBag = { red: 12, green: 13, blue: 14 };

Deno.test(function cleanInputTest() {
  const games = testInput.split("\n");
  games.forEach((game, index) => {
    assertEquals(cleanInput(game), testInputClean[index]);
  });
});
