steps = [
    [
        """
    CREATE TABLE users (
    id SERIAL NOT NULL UNIQUE,
    username TEXT NOT NULL UNIQUE,
);
""",
        """
DROP TABLE users;
""",
    ]
]
