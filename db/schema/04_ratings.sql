-- Drop and recreate Ratings table

DROP TABLE IF EXISTS ratings CASCADE;

CREATE TABLE ratings (
  user_id INTEGER REFERENCES users(id),
  resource_id INTEGER REFERENCES resources(id),
  rating SMALLINT
);
