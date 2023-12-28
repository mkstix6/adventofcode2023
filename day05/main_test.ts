import { assertEquals } from "https://deno.land/std@0.209.0/assert/mod.ts";
import {
  extractSeedNumbers,
  processEntry,
  computeAnswerDay5Part1,
} from "./main.ts";

const testInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

const exampleSeeds = [79, 14, 55, 13];

const exampleSeedToSoilMap = `50 98 2
52 50 48`;

const processedExampleSeedToSoilMap = [
  {
    destinationRangeStart: 50,
    sourceRangeStart: 98,
    rangeLength: 2,
  },
  {
    destinationRangeStart: 52,
    sourceRangeStart: 50,
    rangeLength: 48,
  },
];

const exampleSeedToSoilMatches = [
  { seed: 79, soil: 81 },
  { seed: 14, soil: 14 },
  { seed: 55, soil: 57 },
  { seed: 13, soil: 13 },
];

const exampleSeedToLocationTracks = [
  {
    seed: 79,
    soil: 81,
    fertilizer: 81,
    water: 81,
    light: 74,
    temperature: 78,
    humidity: 78,
    location: 82,
  },
  {
    seed: 14,
    soil: 14,
    fertilizer: 53,
    water: 49,
    light: 42,
    temperature: 42,
    humidity: 43,
    location: 43,
  },
  {
    seed: 55,
    soil: 57,
    fertilizer: 57,
    water: 53,
    light: 46,
    temperature: 82,
    humidity: 82,
    location: 86,
  },
  {
    seed: 13,
    soil: 13,
    fertilizer: 52,
    water: 41,
    light: 34,
    temperature: 34,
    humidity: 35,
    location: 35,
  },
];

const exampleLowestLocationNumber = 35;

Deno.test(function extractSeedNumbersTest() {
  assertEquals(extractSeedNumbers(testInput), exampleSeeds);
});

Deno.test(function computeAnswerDay5Part1Test() {
  assertEquals(computeAnswerDay5Part1(testInput), exampleLowestLocationNumber);
});

Deno.test(function processEntryTest() {
  const entryLines = exampleSeedToSoilMap.split("\n");
  assertEquals(processEntry(entryLines[0]), processedExampleSeedToSoilMap[0]);
  assertEquals(processEntry(entryLines[1]), processedExampleSeedToSoilMap[1]);
});
