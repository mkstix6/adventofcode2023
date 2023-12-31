import { assertEquals } from "https://deno.land/std@0.209.0/assert/mod.ts";
import {
  calcRaceDistance,
  formatRaceRecords,
  raceWinnings,
  computeAnswerDay6Part1,
} from "./main.ts";

const testRaceDuration = 7;

const testRecords = `Time:      7  15   30
Distance:  9  40  200`;
const testPart1Answer = 288;

const testRecordsFormatted = [
  { raceDuration: 7, distance: 9 },
  { raceDuration: 15, distance: 40 },
  { raceDuration: 30, distance: 200 },
];

Deno.test(function calcRaceDistanceTest() {
  assertEquals(calcRaceDistance(testRaceDuration, 0), 0);
  assertEquals(calcRaceDistance(testRaceDuration, 1), 6);
  assertEquals(calcRaceDistance(testRaceDuration, 2), 10);
  assertEquals(calcRaceDistance(testRaceDuration, 3), 12);
  assertEquals(calcRaceDistance(testRaceDuration, 4), 12);
  assertEquals(calcRaceDistance(testRaceDuration, 5), 10);
  assertEquals(calcRaceDistance(testRaceDuration, 6), 6);
  assertEquals(calcRaceDistance(testRaceDuration, 7), 0);
});

Deno.test(function formatRaceRecordsTest() {
  assertEquals(formatRaceRecords(testRecords), testRecordsFormatted);
});

Deno.test(function raceWinningsTest() {
  assertEquals(raceWinnings({ raceDuration: 7, distance: 9 }), 4);
  assertEquals(raceWinnings({ raceDuration: 15, distance: 40 }), 8);
  assertEquals(raceWinnings({ raceDuration: 30, distance: 200 }), 9);
});

Deno.test(function computeAnswerDay6Part1Test() {
  assertEquals(computeAnswerDay6Part1(testRecords), testPart1Answer);
});
