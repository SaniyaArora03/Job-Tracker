document.addEventListener("DOMContentLoaded",()=>{
    const form = document.getElementById("jobForm"); //getting form data

    //submitting add form
    form.addEventListener("submit",async(e)=>{
        e.preventDefault(); //preventing default form submission

        //get the logged in user's id from local storage
        const userId = localStorage.getItem("userId");
        //if user id doesnt exist
        if (!userId) {
      alert("⚠️ Please log in first.");
      window.location.href = "login.html"; // redirect if not logged in
      return;
    }

        //extract form values
        const formData = {
      company: document.getElementById("company").value.trim(),
      role: document.getElementById("role").value.trim(),
      jobLink: document.getElementById("jobLink").value.trim(),
      status: document.getElementById("status").value,
      appliedDate: document.getElementById("appliedDate").value,
      isBookmarked: document.getElementById("isBookmarked").checked,
      userId: userId,
    };
    //display on index page
    try{
        const response = await fetch('/api/jobs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',},
                body: JSON.stringify(formData),
                });
                if (!response.ok) {
        throw new Error("Failed to save job");
      }

      alert("✅ Job saved successfully!");
         form.reset();
    }catch(err){
        console.error(err);
        alert("❌ Failed to add job. Try again.");
    }
    })
})