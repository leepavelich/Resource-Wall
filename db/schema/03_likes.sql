-- Drop and recreate Likes table

DROP TABLE IF EXISTS likes CASCADE;

CREATE TABLE likes (
  owner_id INTEGER REFERENCES users(id),
  resource_id INTEGER REFERENCES resources(id)
);
