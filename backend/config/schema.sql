CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL CHECK (char_length(name) >= 20),
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  address VARCHAR(400),
  role VARCHAR(20) NOT NULL CHECK (role IN ('admin', 'user', 'store_owner')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stores (
  id SERIAL PRIMARY KEY,
  name VARCHAR(60) NOT NULL CHECK (char_length(name) >= 20),
  email VARCHAR(255) UNIQUE NOT NULL,
  address VARCHAR(400),
  owner_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ratings (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  store_id INTEGER REFERENCES stores(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, store_id)
);

-- Default admin user
-- Password: Admin@123
INSERT INTO users (name, email, password, address, role)
VALUES (
  'System Administrator Account',
  'admin@storeapp.com',
  '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
  'Admin Office Main Street Address',
  'admin'
);