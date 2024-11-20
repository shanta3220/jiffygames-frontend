# JiffyGames

## Overview

JiffyGames is a browser-based gaming platform offering 5–6 games accessible directly from your browser. The app provides an all-in-one gaming experience with leaderboards, user profiles, and community features like comments for each game.

### Problem Space

Many players enjoy casual games but dislike installing multiple apps or managing device storage. JiffyGames solves this problem by offering instant, browser-based access to games with no installation required. By integrating gaming with social features like leaderboards and profiles, the app combines fun with engagement in a convenient, lightweight platform.

### User Profile

Who will use it?
Casual gamers who prefer no-download games.
Users who want to quickly play and engage with games without additional app management.

How will they use it?
Sign up and log in to access the platform and their personal gaming stats.
Browse and launch games directly from the homepage.
Track progress and compare scores on leaderboards.
Share feedback and interact with the community via comments.

Special considerations
Low-resource devices should still have a seamless experience.
Ensure user privacy and secure authorization for personalized features like leaderboards and profiles.

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

6. Comments
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

Homepage: Displays games with cards and featured slides.<br>
Leaderboards Page: Lists all games' leaderboards.<br>
Individual Leaderboard Page: Shows a detailed table of users and scores for a game.<br>
User Profile Page: Displays personal details and editable settings for the profile owner.<br>
Game Page: Includes the game itself, description, fullscreen mode, and comments.

### Data

Data Relationships:
Users: UserID, Username, Role, FullName, Avatar, AboutMe, Scores<br>
Games: GameID, Title, Description, Instruction, Category, Thumbnail, HighScores, FeaturedVideo, CreatedAt, UpdatedAt<br>
Leaderboards: LeaderboardID, GameID, UserID, Scores, Rank<br>
Comments: CommentID, GameID, UserID, Content, Timestamp, CreatedAt, UpdatedAt<br>

### Endpoints

Game Management
GET /api/games - Retrieve all games.<br>
GET /api/games/:gameId - Retrieve a specific game.<br>

Leaderboards
GET /api/leaderboards - Retrieve all leaderboards.<br>
GET /api/leaderboards/:leaderboardId - Retrieve leaderboard details for a game.<br>
POST /api/leaderboards/:leaderboardId/comment - Post a comment to a game's leaderboard.<br>

User Management
GET /api/users/:userId - Retrieve user profile data.<br>
PUT /api/users/:userId - Update user profile data.<br>

### Data

Describe your data and the relationships between the data points. You can show this visually using diagrams, or write it out.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.
Get: /api/games<br>
Get: /api/games/:gameId<br>
Get: /api/users/:userId<br>
Get: /api/users/:userId/games
Post: ("/api/users/, UserObject)
Put ("/api/users/:userId", userOjbect) <br>
Get: api/users/:userId/comments<br>
POST: ("/api/games/:gameId/comments", commentObject)<br>
PUT: ("/api/games/:gameId/comments/:commentId", commentObject)<br>
Delete: /api/games/:gameId/comments/:commentId<br>
Delete: /api/users/:userId/comments/:commentId<br>
Get: /api/leaderboards<br>
Post: ("/api/leaderboards", leaderboardObject)<br>
POST: ("api/leaderboards/:leaderboardId", UserScoreObject)<br>
Get: /api/leaderboards/:leaderboardId<br>
Get: /api/leaderboards/:leaderboardId/comments<br>

## Roadmap

Research & Tech Setup Day 1
Frontend Skeleton (Homepage, Header, Game Cards) Day 2–3<br>
Backend API Development (Games, Leaderboards, Users) Day 4–5<br>
Game Integration (Embed Unity Games) Day 6–7<br>
Leaderboards & User Profiles Day 8–9<br>
Comments Section Integration Day 10<br>
Testing & Debugging Day 11–12<br>
Final Touches & Presentation Day 13–14<br>

## Future Implementations

Additional Games: Expand the library with more browser-based games.<br>
Advanced Leaderboards: Add weekly and monthly leaderboards.<br>
Achievements System: Include game-specific badges and progress tracking.<br>
Game Gallery: Add a gallery section with featured images on game pages.<br>
Game Publish: Allow specific user's role such as Admin and GameCreator to publish games in an additional page hidden by other roles.<br>
Social Feature: Add a friend option in User Profile, allowing the owner user to see their list of friends and view their profiles when needed.
