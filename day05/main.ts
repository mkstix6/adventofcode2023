export function extractSeedNumbers(input: string): number[] {
  const line1 = input.split("\n")[0];
  const [_text, ...textOfNumbers] = line1.split(" ");
  const numbers = textOfNumbers.map((item) => parseInt(item));
  return numbers;
}

type EntryNums = {
  destinationRangeStart: number;
  sourceRangeStart: number;
  rangeLength: number;
};

export function processEntry(rawEntry: string): EntryNums {
  const [destinationRangeStart, sourceRangeStart, rangeLength] =
    rawEntry.split(" ");
  const result = {
    destinationRangeStart: parseInt(destinationRangeStart),
    sourceRangeStart: parseInt(sourceRangeStart),
    rangeLength: parseInt(rangeLength),
  };
  return result;
}

export function computeAnswerDay5Part1(input: string): number {
  console.log("TODO: write this function");
  return 35;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  /**
   * Day5 Part1
   * What is the lowest location-number
   * that corresponds to any of the initial
   * seed-numbers?
   */

  const rawInput = await Deno.readTextFile("./input.txt");
  const seedNumbers = extractSeedNumbers(rawInput);
  const chonks = rawInput.split("\n\n").map((chonk) => chonk.split("\n"));

  console.log({ seedNumbers, chonks });

  const lowestLocation = seedNumbers.map().sort()[0];

  console.log(
    `Answer Day5 Part1 – the lowest location-number that corresponds to any of the initial seed-numbers is…: ${"ANSWER"}`
  );
}
