import { Router } from 'express';
import Map from '../../models/map.js';
import bodyParser from 'body-parser';

const router = Router();

router.post('/loadAllData',async function(req, res) {
    try {
        const data = await Map.find({});
        // console.log(data);
        res.send({message : "load Successfully", Data : data});
    }catch(e) {
        res.send({message : "Something went wrong"});
    }
})

router.post('/updateInfo', async function(req, res) {
    //name, seats
    try {
        console.log(req.body)
        let site = await Map.findOne({Name : req.body.Name});
        console.log(site);
        await Map.update({Name : req.body.Name}, {Seats : req.body.seats});
        console.log(site);
        res.send({message : "update Successfully", newinfo : site});
        
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})


router.post('/updateComment', async function(req, res) {
    //user, comment, Name(site)
    try {
        const site = await Map.findOne({Name : req.body.name})
        let comments = JSON.parse(site.comments);
        comments.push({UserName : req.body.UserName, comment : req.body.comment});
        res.send({message : "updateMessage Successfully", comments})
        await Map.update({Name : req.body.Name}, {comments : JSON.stringify(comments)});
    } catch(e) {
        res.send({message : "Something went wrong"});
    }
})
export default router;