'use strict';
const Pool = require('pg-pool');
const config = require("../config.json");
const {table,host,database,user,password,port} = config;
const pool =  new  Pool({
  host,
  database,
  user,
  password,
  port,
  idleTimeoutMillis: 1000
});

module.exports.updateMovie = (event, context, callback) => {
console.log('event', event);
const movie_id = event.body.movie_id;
const movie_name = event.body.movie_title;
const movie_genre = event.body.movie_genre;
const movie_year = event.body.movie_year_released;
  const upadateMovieInfo = `UPDATE ${table} SET  movie_name = $1, movie_year = $2, movie_genre = $3 WHERE movie_id = $;`;
  console.log(upadateMovieInfo, "update");
  pool.connect()
  .then(client => {
    client.release()
    return client.query(upadateMovieInfo, [movie_name, movie_year, movie_genre, movie_id]);
  })
  .then(res => {
  const response = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': 'http://127.0.0.1:8080',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      message: res,
    }),
  };

    callback(null, response);
  })
  .catch(err => {
    console.log('err', err);
  })
  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
