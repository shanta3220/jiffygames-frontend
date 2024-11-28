export async function getGameList() {
  await null;
  const games = [
    {
      gameName: "Riko: The Adventurer",
      projectName: "RikoTheAdventurer",
      description:
        "Riko: The Adventurer is a 2D top-down RPG shooting game developed in Unity3D, where the player guides the main character in their quest to become a 7th-grade adventurer by gaining experience. I presented this game as my final year project for my Bachelor of Science degree. All aspects of the game, except for the art and music, were developed by me.",
      instruction:
        "Move with 'WASD' keys and right mouseclick to shoot, if there is more than 1 weapon use mousescroll to switch weapons.",
      category: "Action, Adventure, Fantasy",
      like: 12,
    },
    {
      gameName: "LSD: Last Survival Days",
      projectName: "LSDLastSurvivalDays",
      description:
        "LSD: Last Survival Days was a collaborative top-down survival shooting game project created with the music band Liquid State Drive. In each level, the player must survive until the end of a song from the band's debut album, Tomar Itihash, which serves as the background music. This is the first game in Bangladesh to be based on a music band. As the Game Developer, I collaborated with a Game Artist to bring this project to life.",
      instruction:
        "Move with 'WASD' keys and right mouse click to shoot, use mouse scroll to switch characters",
      category: "Action",
      like: 7,
    },
    {
      gameName: "Endless Runner 2.5D",
      projectName: "EndlessRunner2.5D",
      description:
        "A simple endless runner games, survive by avoiding obstacle and attack from the dragon and collect cookies",
      instruction:
        "Use space to jump, watch over the fuel, if its runs out you can't jump.",
      category: "Fantasy",
      like: 2,
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

export async function getGameInfo(gameId) {
  const games = await getGameList();
  return games.filter((game) => game.projectName === gameId)[0];
}
