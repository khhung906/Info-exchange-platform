import { Router } from 'express';
import Account from '../../models/account.js';
import bodyParser from 'body-parser';

const router = Router();

router.post('/register', async function (req, res) {
  try {
    const data = new Account(req.body);
    const existing = await Account.findOne({name : data.name, mail : data.mail, password : data.password});
    if (existing) {
      console.log("Account exists");
      res.send({message : "Account exists"});
    }
    else {
      console.log("register successfully");
      res.send({message : "register successfully"});
      await data.save();
    }
        
  } catch (e) {
    console.log("Something went wrong...");
    res.json({ message: 'Something went wrong...' });
  }
});

router.post('/login', async function(req, res) {
  try {
    const data = new Account(req.body);
    const existing = await Account.findOne({name : data.name, mail : data.mail, password : data.password});
    if (existing) {
      console.log("login successfully")
      res.send({message : "login successfully"});
    }
    else {
      console.log("Account doesn't exist");
      res.send({message : "Account doesn't exist"});
    }
  } catch(e) {
    res.json({ message : "Something went wrong"});
  }
});
export default router;
