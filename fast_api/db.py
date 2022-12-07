import os
from psycopg_pool import ConnectionPool

pool = ConnectionPool(conninfo=os.environ["DATABASE_URL"])


class GameQueries:
    def get_user_games(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT u.id AS user_id, u.username, g.date,
                        g.id AS game_id, g.date, g.category,
                        g.difficulty, g.points
                    FROM users u
                    JOIN games g ON(u.id = g.user_id)
                    WHERE g.user_id = %s

                    ORDER BY g.date DESC, g.points DESC
                    """,
                    [user_id],
                )
                games = []
                rows = cur.fetchall()
                for row in rows:
                    game = self.game_record_to_dict(row, cur.description)
                    games.append(game)
                return games

    def get_user_stats(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT u.id as user_id, AVG(g.points) as avg_score,
                        COUNT(g.id) as total_games,
                        MAX(g.points) as highest_score
                    FROM users u
                    INNER JOIN games g ON(u.id = g.user_id)
                    WHERE g.user_id= %s
                    GROUP BY u.id

                    """,
                    [user_id],
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                return record

    def get_games(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT u.id AS user_id, u.username, g.date,
                        g.id AS game_id, g.date, g.category,
                        g.difficulty, g.points
                    FROM users u
                    JOIN games g ON(u.id = g.user_id)

                    ORDER BY g.points DESC
                    """,
                )
                games = []
                rows = cur.fetchall()
                for row in rows:
                    game = self.game_record_to_dict(row, cur.description)
                    games.append(game)
                return games

    def get_game(self, game_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT u.id AS user_id, u.username,
                        g.id AS game_id, g.date, g.category,
                        g.difficulty, g.points
                    FROM users u
                    JOIN games g ON(u.id = g.user_id)
                    WHERE g.id = %s
                    """,
                    [game_id],
                )

                row = cur.fetchone()
                return self.game_record_to_dict(row, cur.description)

    def create_game(self, user_id, game):
        id = None
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO games (
                        date, category, difficulty, points, user_id
                    )
                    VALUES (%s, %s, %s, %s, %s)
                    RETURNING id
                    """,
                    [
                        game.date,
                        game.category,
                        game.difficulty,
                        game.points,
                        user_id,
                    ],
                )

                row = cur.fetchone()
                id = row[0]
        if id is not None:
            return self.get_game(id)

    def delete_game(self, game_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM games
                    WHERE id = %s
                    """,
                    [game_id],
                )

    def stat_record_to_dict(self, row, description):
        stat = None
        if row is not None:
            stat = {}
            stat_fields = ["avg_score", "total_games", "highest_score"]
            for i, column in enumerate(description):
                if column.name in stat_fields:
                    stat[column.name] = row[i]

            user = {}
            user_fields = ["user_id", "username"]
            for i, column in enumerate(description):
                if column.name in user_fields:
                    user[column.name] = row[i]
                user["id"] = user["user_id"]

            stat["user"] = user

        return stat

    def game_record_to_dict(self, row, description):
        game = None
        if row is not None:
            game = {}
            game_fields = [
                "game_id",
                "date",
                "category",
                "difficulty",
                "points",
            ]
            for i, column in enumerate(description):
                if column.name in game_fields:
                    game[column.name] = row[i]
            game["id"] = game["game_id"]

            user = {}
            user_fields = ["user_id", "username"]
            for i, column in enumerate(description):
                if column.name in user_fields:
                    user[column.name] = row[i]
                user["id"] = user["user_id"]

            game["user"] = user
        return game


class UserQueries:
    def get_all_users(self):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, username
                    FROM users
                    ORDER BY id
                """
                )

                results = []
                for row in cur.fetchall():
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]
                    results.append(record)

                return results

    def get_user(self, username: str):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    SELECT id, username, password
                    FROM users
                    WHERE username = %s
                """,
                    [username],
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def create_user(self, data, hashed_password):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [data.username, hashed_password]
                cur.execute(
                    """
                    INSERT INTO users (username, password)
                    VALUES (%s, %s)
                    RETURNING id, username, password
                    """,
                    params,
                )

                user = None
                row = cur.fetchone()
                if row is not None:
                    user = {}
                    for i, column in enumerate(cur.description):
                        user[column.name] = row[i]
                return user

    def update_user(self, user_id, data):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                params = [
                    data.username,
                    user_id,
                ]
                cur.execute(
                    """
                    UPDATE users
                    SET username = %s
                    WHERE id = %s
                    RETURNING id, username
                    """,
                    params,
                )

                record = None
                row = cur.fetchone()
                if row is not None:
                    record = {}
                    for i, column in enumerate(cur.description):
                        record[column.name] = row[i]

                return record

    def delete_user(self, user_id):
        with pool.connection() as conn:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    DELETE FROM users
                    WHERE id = %s
                    """,
                    [user_id],
                )
