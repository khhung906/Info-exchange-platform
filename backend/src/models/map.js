import mongoose from 'mongoose';
const Schema = mongoose.Schema;
// require('mongoose-double')(mongoose);

// var SchemaTypes = mongoose.Schema.Types;
const mapSchema = new Schema({
   Name : String,
   id : String,
   image : String,
   Seats : String,
   TotalSeats : Number,
   OpenHours : String,
   Description : String,
   latitude : Number,
   longitude : Number,
   comments : [String],
   time : String
})

export default mongoose.model('Map', mapSchema);