DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS passages CASCADE;
DROP TABLE IF EXISTS op_mor_score_results CASCADE;
DROP TABLE IF EXISTS passages_op_results;

CREATE TABLE passages (
    id              SERIAL      PRIMARY KEY,
    title           TEXT        NOT NULL        UNIQUE,
    content         TEXT        NOT NULL        UNIQUE,
    is_public       BOOLEAN     NOT NULL
);

CREATE TABLE op_mor_score_results (
    id              SERIAL      PRIMARY KEY,
    score           INT         NOT NULL,
    cat_1_count     INT         NOT NULL,
    cat_2_count     INT         NOT NULL,
    cat_3_count     INT         NOT NULL,
    cat_4_count     INT         NOT NULL,
    cat_5_count     INT         NOT NULL
);

CREATE TABLE passages_op_results ( -- in this case, passages and op_mor_score_results
    id              SERIAL      PRIMARY KEY,
    passage_id      INT         NOT NULL        UNIQUE      REFERENCES passages                 ON DELETE CASCADE,
    op_result_id    INT         NOT NULL        UNIQUE      REFERENCES op_mor_score_results     ON DELETE CASCADE
);

CREATE TABLE users (
    id              SERIAL      PRIMARY KEY,
    name            TEXT        NOT NULL,
    email           TEXT        NOT NULL        UNIQUE,
    pw_hash         TEXT        NOT NULL,
    mor_score_score INT         NOT NULL        DEFAULT 0
);
