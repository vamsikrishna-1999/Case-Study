const { application } = require('express');
const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');

require("./S");
const Flight=mongoose.model("Flight");
 

const dbURI = 'mongodb+srv://vamsi:vamsi@cluster0.enahx.mongodb.net/myFifthDatabase';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result)=>application.listen(1110))
  .catch((err) => console.log(err));
router.post('/user/:starting/:ending/:departure/:type1',(req,res)=>
{

    var bookingdata=
    {
        
        starting:req.params.starting,
        ending:req.params.ending,
        departure:req.params.departure,
        
        type1:req.params.type1
    }
    var flight=new Flight(bookingdata);
    flight.save().then(()=>
    {
        console.log("New Flight details Entered");
    }).catch((err) => {
        if(err)
        {
            throw err; 
        }
    })
    res.send("New Flight derails created");
});

module.exports=router