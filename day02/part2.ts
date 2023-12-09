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
    const [numberString, color] = facet.split(" ");
    const number = parseInt(numberString);
    cleaned[color as keyof Game] =
      cleaned[color as keyof Game] > number
        ? cleaned[color as keyof Game]
        : number;
  });
  return cleaned;
}

export function fewestCubes() {}

if (import.meta.main) {
  const rawInput = await Deno.readTextFile("./input.txt");
  const bag = { red: 12, green: 13, blue: 14 };
  let gamesTotalPower: number = 0;
  rawInput.split("\n").forEach((line) => {
    const game = cleanInput(line);
    const gamePower = game.red * game.green * game.blue;
    gamesTotalPower += gamePower;
  });
  console.log(`Answer 2.2 = ${gamesTotalPower}`);
}
