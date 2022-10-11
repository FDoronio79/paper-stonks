steps = [
    [
        # "Up" SQL statement; Create table
        """
        CREATE TABLE transactions (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(100) REFERENCES accounts(username) NOT NULL,
            symbol VARCHAR(100) NOT NULL,
            type_of VARCHAR(100) NOT NULL,
            time_of_purchase TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            quantity INTEGER NOT NULL,
            price MONEY NOT NULL
        );
        """,
        # "Down" SQL statement; Drop table
        """
        DROP TABLE transactions;
        """
    ]
]

# python -m migrations up (will build the table)
# python -m migrations down (will remove table)


# Figure out price MONEY