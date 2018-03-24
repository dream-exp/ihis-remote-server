const fs = require('fs');
const express = require('express');
const base64 = require('urlsafe-base64');
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json());

app.use('/get_image', express.static("./uploads/"));

//画像アップロードを受け付け
app.post('/upload', function(req, res) {
	console.log(req)
	var img = base64.decode(req.body.image);

	var date = new Date();
	var timestamp = date.getTime().toString();

	fs.writeFile("uploads/"+timestamp+'.jpg', img, function (err) {
	    console.log(err);
	});

	console.log(timestamp + "Image Saved.");

	res.send("http://172.20.10.2:3000/get_image/" + timestamp + ".jpg");	
});

app.listen(PORT);