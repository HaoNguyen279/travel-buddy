BEGIN;

DROP TABLE IF EXISTS
  favorites,
  ratings,
  comments,
  posts,
  refreshtokens,
  places,
  users
CASCADE;

COMMIT;

-- Extension cho gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- =========================
-- 1) SCHEMA (lowercase hết)
-- =========================

CREATE TABLE users (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  avatar_url VARCHAR(255),
  bio TEXT,
  created_at timestamp(6) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE refreshtokens (
  token_id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,

  token_hash TEXT NOT NULL UNIQUE,

  session_id UUID NOT NULL DEFAULT gen_random_uuid(),
  user_agent TEXT,
  ip INET,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,

  revoked_at TIMESTAMP NULL,

  replaced_by_token_id BIGINT NULL REFERENCES refreshtokens(token_id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_refreshtokens_user_id ON refreshtokens(user_id);
--CREATE INDEX IF NOT EXISTS idx_name ON table_name(column_name);
CREATE INDEX IF NOT EXISTS idx_refreshtokens_expires_at ON refreshtokens(expires_at);

CREATE TABLE places (
  place_id SERIAL PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  address TEXT,
  city VARCHAR(100),
  country VARCHAR(100),
  category VARCHAR(50),
  image_url VARCHAR(255),
  average_rating DECIMAL(3, 2) DEFAULT 0,
  created_at timestamp DEFAULT current_timestamp
);

CREATE TABLE posts (
  post_id SERIAL PRIMARY KEY,
  user_id UUID,
  place_id INT,
  content TEXT NOT NULL,
  image_url VARCHAR(255),
  created_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (place_id) REFERENCES places(place_id) ON DELETE SET NULL
);

CREATE TABLE comments (
  comment_id SERIAL PRIMARY KEY,
  post_id INT,
  user_id UUID,
  comment_text TEXT NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (post_id) REFERENCES posts(post_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE NO ACTION
);

CREATE TABLE ratings (
  rating_id SERIAL PRIMARY KEY,
  user_id UUID,
  place_id INT,
  score INT CHECK (score >= 1 AND score <= 5),
  review TEXT,
  created_at timestamp DEFAULT current_timestamp,
  UNIQUE(user_id, place_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (place_id) REFERENCES places(place_id) ON DELETE CASCADE
);

CREATE TABLE favorites (
  user_id UUID,
  place_id INT,
  saved_at timestamp DEFAULT current_timestamp,
  PRIMARY KEY (user_id, place_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (place_id) REFERENCES places(place_id) ON DELETE CASCADE
);