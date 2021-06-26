import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const examSchema = new Schema({
    file: Buffer
})

export default mongoose.model('Exam', examSchema);