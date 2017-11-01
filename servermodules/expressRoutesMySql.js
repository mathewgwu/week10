var mysql      = require('mysql');
module.exports = function(app) {
app.get('/api/columnchart', function(req,res) {
  var connection = mysql.createConnection({
     host     : 'localhost',
     user     : 'root',
     password : 'admin',
     database : 'charts'
   });
  connection.connect();
   var numofcolleges = 'all';//req.query.numofcolleges;
   console.log('number of colleges : ', numofcolleges);

   if(numofcolleges == 'all') {
     connection.query('SELECT * from collegesbystate',
       function(err, rows, fields) {
         if (!err)
           console.log('The solution is: ', rows);
        else
           console.log('Error while performing Query.', err);
        res.send(rows);

      });
   }else {
       connection.query('SELECT * from collegesbystate where numcolleges > ?',numofcolleges,
       function(err, rows, fields) {
         if (!err)
           console.log('The solution is: ', rows);
        else
           console.log('Error while performing Query.', err);
        res.send(rows);

      });
   }

   connection.end();

 });

 // application -------------------------------------------------------------
 app.get('*', function(req, res) {
   res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
 });
 
 }
