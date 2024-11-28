export function getGameList() {
  const games = [
    {
      gameName: "Riko: The Adventurer",
      projectName: "RikoTheAdventurer",
    },
    {
      gameName: "LSD: Last Survival Days",
      projectName: "LSDLastSurvivalDays",
    },
    {
      gameName: "Endless Runner 2.5D",
      projectName: "EndlessRunner2.5D",
    },
    {
      gameName: "Riko: The Adventurer2",
      projectName: "RikoTheAdventurer",
    },
    {
      gameName: "LSD: Last Survival Days2",
      projectName: "LSDLastSurvivalDays",
    },
    {
      gameName: "Endless Runner 2.5D2",
      projectName: "EndlessRunner2.5D",
    },
  ];
  return games;
}

export function getGameInfo(gameId) {
  return getGameList().filter((game) => game.projectName === gameId)[0];
}
