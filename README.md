### Problem Space

Many players enjoy casual games but dislike installing multiple apps or managing device storage. JiffyGames solves this problem by offering instant, browser-based access to games with no installation required. By integrating gaming with social features like leaderboards and profiles, the app combines fun with engagement in a convenient, lightweight platform.

### Backend
[Check Backend Project](https://github.com/shanta3220/nusrat-jahan-shanta-capstone-backend)

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
   View game descriptions, full-screen mode, and game-specific, leaderboards, social share the game links.

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
**User Profile Pages**: Display personal details and editable settings for the profile owner.<br>
**Game Page**: Includes the game itself, description, fullscreen mode, and comments.
**Sign Up Page**: Displays a form to fill username, email, confirm email and confirm password to register the user
**Login Page**: Displays a form to login the user.

### Data

Data Relationships:
**Users**: UserID, Username, FullName, Avatar, AboutMe, Scores<br>
**Games**: GameID, Title, Description, Instruction, Category, Thumbnail, FeaturedVideo, CreatedAt, UpdatedAt<br>
**Leaderboard-Scores**: LeaderboardID, GameID, UserID, Scores<br>
**Comments**: CommentID, GameID, UserID, Message, CreatedAt, UpdatedAt<br>

### Endpoints

**Game Management**

- `GET /games`  
  Retrieve all games.
- `GET /games/:id`  
  Retrieve details for a specific game.
- `GET /games/:id/like`  
  Like a specific game.

**Leaderboard-Scores**

- `GET /leaderboards`  
  Retrieve all leaderboards.
- `GET /leaderboards/user_id=:userId&game_id=:gameId`  
  Retrieve specific user score from a game.
- `GET /leaderboards/:id`  
  Retrieve leaderboard details for a specific game.
- `POST /leaderboards/:id`  
  Add a user's score to a leaderboard (`UserScoreObject`).

**User Management**

- `GET /users`  
  Retrieve all the users data.
- `POST /users/`  
  User signup (`UserObject`)
- `GET /users/:id`  
  Retrieve a specific user profile data.
- `PUT /users/:id`
  Update user profile data (`UserObject`).
- `GET /users/:id/games`  
  Retrieve games played by the user.

**Comments Feature**

- `GET /comments`  
  Retrieve all comments.
- `GET /comments/:id`  
  Retrieve a specific comment.
- `POST /comments`  
  Create a new comment (`CommentObject`).
- `DELETE /comments/:id`  
  Delete a specific comment.
- `GET /comments/:id/like`  
  Like a specific comment.

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
