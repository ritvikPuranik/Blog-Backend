const PostModel = require("./models/Post");
const User = require("./models/User");
const UserModel = require("./models/User");

let addArticle = async ({title, content, imgUrl="", authorId=""})=>{
    console.log("entered add article", title, content, imgUrl);
    let meta = {
        imgUrl:imgUrl
    }
    try{
        PostModel.create({
            title: title,
            content: content,
            meta:JSON.stringify(meta)
        })
    }catch(err){
        console.log("error while creating article addArticle: ", err);
    }
}

let getAllArticles = async()=>{
    try{
        let allArticles = await PostModel.findAll();
        console.log("allArticles>",allArticles);
        return allArticles;
    }catch(err){
        console.log("error while getting articles in getAllArticles: ", err);
        return null;
    }
}

let authorizeUser = async({email, password})=>{
    console.log("USer email>>", email);
    console.log("USer password>>", password);
    try{
        let userDetails = await UserModel.findOne({ 
            where: {
                 email: email
                }
            });
        console.log("password match>",userDetails.password === password);
        return(userDetails.password === password);
    }catch(err){
        console.log("error while getting articles in getAllArticles: ", err);
        return false;
    }
}

let addUser = async({email, password, name})=>{
    console.log("USer email>>", email);
    console.log("USer password>>", password);
    try{
        await UserModel.create({
            name: name,
            email: email,
            password: password
        })
    }catch(err){
        console.log("error while add new User: ", err);
    }
}

module.exports = {
    addArticle,
    getAllArticles,
    authorizeUser,
    addUser
}