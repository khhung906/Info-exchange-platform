import mongoose from 'mongoose';
const Schema = mongoose.Schema;
require('mongoose-double')(mongoose);
const mapSchema = new Schema({
   Name : String,
   id : String,
   image : String,
   Seats : Number,
   latitude : SchemaTypes.Double,
   longtitude : SchemaTypes.Double
})

export default mongoose.model('Map', mapSchema);