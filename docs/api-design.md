### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: varchar
  * password: varchar

* Response: Account information and a token
* Response shape (JSON):
    `{
      "user": {
        «key»: type»,
      },
      "token": varchar
    }'

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    `
    true
    `

### Sign up

* Endpoint path: /users
* Endpoint method: POST

* Request shape (form):
  * username: varchar
  * password: varchar
  * email: varchar

* Response: Always true
* Response shape (JSON):
    `
    {
      "username": varchar,
      "password": varchar
    }
    `

### Retrieve All Categories

Endpoint path: https://opentdb.com/api_category.php
Endpoint method : GET

Response shape(JSON):
`{   "categories": [
		{
			"id": smallint,
      "name": varchar
			]
}`
### Retrieve Trivia Questions

Endpoint path: https://opentdb.com/api.php?amount=10&category=&difficulty=
Endpoint method : GET

Query parameters:
    * category: id
    * difficulty: varchar

Response shape(JSON):
`{   "results": [
		{
			"category": varchar,
			"type": varchar,
			"difficulty": varchar,
			"question": varchar,
			"correct_answer": varchar,
			"incorrect_answers": [
				varchar, varchar, etc.
			]
}`
### Create Game Score

Endpoint path: /games
Endpoint method : POST

Headers:
    * Authorization: Bearer token
    * content_type: application/json

Request Shape (form):
  * date: date
  * category: varchar
  * difficulty: varchar
  * points: smallint
  * user_id: smallint

Response Shape(JSON):
  `{
    "date" : date,
    "category": varchar,
    "difficulty": varchar,
    "points": smallint,
    "user": {
      "id": smallint,
      "username": varchar
    }
  }`

## Retrieve Leaderboard Game Scores

Endpoint path: /games
Endpoint method: GET

Response Shape(JSON):
`{  'games':  [
    {
    "date" : date,
    "category": varchar,
    "difficulty": varchar,
    "points": smallint,
    "user": {
      "id": smallint,
      "username": varchar
      }
    }
  ]
}`
## Retrieve User Game Scores

Endpoint path: /user/games
Endpoint method: GET

Headers:
    * Authorization: Bearer token

Response Shape(JSON):
`{  'games':  [
    {
    "date" : date,
    "category": varchar,
    "difficulty": varchar,
    "points": smallint,
    "user": {
      "id": smallint,
      "username": varchar
      }
    }
  ]
}`

## Retrieve User Stats

Endpoint path: /user/stats
Endpoint method: GET

Headers:
    * Authorization: Bearer token

Response Shape(JSON):
`{
  "user_id": smallint,
  "avg_score": smallint,
  "total_games": smallint,
  "highest_score": 39
}`

