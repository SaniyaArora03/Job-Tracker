//acquiring database data
const Job=require('../models/addJob');

const getData=async(req,res)=>{
    try {

      //user login
      const userId = req.query.userId;
if (!userId) return res.status(400).json({ error: "User ID required" });

//get data
    const jobs = await Job.find({userId});
   //display data
    res.status(200).json(jobs); // ✅ return JSON data because using fetch
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
}
const addJob=async(req,res)=>{
  try{
    //acquire data of add form
    const jobData=req.body;

    //if user with this email doesnt exist
    if (!jobData.userId) {
  return res.status(400).json({ error: "User ID is required" });
}


   
    //create new job in database
    const newJob=await Job.create(jobData);
    res.status(201).json(newJob);

  }catch(error){
    res.status(500).json({error:"Failed to add job"});
  }
}

// Delete a job
const deleteJob = async (req, res) => {
  try {
    await Job.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job" });
  }
};

module.exports = { getData, addJob,deleteJob };