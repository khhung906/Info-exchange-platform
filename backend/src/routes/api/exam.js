import { Router } from 'express';
import Exam from '../../models/exam.js';
import Examnf from '../../models/exam_nf.js';
import multer from 'multer';
const upload = multer({
    limit: {
      // restriction: 10MB
      fileSize: 10000000
    }
  })

const router = Router();

// file: Buffer,
// filename: String,
// course: String,
// year: Number, 
// semester: String,
// test: String

router.post('/savefile',upload.single('file'), async function(req, res) {
    try{
        console.log(req.body)
        console.log(req.file)
        let exam = new Exam();
        exam.file = req.file.buffer;
        await exam.save();
        let examnf = new Examnf(req.body);
        examnf.examid = exam._id
        await examnf.save();
        res.send({message : "upload Succesfully"});
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})

router.post('/findfiles', async function(req, res) {
  try{
    const exams = await Examnf.find({course: req.body.course});
    console.log(exams)
    res.send({message : "find Succesfully", exams});
  } catch(e) {
      res.send({message : "Something went wrong"});
  }
})

router.post('/loadfile', async function(req, res) {
  try{
    const exam = await Exam.findById(req.body.examid);
    console.log(exam)
    res.send({message : "load Succesfully", exam});
  } catch(e) {
      res.send({message : "Something went wrong"});
  }
})




export default router;