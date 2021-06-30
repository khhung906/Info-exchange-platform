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
        const existing = await Course.findOne({course_id : data.course_id});
        const account = await Account.findOne({email : data2.email});
        if (existing) {
            let courses = account.course;
            if (courses.indexOf(existing.course_name+"("+existing.course_id+")") === -1) {
                if (existing.which === 0) courses.push(existing.course_name+"("+existing.course_id+")");
                else courses.push(existing.course_name);
                res.send({message : "Add successfully", classinfo : existing.course_name, which : existing.which});
                await account.update({course : courses});
            }
            else {
                res.send({message : "Already added"})
            }
            
        }
        else{
            res.send({message : "Add course fail"});
        }
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})
//todo : addplace(which = 1)
router.post('/loadcourse', async function(req, res) {
    try{
        const data = new Account(req.body);
        const account = await Account.findOne({email : data.email})
        const courses = account.course;
        let ans = [];
        let ans_ = [];
        for (let i = 0; i < courses.length; i++) {
            let course_name = courses[i].split("(")[0];
            let db_course = await Course.findOne({course_name});
            ans.push(courses[i]);
            // if (db_course.which === 0) ans.push(courses[i]);
            // else ans_.push(courses[i]);
        }
        res.send({classinfo : ans})
        // if (req.body.which === 0) res.send({classinfo : ans})
        // else res.send({classinfo : ans_})
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})

router.post('/addschedule', async function(req, res) {
    try{
        const data = req.body.new_event;
        const couse_name = data.divider.split("(")[0];
        const course = await Course.findOne({course_name : couse_name});
        if (course) {
            // courses.push(existing.course_name+"("+existing.course_id+")")
            // account.course.push(data.course_id);
            let activity = course.activity;
            //data= {course_name : ..., time : time}
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
            const course = await Course.findOne({course_name : couse_name});
            const activity = course.activity
            for(let j = 0; j < activity.length; j++){
                activities.push(JSON.parse(activity[j]))
            }
        }
        //const account = await Account.findOne({email : data.email})
        //const courses = account.course;
        res.send({message : "Load schedule success", scheduleinfo: activities})
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})

router.post('/search', async function(req, res) {
    //keyword email 
    try{
        // console.log(req.body.which);
        let all = [];
        let result = []
        if (req.body.type === 0) {
            if (req.body.which === 1) {
                all = await Course.find({course_name : {"$regex": req.body.keyword, "$options": "i"}, which : 0})
                console.log(all)
                result = all.map(e => e.course_name);
            }
            else {
                all = await Course.find({course_id : {"$regex": req.body.keyword, "$options": "i"}, which : 0})
                result = all.map(e => e.course_id);
            }
        } 
        else if (req.body.type === 1){
            if (req.body.which === 1) {
                all = await Course.find({course_name : {"$regex": req.body.keyword, "$options": "i"}, which : 1})
                result = all.map(e => e.course_name);
            }
            else {
                all = await Course.find({course_id : {"$regex": req.body.keyword, "$options": "i"}, which : 1})
                result = all.map(e => e.course_id);
            }
        }
        else if (req.body.type === 2) {
            if (req.body.which === 1) {
                all = await Course.find({course_name : {"$regex": req.body.keyword, "$options": "i"}, which : 2})
                result = all.map(e => e.course_name);
            }
            else {
                all = await Course.find({course_id : {"$regex": req.body.keyword, "$options": "i"}, which : 2})
                result = all.map(e => e.course_id);
            }
        }
        else if (req.body.type === 3) {
            if (req.body.which === 1) {
                all = await Course.find({course_name : {"$regex": req.body.keyword, "$options": "i"}, which : 3})
                result = all.map(e => e.course_name);
            }
            else {
                all = await Course.find({course_id : {"$regex": req.body.keyword, "$options": "i"}, which : 3})
                result = all.map(e => e.course_id);
            }
        }
        console.log(result);
        let final = [];
        for (let i = 0; i < result.length; i++) {
            final.push({name : result[i]});
        }
        res.send({message : "search success", final})
    }catch(e) {
        res.send({message : "Something went wrong"});
    }
})

router.post('/getInfo', async function(req, res) {
    //mail,course_name or course_id, which
    try {
        const data = new Course(req.body);
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
        let idx = activity.findIndex(e => 
            JSON.parse(e).start === req.body.activity.start && 
            JSON.parse(e).end === req.body.activity.end && 
            JSON.parse(e).title === req.body.activity.title &&
            JSON.parse(e).description === req.body.activity.description && 
            JSON.parse(e).category === req.body.activity.category
        )
        activity.splice(idx, 1);
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
        let idx = activity.findIndex(e => 
            JSON.parse(e).start === req.body.activity.start && 
            JSON.parse(e).end === req.body.activity.end && 
            JSON.parse(e).title === req.body.activity.title &&
            JSON.parse(e).description === req.body.activity.description && 
            JSON.parse(e).category === req.body.activity.category
        )
        activity.splice(idx, 1);
        await course.update({activity : activity});
        res.send({message : "Update successfully", info : activity});
    } catch(e) {
        res.send({message : "something went wrong"})
    }
})

router.post('/deleteCourseArray', async function(req, res) {
    //course_name, email
    try {
        // console.log(1111)
        console.log(req.body);
        const user = await Account.findOne({email : req.body.email});
        let courses = user.course;
        console.log(courses)
        let idx = courses.indexOf(req.body.name);
        console.log(idx)
        courses.splice(idx, 1);
        await Account.update({email : req.body.email}, {course : courses});
        res.send({message : "delete Successfully"})

    } catch(e) {
        res.send({message : "Something went wrong"})
    }
})

export default router;
