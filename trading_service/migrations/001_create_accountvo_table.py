steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts(
            id SERIAL NOT NULL,
            username VARCHAR(100) PRIMARY KEY NOT NULL,
            buying_power MONEY NOT NULL,
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """
    ]

]