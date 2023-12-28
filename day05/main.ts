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

export function computeAnswerDay5Part1(rawInput: string): number {
  const seedNumbers = extractSeedNumbers(rawInput);
  const chonks: number[][][] = rawInput
    .split("\n\n")
    .map((chonk) =>
      chonk
        .split("\n")
        .slice(1)
        .map((line) => line.split(" ").map((item) => parseInt(item)))
    )
    .slice(1);
  const seedLocations = seedNumbers.map((seedNumber) => {
    // REMEMBER for each seed
    let destinationPlot = seedNumber;
    chonks.forEach((chonk) => {
      const connectCoordinates = chonk.find((entryLine) => {
        const [_destinationRangeStart, sourceRangeStart, rangeLength] =
          entryLine;
        const isConnectionInstructions =
          sourceRangeStart < destinationPlot &&
          sourceRangeStart + rangeLength > destinationPlot;

        return isConnectionInstructions;
      });
      if (connectCoordinates) {
        const [destinationRangeStart, sourceRangeStart] = connectCoordinates;
        destinationPlot =
          destinationPlot + destinationRangeStart - sourceRangeStart;
      }
    });
    return destinationPlot;
  });
  const lowestLocation = seedLocations.sort((a, b) => a - b).at(0) || Infinity;
  return lowestLocation;
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
  const answer = computeAnswerDay5Part1(rawInput);

  console.log(
    `Answer Day5 Part1 – the lowest location-number that corresponds to any of the initial seed-numbers is…: ${answer}`
  );
}
