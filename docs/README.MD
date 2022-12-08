## Project Documentation

## About

A trivia game site built using FastAPI, PostgreSQL, React JS and Redux Tool Kit, which allows users to sign up, login/logout, and play a trivia game.
They can then see their profile page to access a list of their game scores along with aggregate stats, and can access a leaderboard that shows all users in descending score order. The game play is intuitive, fast, run and responsive, and lends itself to friendly competition. Our goal for further development is to incorporate team play and social networking into the app, allowing friends to compete and compare stats.

## Set Up
# is this the same now that we are deployed on Render?

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

## Deliverables

[X]Signup

[X]Login

[X]Logout

[X]Trivia Game

[X]User Profile

[X]Leaderboard

[X]Musical Component
## Stretch Goals

[]Social Network

[]Additional Games

[]Team Play

[]Filters/Sorting for Leaderboard and User Profile
