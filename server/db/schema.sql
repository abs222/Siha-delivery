CREATE TABLE partners (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'not_available',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  pickup_location VARCHAR(255) NOT NULL,
  delivery_location VARCHAR(255) NOT NULL,
  pickup_coordinates POINT NOT NULL,
  delivery_coordinates POINT NOT NULL,
  status VARCHAR(20) DEFAULT 'pending',
  partner_id INTEGER REFERENCES partners(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);