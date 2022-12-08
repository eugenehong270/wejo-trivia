steps = [
    [
        # Create the table
        """
        CREATE TABLE users (
            id SERIAL NOT NULL UNIQUE,
            username TEXT NOT NULL UNIQUE,
            password VARCHAR(200) NOT NULL
        );
        """,
        # Drop the table
        """
        DROP TABLE users;
        """
    ]
]
