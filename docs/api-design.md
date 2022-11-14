### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: varchar
  * password: varchar

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": varchar
    }
    ```

### Log out

* Endpoint path: /token
* Endpoint method: DELETE

* Headers:
  * Authorization: Bearer token

* Response: Always true
* Response shape (JSON):
    ```json
    true
    ```

### Sign up

* Endpoint path: /token
* Endpoint method: POST

* Headers:
  * Authorization: Bearer token

* Request shape (form):
  * username: varchar
  * password: varchar
  * email: varchar

* Response: Always true
* Response shape (JSON):
    ```json
    {
      "username": varchar,
      "password": varchar,
      "email": varchar
    }
    ```

### Retrieve Trivia Questions

Endpoint path: /questions
Endpoint method : GET

Query parameters:
    * category: id
    * difficulty: varchar

Headers:
    content_type: application/json

Response shape:
   "results": [
		{
			"category": varchar,
			"type": varchar,
			"difficulty": varchar,
			"question": varchar,
			"correct_answer": varchar,
			"incorrect_answers": [
				varchar, varchar, etc.
			]

### Create Game Score

Endpoint path: /gamescores/create/
Endpoint method : POST

Headers:
    content_type: application/json

Request Shape (form):
  * username: varchar
  * points: smallint
  * difficulty: varchar
  * category: varchar

Headers:
    content_type: application/json

Response Shape(JSON):
  {
    "username": varchar,
    "points": smallint,
    "difficulty": varchar,
    "category": varchar
    "date" : date
  }

## Retrieve Game Scores

Endpoint path: /gamescores/get/
Endpoint method: GET

Headers:
    content_type: application/json

Request Shape (?):
  ???

Response Shape(JSON):
  games = [
    {
      "id" : serial,
      "username" : varchar,
      "points" : smallint,
      "difficulty" : varchar,
      "category" : varchar,
      "date" : date
    },
  ]

## Retrieve Users ???
Endpoint path: /users
Endpoint method: GET

Headers:
    content_type: application/json

Response Shape(JSON):
  users = [
    {
      "id" : serial,
      "username" : varchar,
      "total_points" : smallint,
    },
  ]
