-- Drop and recreate Comments table

DROP TABLE IF EXISTS comments CASCADE;

CREATE TABLE comments (
  owner_id INTEGER REFERENCES users(id),
  resource_id INTEGER REFERENCES resources(id),
  comment TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
