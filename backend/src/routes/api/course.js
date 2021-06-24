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
        // console.log(account)
        if (existing) {
            let courses = account.course;
            // console.log(data.course_name)
            // console.log("hello", existing.course_name, courses.indexOf(existing.course_name+"("+existing.course_id+")"))
            if (courses.indexOf(existing.course_name+"("+existing.course_id+")") === -1) {
                // console.log("in");
                courses.push(existing.course_name+"("+existing.course_id+")");
                res.send({message : "Add successfully", classinfo : existing.course_name});
                await account.update({course : courses});
            }
            else {
                res.send({message : "Already added"})
            }
            // account.course.push(data.course_id);
            // console.log(account);
            
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
        // console.log(account);
        res.send({classinfo : courses})
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})

router.post('/addschedule', async function(req, res) {
    try{
        // console.log("add");
        const data = req.body.new_event;
        const couse_name = data.divider.split("(")[0];
        //console.log(couse_name)
        const course = await Course.findOne({course_name : couse_name});
        // console.log(course)
        if (course) {
            // console.log(data.course_name)
            // courses.push(existing.course_name+"("+existing.course_id+")")
            // account.course.push(data.course_id);
            // console.log(account);
            // console.log('exist')
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
        const data = new Account(req.body);
        const account = await Account.findOne({email : data.email})
        const courses = account.course;
        let activities = []
        for(let i = 0; i < courses.length; i++){
            const couse_name = courses[i].split("(")[0];
            //console.log(couse_name)
            const course = await Course.findOne({course_name : couse_name});
            // console.log(course)
            const activity = course.activity
            for(let j = 0; j < activity.length; j++){
                activities.push(JSON.parse(activity[j]))
            }
        }
        // console.log(activities)
        //const account = await Account.findOne({email : data.email})
        //const courses = account.course;
        //console.log(account);
        res.send({message : "Load schedule success", scheduleinfo: activities})
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})

router.post('/search', async function(req, res) {
    //keyword email 
    try{
        console.log(req.body.which);
        let all = [];
        let result = []
        if (req.body.which === 1) {
            all = await Course.find({course_name : {"$regex": req.body.keyword, "$options": "i"}})
            result = all.map(e => e.course_name)
        }
        else {
            all = await Course.find({course_id : {"$regex": req.body.keyword, "$options": "i"}})
            result = all.map(e => e.course_id)
        }
        console.log(all);
        let final = [];
        for (let i = 0; i < result.length; i++) {
            final.push({name : result[i]});
        }
        res.send({message : "search success", final})
    }catch(e) {
        // console.log(e);
        res.send({message : "Something went wrong"});
    }
})

router.post('/getInfo', async function(req, res) {
    //mail,course_name or course_id, which
    try {
        const data = new Course(req.body);
        // console.log(req.body)
        // const data_ = new Account(req.body);
        // const user = await Account.findOne({email : data_.email});
        let course = [];
        let ans = "";
        if (req.body.which === 1) {//course_name->course_id
            course = await Course.findOne({course_name : data.course_name});
            ans = course.course_id;
        }
        else {
            course = await Course.findOne({course_id : data.course_id})
            ans = course.course_name;
        }
        // console.log(ans)
        res.send({message : "getSuccess", info : ans})
    } catch(e){
        res.send({message : "something went wrong"});
    }
})

router.post('/changecourse', async function(req, res) {
    //course_name, activity : {divider, from, to, description, title}
    //new_course_name, newActivity
    try {
        console.log(req.body)
        const course = await Course.findOne({course_name : req.body.course_name});
        let activity = [...course.activity];
        let idx = activity.findIndex(e => JSON.parse(e).start === req.body.activity.start && JSON.parse(e).end === req.body.activity.end && JSON.parse(e).title === req.body.activity.title)
        // console.log(idx)
        activity.splice(idx);
        activity.push(JSON.stringify(req.body.newActivity));
        console.log(JSON.stringify(req.body.newActivity));
        console.log(activity)
        await course.update({activity : activity});
        res.send({message : "Update successfully", info : activity});
    } catch(e) {
        res.send({message : "something went wrong"})
    }
})
router.post('/deleteActivity', async function(req, res) {
    //course_name, activity : {title, start, end}
    try {
        // console.log(req.body)
        const course = await Course.findOne({course_name : req.body.course_name})
        let activity = [...course.activity];
        // console.log(activity)
        let idx = activity.findIndex(e => JSON.parse(e).start === req.body.activity.start && JSON.parse(e).end === req.body.activity.end && JSON.parse(e).title === req.body.activity.title)
        // console.log(idx)
        activity.splice(idx);
        await course.update({activity : activity});
        res.send({message : "Update successfully", info : activity});
    } catch(e) {
        res.send({message : "something went wrong"})
    }
})

export default router;
