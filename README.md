# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

### Problem Space

Many players enjoy casual games but dislike installing multiple apps or managing device storage. JiffyGames solves this problem by offering instant, browser-based access to games with no installation required. By integrating gaming with social features like leaderboards and profiles, the app combines fun with engagement in a convenient, lightweight platform.

### User Profile

**Who will use it?**<br>

- Casual gamers who prefer no-download games.<br>
- Users who want to quickly play and engage with games without additional app management.<br>

**How will they use it?**<br>

- Sign up and log in to access the platform and their personal gaming stats.<br>
- Browse and launch games directly from the homepage.<br>
- Track progress and compare scores on leaderboards.<br>
- Share feedback and interact with the community via comments.<br>

**Special considerations**<br>

- Low-resource devices should still have a seamless experience.
- Ensure user privacy and secure authorization for personalized features like leaderboards and profiles.

### Features

1. Homepage:
   View all available games displayed in cards and a featured slider.
   Click on a game to navigate to its dedicated game page.

2. Authorization:
   Sign-up and log-in functionality.
   Restrict access to games, leaderboards, and profiles to authorized users.

3. Games:
   Play games directly in the browser.
   View game descriptions, full-screen mode, and game-specific leaderboards.

4. Leaderboards:
   See top scores for each game.
   Individual leaderboards for deeper details, like user avatars, usernames, and scores.
   Click on a leaderboard row to view a user's profile.

5. User Profile:
   Personalized page with username, full name, avatar, and an "About Me" section.
   Editable profile for the owner, including settings for updating personal details and avatar.
   Lists Playing games section

6. Comments:
   Comment section for every game page to share thoughts and connect with the community.

## Implementation

### Tech Stack

Frontend: React, HTML, SASS
Backend: Node.js, Express, Knex, MySQL
Game Development: Unity3D, C#
API Communication: Axios
Potential Limitations: Ensure games created in Unity3D integrate seamlessly with the React-based frontend.

### APIs

APIs: External APIs: Potential use of gaming APIs for advanced features like achievements.
Custom APIs: Developed to manage leaderboards, games, and user profiles.

### Sitemap

**Home Page**: Displays games with cards and featured slides.<br>
**Leaderboards Page**: Lists all games' leaderboards.<br>
**Individual Leaderboard Page**: Shows a detailed table of users and scores for a game.<br>
**User Profile Page**: Displays personal details and editable settings for the profile owner.<br>
**Game Page**: Includes the game itself, description, fullscreen mode, and comments.

### Data

Data Relationships:
**Users**: UserID, Username, Role, FullName, Avatar, AboutMe, Scores<br>
**Games**: GameID, Title, Description, Instruction, Category, Thumbnail, HighScores, FeaturedVideo, CreatedAt, UpdatedAt<br>
**Leaderboards**: LeaderboardID, GameID, UserID, Scores, Rank<br>
**Comments**: CommentID, GameID, UserID, Content, Timestamp, CreatedAt, UpdatedAt<br>

### Endpoints

**Game Management**

- `GET /api/games`  
  Retrieve all games.
- `GET /api/games/:gameId`  
  Retrieve details for a specific game.
- `POST /api/games/:gameId/comments`  
  Post a comment to a game's page (`commentObject`).
- `PUT /api/games/:gameId/comments/:commentId`  
  Update a specific comment on a game (`commentObject`).
- `DELETE /api/games/:gameId/comments/:commentId`  
  Delete a specific comment on a game.

**Leaderboards**

- `GET /api/leaderboards`  
  Retrieve all leaderboards.
- `POST /api/leaderboards/`  
  Create a new leaderboard (`leaderboardObject`).
- `POST /api/leaderboards/:leaderboardId`  
  Add a user's score to a leaderboard (`UserScoreObject`).
- `GET /api/leaderboards/:leaderboardId`  
  Retrieve leaderboard details for a specific game.
- `GET /api/leaderboards/:leaderboardId/comments`  
  Retrieve comments for a specific leaderboard.
- `POST /api/leaderboards/:leaderboardId/comment`  
  Post a comment to a game's leaderboard.

**User Management**

- `GET /api/users/:userId`  
  Retrieve user profile data.
- `GET /api/users/:userId/achievements`  
  Retrieve a user's achievements.
- `POST /api/users/`  
  User signup (`UserObject`).
- `PUT /api/users/:userId`  
  Update user profile data (`UserObject`).
- `GET /api/users/:userId/comments`  
  Retrieve all comments made by a specific user.
- `DELETE /api/users/:userId/comments/:commentId`  
  Delete a specific comment made by a user.

**Social Feature**

- `POST /api/users/:userId/friends/:friendId`  
  Add a friend to a user's friend list.
- `GET /api/users/:userId/friends`  
  Retrieve the list of a user's friends.
- `GET /api/users/:userId/friends/:friendId`  
  Retrieve the profile data of a specific friend.

## Roadmap

**Day 1: Research & Setup**

- Set up project environment and repo.

**Day 2–3: Frontend Skeleton**

- Build Homepage, Header, and Game Cards.

**Day 4–5: Backend API**

- Implement API for Games, Leaderboards, and Users.

**Day 6–7: Game Integration**

- Embed Unity games on the frontend.

**Day 8–9: Leaderboards & Profiles**

- Implement Leaderboards and User Profiles.

**Day 10: Comments Section**

- Add comment functionality to game pages.

**Day 11–12: Testing & Debugging**

- Test and debug the app.

**Day 13–14: Final Touches**

- Polish UI/UX and prepare for presentation.

## Future Implementations

- Additional Games: Expand the library with more browser-based games.<br>
- Advanced Leaderboards: Add weekly and monthly leaderboards.<br>
- Achievements System: Include game-specific badges and progress tracking.<br>
- Game Gallery: Add a gallery section with featured images on game pages.<br>
- Game Publish: Allow specific user's role such as Admin and GameCreator to publish games in an additional page hidden by other roles.<br>
- Social Feature: Add a friend option in User Profile, allowing the owner user to see their list of friends and view their profiles when needed.
