import { Router } from 'express';
import Map from '../../models/map.js';
import bodyParser from 'body-parser';

const router = Router();

router.post('/loadAllData',async function(req, res) {
    try {
        const data = await Map.find({});
        // console.log(data);
        // let transData = data.comments(e => JSON.parse(e));
        // data.comments = transData;
        for (let i = 0; i < data.length; i++) {
            data[i].comments.forEach((val, idx) => {
                return (data[i].comments[idx] = JSON.parse(val));
            })
        }
        //console.log(data)
        res.send({message : "load Successfully", Data : data});
    }catch(e) {
        res.send({message : "Something went wrong"});
    }
})

router.post('/updateInfo', async function(req, res) {
    //name, seats, time
    try {
        console.log(req.body)
        let site = await Map.findOne({Name : req.body.Name});
        console.log(site);
        await Map.update({Name : req.body.Name}, {Seats : req.body.seats, time : req.body.time});
        console.log(site);
        res.send({message : "update Successfully", newinfo : site});
        
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})


router.post('/updateComment', async function(req, res) {
    //user, comment, Name(site)
    try {
        const site = await Map.findOne({Name : req.body.Name})
        // console.log(site.comments)
        let comments = site.comments.map(e => JSON.parse(e));
        let json_comments = [...site.comments];
        // if (site.comments.length != 0) {
        //     comments = JSON.parse(site.comments);
        // }   
        console.log(comments);
        console.log(json_comments);
        comments.push({UserName : req.body.UserName, comment : req.body.comment, time : req.body.time});
        json_comments.push(JSON.stringify({UserName : req.body.UserName, comment : req.body.comment, time : req.body.time}))
        res.send({message : "updateMessage Successfully", comments})
        await Map.update({Name : req.body.Name}, {comments : json_comments});
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})
export default router;