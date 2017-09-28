var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/img')
	},
	filename: function(req, file, cb){
		cb(null, file.originalname);
	}
});
var upload = multer({storage: storage}).single('imageFile');


app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//APP

app.get('/', function(req, res){
	res.render('mainpage');
});

app.post('/upload', function(req, res){
	upload(req, res, function(err){
		if(err){
			console.log(err);
			return;
		}
		var imageFile = req.file.size;
		console.log(imageFile);
		res.send({
			fileSize: imageFile
		});
	});
});

app.listen(process.env.PORT || 3000, function(){
	console.log('listening on port 3000');
});

