CREATE TABLE IF NOT EXISTS MEMBER (
    member_id bigint NOT NULL AUTO_INCREMENT,
    email varchar NOT NULL,
    nickname varchar NOT NULL,
    password varchar NOT NULL,
    PRIMARY KEY (member_id)
);