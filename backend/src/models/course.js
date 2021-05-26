import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_id : { type : String, unique : true },
    course_name : String,
    course_dayofweek : [Number],
    course_time : [Number]
})

export default mongoose.model('Course', courseSchema);