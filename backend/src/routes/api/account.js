import { Router } from 'express';
import Account from '../../models/account.js';
import bodyParser from 'body-parser';

const router = Router();

router.post('/CreateUser', async function (req, res) {
  try {
    const data = new Account(req.body);
    const existing = await Account.findOne({email : data.email});
    if (existing) {
      console.log("Account exists");
      res.send({message : "Account exists"});
    }
    else {
      data.credit = 100;
      data.money = 0;
      data.course = [];
      console.log("register successfully");
      res.send({message : "register successfully"});
      await data.save();
    }
  } catch (e) {
    console.log("Something went wrong...");
    res.json({ message: 'Something went wrong...' });
  }
});

router.get('/GetUserInfo', async function(req, res) {
  try {
    const data = new Account(req.query);
    const existing = await Account.findOne({email : data.email});
    if (existing) {
      if (existing.password === data.password) {
        console.log("login successfully");
        res.send({message : "login successfully", Info : existing});
      }
      else {
        console.log("Wrong password");
        res.send({message : "Wrong password"});
      }
    }
    else {
      console.log("Account doesn't exist");
      res.send({message : "Account doesn't exist"});
    }
  } catch(e) {
    console.log("Something went wrong");
    res.json({ message : "Something went wrong"});
  }
});

router.post('/deleteCourse', async function(req, res) {
  try {
      const delete_class = req.body.delete_class;
      const data = new Account(req.body);
      const account = await Account.findOne({email : data.email})
      let courses = account.course;
      const idx = courses.indexOf(delete_class);
      courses.splice(idx,1);
      await Account.updateOne({email : account.email}, {course : courses});
      
  } catch(e) {
    res.send({message : "Something went wrong"});
  }
})

export default router;
