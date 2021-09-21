var app=require('express');
var application=app();
var cors=require('cors');
var bodyParser=require('body-parser');
var mongoose=require('mongoose');
var User=require('./models/User.js');
application.use(cors());
application.use(bodyParser.json());



application.get('/user/:starting/:ending/:departure/:type1',async (req,res)=>
{
   User.find({starting:req.params.starting, ending:req.params.ending,
    departure:req.params.departure, return1:req.params.return1, type1:req.params.type1}).then((search)=>{
    
        if(search)
        {
            search1=JSON.stringify(search)
            //var user=res.json(search)
            res.status(200).send(search1);
        }
        else
        {
            res.status(404).send();
        }
    }).catch((err)=> 
	{
        if(err)
        {
            throw err;
        }
    })
}); 




application.delete('/delete/:vv',(req,res)=>
{
    User.findOneAndRemove({Flight_id:req.params.vv}).then(function(User){
        res.send(User);
    })
})

application.post('/register',(req,res)=>{ 
    var userData=req.body;
 
    var user=new User(userData);
    user.save((error,result)=>{  
        if(error)
        {
            console.log("userdata=",userData);
            res.status(403).send();
        }
        else
        {
            console.log('Saved Data Successfully');
            res.status(200).send();
        }
    })
});



const dbURI = 'mongodb+srv://vamsi:vamsi@cluster0.enahx.mongodb.net/myFourthDatabase';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => application.listen(1330))
  .catch((err) => console.log(err));

  module.exports=application;