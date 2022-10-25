steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE accounts(
            id SERIAL NOT NULL,
            username VARCHAR(100) PRIMARY KEY NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE accounts;
        """,
    ],
    [
        # "Up" SQL statement; Create table
        """
        CREATE TABLE transactions (
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(100) REFERENCES accounts(username) NOT NULL,
            symbol VARCHAR(100) NOT NULL,
            type_of VARCHAR(100) NOT NULL,
            time_of_purchase TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            quantity NUMERIC NOT NULL,
            price NUMERIC NOT NULL
        );
        """,
        # "Down" SQL statement; Drop table
        """
        DROP TABLE transactions;
        """,
    ],
    [
        # "Up" SQL statement; Create table
        """
        CREATE TABLE positions (
            symbol VARCHAR(100) NOT NULL,
            id SERIAL PRIMARY KEY NOT NULL,
            username VARCHAR(100) REFERENCES accounts(username) NOT NULL,
            name VARCHAR(100) NOT NULL,
            quantity NUMERIC NOT NULL,
            type_of VARCHAR(100) NOT NULL
        );
        """,
        # "Down" SQL statement; Drop table
        """
        DROP TABLE positions;
        """,
    ],
]

# python -m migrations up (will build the table)
# python -m migrations down (will remove table)
