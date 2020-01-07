/*
CREATE TABLE articles (
   article_id serial PRIMARY KEY,
   title VARCHAR (200) UNIQUE NOT NULL,
   article TEXT NOT NULL,
   trawled_on TIMESTAMP NOT NULL
);
*/

CREATE TABLE sources (
   source_id serial PRIMARY KEY,
   name VARCHAR (200) UNIQUE NOT NULL,
   url VARCHAR (100),
   created_on TIMESTAMP NOT NULL DEFAULT NOW(),
   updated_on TIMESTAMP NOT NULL DEFAULT NOW()
);