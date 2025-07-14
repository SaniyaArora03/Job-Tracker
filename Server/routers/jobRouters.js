const express=require("express");
const router=express.Router();

//import functions
const { getData, addJob,deleteJob }=require('../controllers/jobControllers');

//defining routes
router.get("/", getData);    // GET /api/jobs
router.post("/", addJob);    // POST /api/jobs
router.delete("/:id", deleteJob);  //delete job


module.exports=router;