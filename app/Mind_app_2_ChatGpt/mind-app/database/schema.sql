CREATE TABLE IF NOT EXISTS company (
 id TEXT PRIMARY KEY, name TEXT NOT NULL, stage TEXT NOT NULL DEFAULT 'areas' CHECK(stage IN ('areas','roles','open')), revision INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS areas (
 id TEXT PRIMARY KEY, name TEXT NOT NULL UNIQUE, parent_id TEXT REFERENCES areas(id) ON DELETE RESTRICT, x REAL NOT NULL, y REAL NOT NULL
);
CREATE TABLE IF NOT EXISTS positions (
 id TEXT PRIMARY KEY, area_id TEXT NOT NULL REFERENCES areas(id) ON DELETE RESTRICT, name TEXT NOT NULL,
 level TEXT NOT NULL DEFAULT 'consultoria' CHECK(level IN ('lideranca','gestao','consultoria')),
 parent_id TEXT REFERENCES positions(id) ON DELETE RESTRICT, x REAL NOT NULL, y REAL NOT NULL,
 UNIQUE(area_id,name)
);
CREATE TABLE IF NOT EXISTS users (
 id TEXT PRIMARY KEY, name TEXT NOT NULL, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
 is_admin INTEGER NOT NULL DEFAULT 0 CHECK(is_admin IN (0,1)), position_id TEXT REFERENCES positions(id) ON DELETE RESTRICT,
 status TEXT NOT NULL CHECK(status IN ('active','pending','blocked')), bio TEXT NOT NULL DEFAULT '', created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS sessions (
 token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE, expires_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS posts (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), area_id TEXT REFERENCES areas(id) ON DELETE RESTRICT,
 audience_level TEXT CHECK(audience_level IS NULL OR audience_level IN ('lideranca','gestao','consultoria')),
 title TEXT NOT NULL, body TEXT NOT NULL, category TEXT NOT NULL, created_at TEXT NOT NULL, updated_at TEXT
);
CREATE TABLE IF NOT EXISTS comments (
 id TEXT PRIMARY KEY, post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE, user_id TEXT NOT NULL REFERENCES users(id), body TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS reactions (
 post_id TEXT NOT NULL REFERENCES posts(id) ON DELETE CASCADE, user_id TEXT NOT NULL REFERENCES users(id), kind TEXT NOT NULL CHECK(kind IN ('like','save')), PRIMARY KEY(post_id,user_id,kind)
);
CREATE TABLE IF NOT EXISTS notifications (
 id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id), post_id TEXT REFERENCES posts(id) ON DELETE CASCADE, body TEXT NOT NULL, is_read INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS audit (
 id TEXT PRIMARY KEY, actor TEXT NOT NULL, action TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_positions_area ON positions(area_id);
CREATE INDEX IF NOT EXISTS idx_posts_area ON posts(area_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expiry ON sessions(expires_at);
