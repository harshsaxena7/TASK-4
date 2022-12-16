//importing dependencies
const express = require("express")
const app=express();
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
const port = process.env.PORT || 3000;
const nodemailer = require("nodemailer");
var Form=require("./models/Form");
const utility = require("./util");

mongoose.connect("mongodb+srv://harshsaxena7:wewereonabreak@register-data.scv8sz0.mongodb.net/test",{
	useNewUrlParser: true,
	useUnifiedTopology: true
});

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
	res.render("form");
});

app.get('/result',(req,res)=>{
	res.render('result');
});

//creating form
app.post("/",function(req,res){
	var username=req.body.username;
	var email=req.body.email;
	var password=req.body.password;
	var f={username: username,email:email ,password:password};
	Form.create(f,function(err,newlyCreatedForm){
		if(err)
		{
			console.log(err);
		}else{
	    let subject = "Register Info";
        let sentTo = email;
        let content = "<b>Congrats You are Registered!</b>"

        let sentResponse = utility.mailsend(subject, sentTo, content);

        console.log("Email Send response " + sentResponse);
			res.redirect("/result");
		}
	});
});

// Starting the server at port 3000
app.listen(port, ()=>{
	console.log('Server running on port $(port)' );
});
