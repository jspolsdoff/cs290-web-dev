CREATE TABLE workouts (
	id int(10) NOT NULL AUTO_INCREMENT,
	name varchar(255) NOT NULL,
	reps int(10),
	weight int(10),
	date date,
	lbs boolean,
	PRIMARY KEY (id)
	) ENGINE=InnoDB;

INSERT INTO workouts
(name, reps, weight, date, lbs) VALUES
('Military Press', '12', '120', '2015-10-10', '1');