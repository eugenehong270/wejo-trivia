steps = [
    [
        # Create the table
        """
        CREATE TABLE games (
            id SERIAL NOT NULL UNIQUE,
            date DATE NOT NULL,
            category VARCHAR(100) NOT NULL,
            difficulty VARCHAR(6) NOT NULL,
            points INTEGER NOT NULL,
            user_id INTEGER REFERENCES users("id") ON DELETE CASCADE
        );
        """,
        # Drop the table
        """
        DROP TABLE games;
        """,
    ]
]
