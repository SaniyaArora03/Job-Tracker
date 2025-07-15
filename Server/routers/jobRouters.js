const express=require("express");
const router=express.Router();

//import functions
const { getData, addJob,deleteJob,updateJob }=require('../controllers/jobControllers');

//defining routes
router.get("/", getData);    // GET /api/jobs
router.post("/", addJob);    // POST /api/jobs
router.delete("/:id", deleteJob);  //delete job
router.patch("/:id", updateJob);       // ✅ PATCH /api/jobs/:id for editing

module.exports=router;