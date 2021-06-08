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
        else{
            res.send({message : "Add course fail"});
        }
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})

router.post('/loadcourse', async function(req, res) {
    try{
        const data = new Account(req.body);
        const account = await Account.findOne({email : data.email})
        const courses = account.course;
        console.log(account);
        res.send({classinfo : courses})
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})

router.post('/addschedule', async function(req, res) {
    try{
        console.log("add");
        const data = req.body.new_event;
        const couse_name = data.divider.split("(")[0];
        //console.log(couse_name)
        const course = await Course.findOne({course_name : couse_name});
        console.log(course)
        if (course) {
            // console.log(data.course_name)
            // courses.push(existing.course_name+"("+existing.course_id+")")
            // account.course.push(data.course_id);
            // console.log(account);
            console.log('exist')
            let activity = course.activity;
            activity.push(JSON.stringify(data))
            res.send({message : "Add successfully"});
            await course.update({activity : activity});
        }
        else{
            res.send({message : "Add course fail"});
        }
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})


router.post('/loadschedule', async function(req, res) {
    try{
        console.log("loadcsjnhslfds");
        const data = new Account(req.body);
        const account = await Account.findOne({email : data.email})
        const courses = account.course;
        let activities = []
        for(let i = 0; i < courses.length; i++){
            const couse_name = courses[i].split("(")[0];
            //console.log(couse_name)
            const course = await Course.findOne({course_name : couse_name});
            console.log(course)
            const activity = course.activity
            for(let j = 0; j < activity.length; j++){
                activities.push(JSON.parse(activity[j]))
            }
        }
        console.log(activities)
        //const account = await Account.findOne({email : data.email})
        //const courses = account.course;
        //console.log(account);
        res.send({message : "Load schedule success", scheduleinfo: activities})
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})


router.post('/changecourse', async function(req, res) {
    try {
        const data = new Course(req.body);
        // const course = await Course.findOne({course_id : data.course_id});
        await Course.updateOne({course_id : data.course_id},
                                { course_name : data.course_name,
                                 course_dayofweek : data.course_dayofweek,  
                                 course_time : data.course_time, 
                                 activity : data.activity});
        res.send({message : "Update successfully", courseinfo : data});
    } catch(e) {
        res.send({message : "something went wrong"})
    }
})
export default router;
