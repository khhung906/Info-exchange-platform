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
      res.send({msg : "Account exists"});
    }
    else {
      data.credit = 100;
      data.money = 0;
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
export default router;
