type Game = {
  gameNumber: number;
  red: number;
  green: number;
  blue: number;
};

export function cleanInput(rawGameInput: string): Game {
  const [gameText, rounds] = rawGameInput.split(":");
  const facets = rounds
    .split(";")
    .map((round) => round.split(",").map((facet) => facet.trim()))
    .flat();

  const cleaned: Game = {
    gameNumber: parseInt(gameText.trim().split(" ")[1]),
    red: 0,
    green: 0,
    blue: 0,
  };

  facets.forEach((facet) => {
    let [numberString, color] = facet.split(" ");
    let number = parseInt(numberString);
    cleaned[color as keyof Game] =
      cleaned[color as keyof Game] > number
        ? cleaned[color as keyof Game]
        : number;
  });
  return cleaned;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const rawInput = await Deno.readTextFile("./input.txt");
  const bag = { red: 12, green: 13, blue: 14 };
  //   const rawInput = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  //   Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
  //   Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  //   Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
  //   Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
  const successfulGames: number[] = [];
  rawInput.split("\n").forEach((line) => {
    const game = cleanInput(line);
    if (
      game.red <= bag.red &&
      game.green <= bag.green &&
      game.blue <= bag.blue
    ) {
      successfulGames.push(game.gameNumber);
    }
  });
  const successfulGameIDSum = successfulGames.reduce(
    (acc, curr) => acc + curr,
    0
  );
  if (!successfulGameIDSum) {
    throw new Error(`Final answer can't be zero`);
  }
  console.log(`Answer 2.1 = ${successfulGameIDSum}`);
}
