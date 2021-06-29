import { Router } from 'express';
import Account from '../../models/account.js';
import bodyParser from 'body-parser';
import account from '../../models/account.js';
import bcrypt from 'bcrypt';
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
      const saltRounds = 10
      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(data.password, salt, function(err, hash) {
          data.password = hash;
          data.save();
        })
  })
      console.log("register successfully");
      res.send({message : "register successfully"});
      
    }
  } catch (e) {
    console.log("Something went wrong...");
    res.json({ message: 'Something went wrong...' });
  }
});

router.get('/GetUserInfo', async function(req, res) {
  try {
    console.log(req.query)
    const data = new Account(req.query);
    const existing = await Account.findOne({email : data.email});
    if (existing) {
      bcrypt.compare(req.query.password, existing.password, function(err, res_) {
        if (res_) {
          console.log("login successfully");
          res.send({message : "login successfully", Info : existing});
        }
        else {
          console.log("Wrong password");
          res.send({message : "Wrong password"});
        }
      })
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

router.post('/getUserData', async function(req, res) {
  //email
  try {

    const user = await Account.findOne({email : req.body.email})
    console.log(user)
    const allData = user.course;
    const icon = user.icon;
    // const pattern = new RegExp("[\u4E00-\u9FA5]+");
    // const pattern2 = new RegExp("[A-Za-z]+");
    // const course = allData.filter(e => e.indexOf('(') !== -1 && e.indexOf('-') === -1);
    // const club = allData.filter(e => pattern.test(e) && pattern2.test(e) && e.indexOf('(') === -1)
    // const place = allData.filter(e => e.indexOf('(') === -1 && e.indexOf('-') === -1 && !pattern2.test(e))
    // const game = allData.filter(e => e.indexOf('(') === -1 && e.indexOf('-') !== -1);
    res.send({message : "getSuccessfully", data : allData, icon});
  } catch(e) {
    res.send({message : "Something went wrong"});
  }
})

router.post('/updateIcon', async function(req, res) {
  try {
    console.log(req.body)
    await Account.update({email : req.body.email}, {icon : req.body.icon});
  } catch(e) {
    res.send({message : "Something went wrong"});
  }
})

export default router;
