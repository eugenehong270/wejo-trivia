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

* Endpoint path: /signup
* Endpoint method: POST

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

### Retrieve All Categories

Endpoint path: /categories
Endpoint method : GET

Query parameters:
    * id: smallint
    * name: varchar

Headers:
    content_type: application/json

Response shape(JSON):
'{   "categories": [
		{
			"id": smallint,
      "name": varchar
			]
}'
### Retrieve Trivia Questions

Endpoint path: /questions
Endpoint method : GET

Query parameters:
    * category: id
    * difficulty: varchar

Headers:
    content_type: application/json

Response shape(JSON):
'{   "results": [
		{
			"category": varchar,
			"type": varchar,
			"difficulty": varchar,
			"question": varchar,
			"correct_answer": varchar,
			"incorrect_answers": [
				varchar, varchar, etc.
			]
}'
### Create Game Score

Endpoint path: /gamescores/
Endpoint method : POST

Headers:
    * Authorization: Bearer token
    * content_type: application/json

Request Shape (form):
  * points: smallint
  * difficulty: varchar
  * category: id

Response Shape(JSON):
  {
    "username": varchar,
    "points": smallint,
    "difficulty": varchar,
    "category": id
    "date" : date
  }

## Retrieve Leader Game Scores

Endpoint path: /gamescores/leaders
Endpoint method: GET

Headers:
    * Authorization: Bearer token
    * content_type: application/json

Response Shape(JSON):
'{  'leaders':  [
    {
      "id" : serial,
      "username" : varchar,
      "points" : smallint,
      "difficulty" : varchar,
      "category" : varchar,
      "date" : date
    },
  ]
}'
## Retrieve User Game Scores

Endpoint path: /gamescores/me/
Endpoint method: GET

Headers:
    * Authorization: Bearer token
    * content_type: application/json

Response Shape(JSON):
'{  'my_games': [
    {
      "id" : serial,
      "username" : varchar,
      "points" : smallint,
      "difficulty" : varchar,
      "category" : varchar,
      "date" : date
    },
  ]
}'
