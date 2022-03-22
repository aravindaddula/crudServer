let express = require("express");
let mongoose = require("mongoose");
let cors = require("cors");

let app = express();
// middleware configuration
    app.use(cors());
    app.use(express.json());

// db configuration
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;
let Hero = mongoose.model("Hero", new Schema({
    id : ObjectId,
    firstname : String,
    lastname : String,
    email : String,
    city : String
}));


// const url = "mongodb://localhost:27017/onlinedb";
const url = 'mongodb+srv://harvey:Aa7730061615@cluster0.aasej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(url)
.then(()=> console.log("DB Connected"))
.catch(err=>console.log("Error", err));


// route configurations
// CRUD : Create Read Update Delete
app.get("/data", ( req, res)=>{
    // READ
    Hero.find((error, heroes)=>{
        if(error){console.log("Error ", error)}
        else{ res.json(heroes)}
    })
});
app.post("/data", (req, res)=>{
    // WRITE
    console.log("Post Request")
    console.log(req.body)
    let hero = new Hero(req.body);
    hero.save()
    .then(()=> res.status(200).send({message : "User was added in to database"}))
    .catch(error =>{
        console.log("Error ", error);
        res.status(400).send({error : "Failed to create hero"})
    });
});
app.get("/edit/:id", ( req, res)=>{
    // READ BEFORE UPDATE
    Hero.findById(req.params.id, (error, hero)=>{
        if(error){ res.status(404).send({ error : error.message }); console.log("Error", error)}
        else{res.status(200).json(hero)}
    })
});
app.post("/edit/:id", ( req, res)=>{
    // UPDATE
    console.log("Update Request")
    Hero.findById(req.params.id, (error, hero)=>{
        if(error){ res.status(404).send({ error : error.message }); console.log("Error", error)}
        else{
            hero.firstname = req.body.firstname;
            hero.lastname = req.body.lastname;
            hero.power = req.body.power;
            hero.city = req.body.city;
            hero.save()
            .then( hero => res.json( hero ))
            .catch( err => res.status(400).send({error : err}))
        }
    })
});
app.delete("/delete/:id", ( req, res)=>{
    // DELETE
    Hero.findByIdAndDelete({_id : req.params.id},(error, hero)=>{
        if(error){ console.log("Error", error)}
        else{res.send({ message : "User was deleted"})}
    })
});

// web server configuration
app.listen(5050, "localhost", ()=> console.log("server is live on localhost:5050"))