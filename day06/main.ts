type RaceRecord = { raceDuration: number; distance: number };

export function calcRaceDistance(
  raceDuration: number,
  holdDuration: number
): number {
  const travelDuration = raceDuration - holdDuration;
  const distance = travelDuration * holdDuration;
  return distance;
}

export function formatRaceRecords(rawInput: string): RaceRecord[] {
  const races = [];
  const parts = rawInput.split("\n").map((line) =>
    line
      .split(/\s+/)
      .slice(1)
      .map((item) => parseInt(item.trim()))
  );
  for (let i = 0; i < parts[0].length; i++) {
    races.push({ raceDuration: parts[0][i], distance: parts[1][i] });
  }
  return races;
}

export function raceWinnings({ raceDuration, distance }: RaceRecord): number {
  let winCount = 0;
  for (let i = 0; i < raceDuration; i++) {
    if (calcRaceDistance(raceDuration, i) > distance) {
      winCount++;
    }
  }
  return winCount;
}

export function computeAnswerDay6Part1(rawInput: string) {
  const races = formatRaceRecords(rawInput);
  const raceWinCounts: number[] = races.map((race) => raceWinnings(race));
  const winningsMultiplied = raceWinCounts.reduce(
    (a: number, b: number) => a * b
  );
  return winningsMultiplied;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const rawInput = await Deno.readTextFile("./input.txt");
  const answer1 = computeAnswerDay6Part1(rawInput);
  // const answer2 = computeAnswerDay5Part2(rawInput);

  console.log(
    `Answer Day5 Part1 – the lowest location-number that corresponds to any of the initial seed-numbers is…: ${answer1}`
  );

  // console.log(
  //   `Answer Day5 Part2 – the lowest location-number that corresponds to any of the initial seed-numbers is…: ${answer2}`
  // );
}
