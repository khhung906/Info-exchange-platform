import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    name : String,
    email : String,
    password : String,
    credit : Number,
    money : Number,
    course : [String]
    //courses : Array
})

export default mongoose.model('Account', accountSchema);