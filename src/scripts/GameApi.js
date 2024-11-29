export async function getGameList() {
  await null;
  const games = [
    {
      id: 1,
      gameName: "Riko: The Adventurer",
      projectName: "RikoTheAdventurer",
      description:
        "Riko: The Adventurer is a 2D top-down RPG shooting game developed in Unity3D, where the player guides the main character in their quest to become a 7th-grade adventurer by gaining experience. I presented this game as my final year project for my Bachelor of Science degree. All aspects of the game, except for the art and music, were developed by me.",
      instruction:
        "Move with 'WASD' keys and right mouseclick to shoot, if there is more than 1 weapon use mousescroll to switch weapons.",
      category: "Action, Adventure, Fantasy",
      like: 12,
      leaderboardId: "RikoTheAdventurerLB",
    },
    {
      id: 2,
      gameName: "LSD: Last Survival Days",
      projectName: "LSDLastSurvivalDays",
      description:
        "LSD: Last Survival Days was a collaborative top-down survival shooting game project created with the music band Liquid State Drive. In each level, the player must survive until the end of a song from the band's debut album, Tomar Itihash, which serves as the background music. This is the first game in Bangladesh to be based on a music band. As the Game Developer, I collaborated with a Game Artist to bring this project to life.",
      instruction:
        "Move with 'WASD' keys and right mouse click to shoot, use mouse scroll to switch characters",
      category: "Action",
      like: 7,
      leaderboardId: "LSDLastSurvivalDaysLB",
    },
    {
      id: 3,
      gameName: "Endless Runner 2.5D",
      projectName: "EndlessRunner2.5D",
      description:
        "A simple endless runner games, survive by avoiding obstacle and attack from the dragon and collect cookies",
      instruction:
        "Use space to jump, watch over the fuel, if its runs out you can't jump.",
      category: "Fantasy",
      like: 2,
      leaderboardId: "EndlessRunner2.5DLB",
    },
    {
      id: 4,
      gameName: "Riko: The Adventurer2",
      projectName: "RikoTheAdventurer",
    },
    {
      id: 5,
      gameName: "LSD: Last Survival Days2",
      projectName: "LSDLastSurvivalDays",
    },
    {
      id: 5,
      gameName: "Endless Runner 2.5D2",
      projectName: "EndlessRunner2.5D",
    },
  ];
  return games;
}

export async function getComments(gameId) {
  let comments = [
    {
      id: 1,
      game_id: 1,
      user_id: 1,
      comment:
        "This game is absolutely amazing! I love the graphics and gameplay.",
      timestamp: 1691558262000,
    },
    {
      id: 2,
      game_id: 1,
      user_id: 2,
      comment: "Challenging levels but super rewarding when you finish them.",
      timestamp: 1691559365000,
    },
    {
      id: 3,
      game_id: 2,
      user_id: 3,
      comment: "A bit buggy at times, but overall a fun experience.",
      timestamp: 1691560468000,
    },
    {
      id: 4,
      game_id: 2,
      user_id: 4,
      comment: "The storyline really pulls you in. Can't wait for the sequel!",
      timestamp: 1691561571000,
    },
    {
      id: 5,
      game_id: 3,
      user_id: 5,
      comment: "This game reminds me of my childhood! Nostalgic vibes.",
      timestamp: 1691562674000,
    },
    {
      id: 6,
      game_id: 3,
      user_id: 6,
      comment: "Too many ads interrupting the flow of the game.",
      timestamp: 1691563777000,
    },
    {
      id: 7,
      game_id: 4,
      user_id: 7,
      comment:
        "Multiplayer mode is so much fun! Highly recommend playing with friends.",
      timestamp: 1691564880000,
    },
    {
      id: 8,
      game_id: 4,
      user_id: 8,
      comment: "Not a fan of the new update. It feels less intuitive now.",
      timestamp: 1691565983000,
    },
    {
      id: 9,
      game_id: 5,
      user_id: 9,
      comment: "The boss battles are epic! Loving every minute of it.",
      timestamp: 1691567086000,
    },
    {
      id: 10,
      game_id: 5,
      user_id: 10,
      comment: "Pretty average game, but it's a good way to kill time.",
      timestamp: 1691568189000,
    },
  ];

  const users = await getUsers();

  if (gameId) {
    comments = comments.filter((comment) => {
      if (comment.game_id == gameId) {
        const user = users.filter((user) => user.id == comment.user_id)[0];
        comment.userName = user.userName;
        comment.avatar = user.avatar;
        return comment;
      }
    });
  }
  return comments;
}

export async function getUsers() {
  const users = [
    {
      id: 1,
      userName: "TerryWong",
      email: "terry.wong@example.com",
      aboutMe: "Tech enthusiast exploring the latest trends in AI.",
      avatar: "/images/avatars/terry.jpg",
      password: "12345678",
    },
    {
      id: 2,
      userName: "NoahDuncan",
      email: "noah.duncan@example.com",
      aboutMe: "Lover of nature documentaries and travel videos.",
      avatar: "/images/avatars/noah.jpg",
      password: "12345678",
    },
    {
      id: 3,
      userName: "JaniceRodriguez",
      email: "janice.rodriguez@example.com",
      aboutMe: "Passionate about mindful living and technology.",
      avatar: "/images/avatars/janice.jpg",
      password: "12345678",
    },
    {
      id: 4,
      userName: "Shanta",
      email: "shanta@example.com",
      aboutMe: "Excited to watch and comment on amazing content!",
      avatar: "/images/avatars/shanta.jpg",
      password: "12345678",
    },
    {
      id: 5,
      userName: "MariaAziz",
      email: "maria.aziz@example.com",
      aboutMe: "Creative writer and lover of storytelling.",
      avatar: "/images/avatars/maria.jpg",
      password: "12345678",
    },
    {
      id: 6,
      userName: "TaylorNkoshi",
      email: "taylor.nkoshi@example.com",
      aboutMe: "Foodie exploring new cuisines and recipes.",
      avatar: "/images/avatars/taylor.jpg",
      password: "12345678",
    },
    {
      id: 7,
      userName: "AdnanAlFarsi",
      email: "adnan.alfarsi@example.com",
      aboutMe: "Tech blogger sharing insights on gadgets and innovations.",
      avatar: "/images/avatars/adnan.jpg",
      password: "12345678",
    },
    {
      id: 8,
      userName: "GiovanaSilva",
      email: "giovana.silva@example.com",
      aboutMe: "Fitness enthusiast sharing tips and routines.",
      avatar: "/images/avatars/giovana.jpg",
      password: "12345678",
    },
    {
      id: 9,
      userName: "DanielLesage",
      email: "daniel.lesage@example.com",
      aboutMe: "History buff diving into untold stories.",
      avatar: "/images/avatars/daniel.jpg",
      password: "12345678",
    },
    {
      id: 10,
      userName: "SharonSantos",
      email: "sharon.santos@example.com",
      aboutMe: "Art lover curating beautiful works from around the world.",
      avatar: "/images/avatars/sharon.jpg",
      password: "12345678",
    },
    {
      id: 11,
      userName: "CleoPolster",
      email: "cleo.polster@example.com",
      aboutMe: "Nature photographer capturing the essence of the wild.",
      avatar: "/images/avatars/cleo.jpg",
      password: "12345678",
    },
    {
      id: 12,
      userName: "KatyaHorvat",
      email: "katya.horvat@example.com",
      aboutMe: "Cooking vlogger sharing traditional recipes.",
      avatar: "/images/avatars/katya.jpg",
      password: "12345678",
    },
    {
      id: 13,
      userName: "HanneKarlsen",
      email: "hanne.karlsen@example.com",
      aboutMe: "Design enthusiast exploring minimalist lifestyles.",
      avatar: "/images/avatars/hanne.jpg",
      password: "12345678",
    },
    {
      id: 14,
      userName: "AsayoOohira",
      email: "asayo.oohira@example.com",
      aboutMe: "Music lover discovering global beats.",
      avatar: "/images/avatars/asayo.jpg",
      password: "12345678",
    },
    {
      id: 15,
      userName: "NguyenBon",
      email: "nguyen.bon@example.com",
      aboutMe: "Documentary filmmaker capturing untold stories.",
      avatar: "/images/avatars/nguyen.jpg",
      password: "12345678",
    },
    {
      id: 16,
      userName: "AraaGhelamerda",
      email: "araa.ghelamerda@example.com",
      aboutMe: "Tech geek exploring the AI revolution.",
      avatar: "/images/avatars/araa.jpg",
      password: "12345678",
    },
    {
      id: 17,
      userName: "AmbrusGerzson",
      email: "ambrus.gerzson@example.com",
      aboutMe: "Engineer passionate about robotics and innovation.",
      avatar: "/images/avatars/ambrus.jpg",
      password: "12345678",
    },
    {
      id: 18,
      userName: "HannahLaursen",
      email: "hannah.laursen@example.com",
      aboutMe: "Gardener sharing tips for sustainable living.",
      avatar: "/images/avatars/hannah.jpg",
      password: "12345678",
    },
  ];
  return users;
}

export async function getUser(userId) {
  const users = await getUsers();
  return users.filter((user) => user.id == userId)[0];
}
export async function getGameInfo(gameId) {
  const games = await getGameList();
  const game = games.filter((game) => game.id == gameId)[0];
  game.comments = await getComments(gameId);
  return game;
}
