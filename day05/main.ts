export function extractSeedNumbers(input: string): number[] {
  const line1 = input.split("\n")[0];
  const [_text, ...textOfNumbers] = line1.split(" ");
  const numbers = textOfNumbers.map((item) => parseInt(item));
  return numbers;
}

export function extractSeedRanges(input: string): [number, number][] {
  return extractSeedNumbers(input).reduce(
    reduceToSeedRanges,
    [] as [number, number][]
  );
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

type PlotConnection = [number, number, number];

export function extractChonks(rawInput: string): PlotConnection[][] {
  return <PlotConnection[][]>rawInput
    .split("\n\n")
    .slice(1)
    .map((chonk) =>
      chonk
        .split("\n")
        .slice(1)
        .map((line) => line.split(" ").map((item) => parseInt(item)))
    );
}

export const isConnectCoordinates = (
  locale: number,
  chonk: PlotConnection[]
) => {
  if (!chonk) {
    throw new Error("connection not supplied");
  }
  return (
    chonk.find(
      ([
        destinationRangeStart,
        _sourceRangeStart,
        rangeLength,
      ]: PlotConnection): boolean => {
        return (
          destinationRangeStart < locale &&
          destinationRangeStart + rangeLength > locale
        );
      }
    ) || null
  );
};

export function reduceToSeedRanges(
  acc: [number, number][],
  curr: number,
  index: number
): [number, number][] {
  if (!acc || !Array.isArray(acc)) {
    acc = [];
  }
  if (!(index % 2)) {
    acc.push([curr, Infinity]);
  } else {
    if (acc && acc.length > 0 && Array.isArray(acc.at(-1))) {
      acc[acc.length - 1][1] = curr;
      //   acc.at(-1)[1] = curr;
    }
  }
  return acc;
}

export function computeAnswerDay5Part1(rawInput: string): number {
  const seedNumbers = extractSeedNumbers(rawInput);
  const chonks = extractChonks(rawInput);
  const seedLocations = seedNumbers.map((seedNumber) => {
    let destinationPlot = seedNumber;

    const isConnection = ([
      _destinationRangeStart,
      sourceRangeStart,
      rangeLength,
    ]: PlotConnection): boolean =>
      sourceRangeStart < destinationPlot &&
      sourceRangeStart + rangeLength > destinationPlot;

    chonks.forEach((chonk) => {
      const connectCoordinates = chonk.find(isConnection);
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

// What is the lowest location number that corresponds to any of the initial seed numbers?
export function computeAnswerDay5Part2(rawInput: string): number {
  const seedRanges = extractSeedRanges(rawInput);
  const chonks = extractChonks(rawInput).reverse();
  let destinationPlot = 0;
  while (true) {
    let locale = destinationPlot;
    chonks.forEach((chonk) => {
      const connectCoordinates = isConnectCoordinates(locale, chonk);

      if (connectCoordinates) {
        const [destinationRangeStart, sourceRangeStart] = connectCoordinates;
        locale = locale - destinationRangeStart + sourceRangeStart;
      }
    });

    if (
      seedRanges.find(
        ([start, range]) => start < locale && locale < start + range
      )
    ) {
      return destinationPlot - 1;
    }

    // Prepare next loop
    destinationPlot++;
    console.log(destinationPlot);
  }
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
  const answer1 = computeAnswerDay5Part1(rawInput);
  const answer2 = computeAnswerDay5Part2(rawInput);

  console.log(
    `Answer Day5 Part1 – the lowest location-number that corresponds to any of the initial seed-numbers is…: ${answer1}`
  );

  console.log(
    `Answer Day5 Part2 – the lowest location-number that corresponds to any of the initial seed-numbers is…: ${answer2}`
  );
}
