-- Database: melochord

-- DROP DATABASE IF EXISTS melochord;

CREATE TABLE IF NOT EXISTS songs (
	id serial PRIMARY KEY,
	name VARCHAR ( 50 ) NOT NULL,
	artist VARCHAR ( 50 ) NOT NULL,
	album VARCHAR ( 50 ) NOT NULL,
	createdAt TIMESTAMP NOT NULL,
    updatedAt TIMESTAMP 
);