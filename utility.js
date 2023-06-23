const PostModel = require("./models/Post");
const UserModel = require("./models/User");

let addArticle = async ({title, content, authorId=""})=>{
    console.log("entered add article", title, content);
    try{
        PostModel.create({
            title: title,
            content: content,
        })
    }catch(err){
        console.log("error while creating article addArticle: ", err);
    }
}

let getAllArticles = async() => {
    try{
        let allArticles = await PostModel.findAll();
        console.log("allArticles>",allArticles);
        return allArticles;
    }catch(err){
        console.log("error while getting articles in getAllArticles: ", err);
        return null;
    }
}

module.exports = {
    addArticle,
    getAllArticles
}