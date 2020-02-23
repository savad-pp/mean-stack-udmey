const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const uri="mongodb+srv://user:RCYjMY5yzEYryLAn@jsmonk-gftte.mongodb.net/mean_stack?retryWrites=true&w=majority"
mongoose.connect(uri, {useNewUrlParser: true})
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connection success from mongoose:')
});
const postSchema =new Schema({
    id: {type:String},
    title: {type:String, required:true},
    content: {type:String, required:true},
    imagePath:{type :String,required:true},
    creator:{type: mongoose.Schema.Types.ObjectId, ref:"User" ,required:true}
})

module.exports= mongoose.model('Posts',postSchema)