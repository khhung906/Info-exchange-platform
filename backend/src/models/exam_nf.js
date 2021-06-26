import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const examnfSchema = new Schema({
    filename: String,
    course: String,
    year: String, 
    semester: String,
    test: String,
    examid: mongoose.ObjectId,
})

export default mongoose.model('Examnf', examnfSchema);