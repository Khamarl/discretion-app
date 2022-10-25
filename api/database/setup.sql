DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS token;
DROP TABLE IF EXISTS user_account;


CREATE TABLE user_account (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    user_password CHAR(60) NOT NULL, 
    is_admin BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_id)

);


CREATE TABLE post (
    post_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    content VARCHAR (500) NOT NULL,
    sender_id INT NOT NULL,
    recipient_id INT,
    PRIMARY KEY (post_id),
    FOREIGN KEY (sender_id) REFERENCES user_account("user_id"),
    FOREIGN KEY (recipient_id) REFERENCES user_account("user_id")

);

CREATE TABLE token (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_account("user_id")
)
