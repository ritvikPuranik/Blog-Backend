const express = require('express');
const bodyParser = require('body-parser');
const db = require("./config/database");
const port = 8080;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PostModel = require("./models/Post");
const UserModel = require("./models/User");

const {
    addArticle,
    viewArticle,
    getAllArticles,
    authorizeUser,
    addUser} = require('./utility');


const initApp = async () => {
    console.log("Testing the database connection..");
    try {
        await db.authenticate();
        console.log("Connection has been established successfully.");

        db.sync();

        app.listen(port, () => {
            console.log(`Server is up and running at: http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Unable to connect to the database:", error.original);
    }
};


//Get Routes
app.get('/', async(req,res)=>{
    res.redirect('/login');
})
app.get('/login', async(req,res)=>{
    try{
        console.log("req.query", req.query);
        let userId = await authorizeUser(req.query);
        userId? res.status(200).send({message:"Entered Login Page", ID: userId}): res.status(403).send({message:"Forbidden"});
    }catch(err){
        console.log("Error while loggin in>>", err);
        res.status(400).send({message:"Couldn't login"})
    }
})
app.get('/getArticles', async(req,res)=>{
    try{
        let allArticles = await getAllArticles(req.query.id);
        let response = {};
        if(allArticles){
            response = {
                "articles": allArticles
            }
            res.status(200).send(response);
        }else{
            response = {
                "articles": null
            }
            res.status(404).send(response);
        }
    }catch(err){
        console.log("Error while fetching all Articles>>", err);
    }
})

app.get('/viewArticle/:id', async(req, res)=>{
    try{
        let articleContent = await viewArticle(req.params.id);
        articleContent.id ? res.status(200).send({"result": articleContent}) : res.status(404).send({"result": "Article Not Found"});
    }catch(err){
        console.log("error while viewing Article>", err);
        res.status(404).send({"result":"Article Not Found"});
    }
})

//POST Routes
app.post('/submitArticle', async(req,res)=>{
    try{
        console.log("body received>>", req.body);
        await addArticle(req.body);
        res.status(201).send({"response": "Article Submitted Successfully"});

    }catch(err){
        console.log("error while submitting article: ", err);
        res.status(401).send("Article Upload Failed");
    }
})
app.post('/signup', async(req,res)=>{
    try{
        console.log("User Details received>>", req.body);
        let userID = await addUser(req.body);
        res.status(201).send({
            "response": "User Created Successfully",
            "ID": userID
        });

    }catch(err){
        console.log("error while submitting article: ", err);
        res.status(401).send("Article Upload Failed");
    }
})

//DELETE Routes
app.delete('/deleteArticle', async(req,res)=>{
    try{
        await deleteArticle();

    }catch(err){
        console.log("Error while deleting articles: ", err);
        res.status(405).send("Error while deleting article");
    }
})

initApp();