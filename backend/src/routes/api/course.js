import { Router } from 'express';
import Course from '../../models/course.js';
import Account from '../../models/account.js'
import bodyParser from 'body-parser';

const router = Router();

router.post('/add_course', async function(req, res) {
    try {
        const data = new Course(req.body);
        const data2 = new Account(req.body);
        const existing = await Course.findOne({name : data.name});
        const account = await Account.findOne({email : data2.email});
        if (existing) {
            account.course.push(data.name);
            res.send({message : "Add successfully"});
            await account.update();
        }
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})

export default router;
