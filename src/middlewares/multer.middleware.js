import multer from "multer";

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./uploads')
  },
  filename:(req,file,cb)=>{
    const uniqueName = Date.now()+'-'+file.originalname;
    cb(null,uniqueName)
  }
})

//you can add your filtering file function here.


export const upload = multer({storage})