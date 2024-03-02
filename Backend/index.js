require("dotenv").config();
const express=require("express");
const cors=require("cors");
const connect=require('./database/db');
const errorMiddleware=require('./middleware/errorMiddleware');
const userRouter=require('./Routes/userRouter');
const multer = require('multer');
const path = require('path');
const user=require('./Schema/uploadSchema');


const app=express();
app.use(express.json());
app.use(cors());

const port=process.env.PORT;

app.use(express.static(__dirname+'/public')); 
app.use('/images/:string', express.static(__dirname+'/public/'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage })

app.post('/upload', upload.array('files'), async(req, res) => {
    //   console.log('Uploaded files:', req.files);
    
    //   res.send('File upload successful');
    const filelinks = req.files.map((file) => `/uploads/${file.filename}`);
    console.log('File links:', filelinks);
    
    const data=await user.create({
      profile:filelinks
    })
      res.status(200).json({data});
});

app.get('/upload/list',async(req,res)=>{
    try{
      const data=await user.find({});
      console.log(data);
      if(data){
          res.status(200).json({data:data});
      }
  
     }catch(error){
      res.status(500).json({message:"we dont find any list"})
     }
})


app.get('/',(rq,res)=>{
    res.status(201).json({message:"welcome to the blinkit"});
})
app.use('/user',userRouter)

app.use(errorMiddleware);
connect();

app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`);
})