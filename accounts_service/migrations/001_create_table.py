steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts(
            id SERIAL NOT NULL,
            username VARCHAR(100) PRIMARY KEY NOT NULL,
            full_name VARCHAR(1000) NOT NULL,
            email VARCHAR(1000) NOT NULL,
            hashed_pass VARCHAR(1000) NOT NULL,
            buying_power MONEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ]
]
