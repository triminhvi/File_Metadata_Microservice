var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'public/img')
	},
	filename: function(req, file, cb){
		cb(null, file.originalname + '-' + Date.now());
	}
});
var upload = multer({storage: storage}).single('imageFile');
var app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//APP

app.get('/', function(req, rest){
	res.render('mainpage');
});
app.listen(process.env.PORT || 3000, function(){
	console.log('listening on port 3000');
})

