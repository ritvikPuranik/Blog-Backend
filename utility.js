const PostModel = require("./models/Post");
const UserModel = require("./models/User");

let addArticle = async ({title, content, imgUrl="", userId})=>{
    console.log("entered add article", title, content, imgUrl);
    let meta = {
        imgUrl:imgUrl
    }
    try{
        PostModel.create({
            title: title,
            content: content,
            meta:JSON.stringify(meta),
            userId: userId
        })
    }catch(err){
        console.log("error while creating article addArticle: ", err);
    }
}

let getAllArticles = async(id)=>{
    let allArticles;
    try{
        if(id==="all"){
            allArticles = await PostModel.findAll();
        }else{
            allArticles = await PostModel.findAll({
                where:{
                    userId: id
                }
            });
        }
        // console.log("allArticles>",allArticles);
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
        console.log(userDetails.password === password? userDetails.id : "null");
        return (userDetails.password === password? userDetails.id : null)
    }catch(err){
        console.log("error while getting articles in getAllArticles: ", err);
        return false;
    }
}

let addUser = async({email, password, name})=>{
    console.log("USer email>>", email);
    console.log("USer password>>", password);
    try{
        let userCreated = await UserModel.create({
            name: name,
            email: email,
            password: password
        })
        console.log("user ID created>>", userCreated.id);
        return userCreated.id;
    }catch(err){
        console.log("error while add new User: ", err);
        return null;
    }
}

let viewArticle = async(articleId)=>{
    try{
        let articleContent = await PostModel.findOne({ 
            where: {
                 id: articleId
                }
            });
            let result = {};
            if(articleContent){
                result = {
                    "id": articleContent.id,
                    "title": articleContent.title,
                    "content": articleContent.content
                }
            }
            console.log("result for viewArticle >", result);
            return result;

    }catch(err){
        console.log("error while fetching content: ", err);
        return null;
    }
}

module.exports = {
    addArticle,
    getAllArticles,
    authorizeUser,
    addUser,
    viewArticle
}