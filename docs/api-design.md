### «Human-readable of the endpoint»

* Endpoint path: «path to use»
* Endpoint method: «HTTP method»
* Query parameters:
  * «name»: «purpose»

* Headers:
  * Authorization: Bearer token

* Request shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```

* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```


### Log in

* Endpoint path: /token
* Endpoint method: POST

* Request shape (form):
  * username: string
  * password: string

* Response: Account information and a token
* Response shape (JSON):
    ```json
    {
      "account": {
        «key»: type»,
      },
      "token": string
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

### Trivia Questions

Endpoint path: /questions
Endpoint method : GET

Query parameters:
    amount: number
    category: id

Headers:
    content_type: application/json


Response shape:
   "results": [
		{
			"category": "History",
			"type": "boolean",
			"difficulty": "hard",
			"question": "Japan was part of the Allied Powers during World War I.",
			"correct_answer": "True",
			"incorrect_answers": [
				"False"
			]



### User Score

Endpoint path: /userscore
Endpoint method : POST

Headers:
    content_type: application/json

request shape (JSON):
