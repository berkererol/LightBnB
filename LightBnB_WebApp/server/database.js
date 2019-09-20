const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'lightbnb',
  port: '5432'
});

pool.connect();

const properties = require('./json/properties.json');
const users = require('./json/users.json');

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = (email) => {
  return pool.query(`
    SELECT * FROM users
    WHERE email = $1;
  `, [email])
    .then(res => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
    .catch(err => {
      console.log(`Error:`, err);
    });
}

exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = (id) => {
  return pool.query(`
    SELECT * FROM users
    WHERE id = $1;
  `, [id])
    .then(res => {
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    });
}

exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = (userObj) => {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *;
  `, [userObj.name, userObj.email, userObj.password])
    .then(res => {
      console.log(`new user: `, res.rows[0]);
      if (res.rows) {
        return res.rows[0];
      } else {
        return null;
      }
    })
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {
  return pool.query(`
    SELECT reservations.*, properties.*, AVG(rating) AS average_rating
    FROM reservations
    JOIN properties ON properties.id = reservations.property_id
    JOIN property_reviews ON property_reviews.property_id = reservations.property_id
    WHERE reservations.guest_id = $1
    GROUP BY reservations.id, properties.id
    ORDER BY reservations.start_date 
    LIMIT $2;
  `, [guest_id, limit])
    .then(res => {
      if (res.rows) {
        return res.rows;
      } else {
        return null;
      }
    })
}

exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = (options, limit = 10) => {

  let queryString = `
    SELECT properties.*, AVG(rating) AS average_rating
    FROM properties
    JOIN property_reviews ON properties.id = property_id
  `;
  let queryParams = [];

  // If there's already a parameter in queryParams, we change syntax to AND to set multiple conditions
  const checkParams = function () {
    if (queryParams.length > 1) {
      return ' AND';
    } else {
      return 'WHERE'
    }
  }

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `${checkParams()} city LIKE $${queryParams.length}`;
  }
  if (options.minimum_price_per_night) {
    queryParams.push(`${options.minimum_price_per_night}`);
    queryString += `${checkParams()} cost_per_night >= $${queryParams.length}`;
  }
  if (options.maximum_price_per_night) {
    queryParams.push(`${options.maximum_price_per_night}`);
    queryString += `${checkParams()} cost_per_night <= $${queryParams.length}`;
  }
  if (options.rating) {
    queryParams.push(`${options.rating}`);
    queryString += `${checkParams()} AVG(rating) >= $${queryParams.length}`;
  }

  queryParams.push(limit);
  queryString += `
    GROUP BY properties.id
    ORDER BY cost_per_night
    LIMIT $${queryParams.length}
  `

  return pool.query(queryString, queryParams)
    .then(res => res.rows);
}

exports.getAllProperties = getAllProperties;


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  const queryString = `
    INSERT INTO properties (
      owner_id, 
      title, 
      description, 
      thumbnail_photo_url, 
      cover_photo_url, 
      cost_per_night, 
      street, 
      city, 
      province, 
      post_code, 
      country, 
      parking_spaces, 
      number_of_bathrooms, 
      number_of_bedrooms)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *;
  `;

  const queryParams = [
    property.owner_id, 
    property.title, 
    property.description, 
    property.thumbnail_photo_url, 
    property.cover_photo_url, 
    property.cost_per_night, 
    property.street, 
    property.city, 
    property.province, 
    property.post_code, 
    property.country, 
    property.parking_spaces, 
    property.number_of_bathrooms, 
    property.number_of_bedrooms
  ];

  return pool.query(queryString, queryParams)
  .then(res => res.rows);
}

exports.addProperty = addProperty;

// const addProperty = function (property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// }