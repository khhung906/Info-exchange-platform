import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const accountSchema = new Schema({
    name : String,
    email : String,
    password : String,
})

export default mongoose.model('Account', accountSchema);