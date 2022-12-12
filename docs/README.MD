## Project Documentation

## About

A trivia game site built using FastAPI, PostgreSQL, JWTDown Authentication, React JS and Redux Tool Kit, which allows users to sign up, login/logout, and play a trivia game.
They can then see their profile page to access a list of their game scores along with aggregate stats, and can access a leaderboard that shows all users in descending score order. The game play is intuitive, fast, run and responsive, and lends itself to friendly competition. Our goal for further development is to incorporate team play and social networking into the app, allowing friends to compete and compare stats.

## Set Up (Development)

1. From your terminal, cd into project root directory.

2. Start docker desktop.

3. In terminal, run docker volume create trivia.

4. Run docker compose build.

5. Run docker compose up.

6. In docker fastapi container, run pip install requests.

7. Go to React home page, create a user, start playing.

8. Check leaderboard to see other users' scores.

## Tests

1. Waylen
   [Test List Games](/fast_api/tests/test_games_routes.py)
   [Test Create Game Score](/fast_api/tests/test_games_routes.py)
   [Test Get Token Returns None For User Not Logged In](/fast_api/tests/test_get_token.py)
   [Test Get Token Returns Token For User Logged In](/fast_api/tests/test_get_token.py)

2. Jonathan
   [Test Create User](/fast_api/tests/test_users_routes.py)

3. Eugene
   [Test List User Games](/fast_api/tests/test_games_routes.py)

4. Ovidiu
   [Test Get User Stats](/fast_api/tests/test_games_routes.py)

## Deliverables

[X]Welcome Page
   The user arrives at the home page, is shown a welcome message, and is given the option to play a game. Currently, the only available game is Trivia.

[X]Signup
   If the user does not have an account, they navigate to the sign up page, where they input username and password, click submit, and are logged in with their information and navigated to the trivia game start screen.

[X]Login
   If the user has an account, they are prompted to log in before they can play the game, and must input username and password, then click submit, to be navigated to the trivia game start screen. Once logged in, the user's username is displayed on the left side of the nav bar, welcoming them to the site.

[X]Logout
   Clicking logout clears the user's cached data, deletes their access bearer token, and navigates to the welcome page.

[X]Trivia Game
   After logging in, the user has the option to start the game. They can choose from a list of 24 categories, three difficulty levels (easy, medium, hard), or choose to leave either/both blank to have a mixed result. After making selections, the user clicks start to begin the game. They are given a series of 10 questions, with multiple choice answers to choose from.

   When an answer is selected, if it is correct, the answer text background changes from blue to green, a 'correct' sound is played, and the appropriate amount of points are added to the user's score, which is displayed in the upper right corner of the game window. If their selection is incorrect, the answer text background changes from blue to red, an 'incorrect' sound is played, and 0 points are alotted. In either case, after an answer is selected and points determined, the next question is loaded.

   Each correctly answered easy question awards 10 points, each medium 20, and each difficult 30. Each question allows 15 seconds for answering. If the timer reaches 0 before the user selects an answer, the next question is automatically loaded. Upon answering the last question, the user's total score is displayed on an end game screen, and that score is sent to the games database. The user sees their final score, a ranking based on that score, and a clickable option to play again.

[X]User Profile
   The user can access a profile page which displays their highest score, average score, total games played, and a history of their individual game scores.

[X]Leaderboard
   Whether logged in or not, the user can access the leaderboard page, which displays the top ten scores from the games database.

[X]Musical Component
   Within the nav bar exists a mini audio player which has play, pause, skip backward and skip forward to allow the user the option for music that can accompany their games.
## Stretch Goals

[]Social Network
   The user can connect to other players on the site, add them as 'friends', see their game history, and compare their stats.

[]Additional Games
   Besides trivia, the user can play other games such as musical maze, tic tac toe, snake, connect 4, and more.

[]Team Play
   The user can play on a team of friends against other friends.

[]Filters/Sorting for Leaderboard and User Profile
   The user can filter/sort through games in the user profile and leaderboard based on category and difficulty.
