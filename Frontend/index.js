document.addEventListener("DOMContentLoaded",()=>{
    const jobList=document.getElementById("jobList"); //area where card will be displayed

    //check if user is logged in
    const userId = localStorage.getItem("userId"); //getting user id from local storage
  if (!userId) {
    alert("⚠️ Please log in to see your jobs.");
    window.location.href = "login.html";
    return;
  }
    //fetch jobcards and render
    const fetchAndDisplay=async()=>{
        try{
          console.log("🧠 userId from localStorage:", userId);

            const res = await fetch(`http://localhost:5000/api/jobs?userId=${userId}`);

            const jobs = await res.json();  //all jobs in database
            
console.log("🔍 Jobs received from server:", jobs);

if (!Array.isArray(jobs)) {
  throw new Error("❌ Expected an array but got something else.");
}

            

            //display
            jobList.innerHTML="";  //clear the container

            //if empty
            if (jobs.length === 0) {
  document.querySelector(".freshUser").style.display = "block";
  return;
} else {
  document.querySelector(".freshUser").style.display = "none";
}

            //if not empty then display
            jobs.forEach(job => {
                const card = document.createElement("div");  //create a new card
                card.classList.add("job-card");  // add class for css
                
                //build inner html of card
                card.innerHTML = `
                <h2>${job.company}</h2>
                <p><strong>Role:</strong> ${job.role}</p>
          <p><strong>Status:</strong> ${job.status}</p>
          <p><strong>Date:</strong> ${
            job.appliedDate
              ? new Date(job.appliedDate).toLocaleDateString()
              : "N/A"
          }</p>
          <p><a href="${job.jobLink}" target="_blank"> View</a></p>
          ${job.isBookmarked ? "<p>⭐ Bookmarked</p>" : ""}
          <button class="delete-btn" data-id="${job._id}">🗑 Delete</button>
  <button class="edit-btn" data-id="${job._id}">✏️ Edit</button>
        `;
        jobList.appendChild(card);  //append card to the container
            })

            //button to delete
            document.querySelectorAll(".delete-btn").forEach(button => {
  button.addEventListener("click", async () => {
    const id = button.dataset.id;
    if (confirm("Delete this job?")) {
      await fetch(`http://localhost:5000/api/jobs/${id}`, { method: "DELETE" });
      fetchAndDisplay(); // reload jobs
    }
  });
});

        }catch(err){
            console.error("❌ Could not load jobs", err);
      jobList.innerHTML = "<p>Error loading jobs.</p>";
        }
    }
    fetchAndDisplay();
});