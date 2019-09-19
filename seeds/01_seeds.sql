INSERT INTO users 
VALUES (1, 'John Malkovich', 'john.malkovich@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users 
VALUES (2, 'Barbara Streisand', 'barbara.streisand@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');
INSERT INTO users 
VALUES (3, 'Steven Spielberg', 'steven.spielberg@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u');

INSERT INTO properties
VALUES (
  1,
  1,
  'Lake House',
  'description',
  'www.lighthouselabs.ca',
  'www.lighthouselabs.ca',
  400,
  2,
  2,
  3,
  'USA',
  'Elm Street',
  'Los Angeles',
  'California',
  'H2X1X8',
  TRUE
);

INSERT INTO properties
VALUES (
  2,
  2,
  'Studio Apartment',
  'description',
  'www.lighthouselabs.ca',
  'www.lighthouselabs.ca',
  600,
  0,
  2,
  1,
  'USA',
  'Park Avenue',
  'New York City',
  'NYC',
  'H3B19Y',
  TRUE
);

INSERT INTO properties
VALUES (
  3,
  3,
  'Riverside Duplex',
  'description',
  'www.lighthouselabs.ca',
  'www.lighthouselabs.ca',
  900,
  3,
  5,
  2,
  'USA',
  'Town Avenue',
  'Chicago',
  'Illinois',
  'H3B19Y',
  TRUE
);

INSERT INTO reservations
VALUES (
  1,
  '2018-09-10',
  '2018-09-25',
  1,
  2
);

INSERT INTO reservations
VALUES (
  2,
  '2018-10-10',
  '2018-10-15',
  2,
  1
);

INSERT INTO reservations
VALUES (
  3,
  '2018-12-25',
  '2018-12-28',
  3,
  2
);

INSERT INTO property_reviews 
VALUES (
  1,
  1,
  2,
  2,
  7,
  'message'
);

INSERT INTO property_reviews 
VALUES (
  2,
  2,
  1,
  1,
  9,
  'message'
);

INSERT INTO property_reviews 
VALUES (
  3,
  2,
  3,
  3,
  8,
  'message'
);