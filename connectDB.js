import mongoose from 'mongoose';

// const url = "mongodb://localhost:27017/onlinedb";
const url = 'mongodb+srv://harvey:Aa7730061615@cluster0.aasej.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
//send connection request to DB
export default function connectDB(url){
    mongoose.connect(url)
    .then(()=> console.log("DB Connected"))
    .catch(err=>console.log("Error", err));
}