import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_id : String,
    course_name : String,
    course_dayofweek : [Number],
    course_time : [Number],
    activity: [String], 
    which : Number
})

export default mongoose.model('Course', courseSchema);