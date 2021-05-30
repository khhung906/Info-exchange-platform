import { Router } from 'express';
import Course from '../../models/course.js';
import Account from '../../models/account.js'
import bodyParser from 'body-parser';
import course from '../../models/course.js';

const router = Router();

router.post('/addcourse', async function(req, res) {
    try {
        const data = new Course(req.body);
        const data2 = new Account(req.body);
        // console.log(data, data2);
        const existing = await Course.findOne({course_id : data.course_id});
        const account = await Account.findOne({email : data2.email});
        // console.log(existing)
        console.log(account)
        if (existing) {
            let courses = account.course;
            // console.log(data.course_name)
            courses.push(existing.course_name+"("+existing.course_id+")")
            // account.course.push(data.course_id);
            // console.log(account);
            res.send({message : "Add successfully", classinfo : existing.course_name});
            await account.update({course : courses});
        }
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})

router.post('/loadcourse', async function(req, res) {
    try{
        console.log("he");
        const data = new Account(req.body);
        const account = await Account.findOne({email : data.email})
        const courses = account.course;
        console.log(account);
        res.send({classinfo : courses})
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})




export default router;
