const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const ModelIndex = require('./models');
const RouteManager = require('./routes');

ModelIndex
.openDatabase()
.then(_startServer)
.catch((err) => {
  console.error(err);
});

// INTERNAL

function _startServer() {

  const app = express();

	app.use(cors());
	app.options('*', cors());
  RouteManager.attach(app);
 /*app.all("/*", function(req,res,next){
  	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "X-Requested-With");
  	next();
  });*/
  //app.use(cors({credentials: true, origin: true}));
  app.listen(8080, function() {
    console.log('Server started on 8080...');
  });
}
