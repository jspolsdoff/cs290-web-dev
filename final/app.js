var express = require('express');
var mysql = require('mysql');

var pool = mysql.createPool({
	connectionLimit  :  10,
	host             :  'localhost',
	user             :  'student',	 
	password         :  'default',
	database         :  'student'
});


var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req, res, next){
	var context = {};
	pool.query('SELECT * FROM workouts', function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		context.results = rows;
		res.render('home', context);
	});
});

app.get('/insert', function(req, res, next){
	var context = {};
	pool.query("INSERT INTO workouts (`name`, `reps`, `weight`, `date`, `lbs`) VALUES (?,?,?,?,?)", 
		[req.query.name, req.query.reps, req.query.weight, req.query.date, req.query.lbs,], 
		function(err, result){
			if(err){
				next(err);
				return;
			}
	});

	pool.query('SELECT * FROM workouts', function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		context.results = rows;
		res.send('home', context);
	});
});

app.get('/delete', function(req, res, next){
	var context = {};
	pool.query("DELETE FROM workouts WHERE id=?", [req.query.id], function(err, result){
		if(err){
			next(err);
			return;
		}
	});

	pool.query("SELECT * FROM workouts", function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		context.results = rows;
		res.send('home', context);
	});
});

app.get('/safe-update',function(req,res,next){
  var context = {};
  pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
      var curVals = result[0];
      pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, lbs=? WHERE id=? ",
        [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight || curVals.weight, req.query.date || curVals.date, req.query.lbs || curVals.lbs, req.query.id],
        function(err, result){
        if(err){
          next(err);
          return;
        }
        context.results = "Updated " + result.changedRows + " rows.";
        res.send('home', context);
      });
    }
  });
});

app.get('/update-form',function(req,res,next){
	var context = {};
	pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		context.results = rows;
		res.render('update', context);
	});
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});