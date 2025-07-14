document.addEventListener("DOMContentLoaded", () => {
  const jobList = document.getElementById("jobList");
  const searchInput = document.querySelector(".searchInput");
  const statusFilter = document.getElementById("statusFilter");

  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("⚠️ Please log in to see your jobs.");
    window.location.href = "login.html";
    return;
  }

  let allJobs = [];

  // Fetch jobs and display
  const fetchAndDisplay = async () => {
    try {
      console.log("🧠 userId from localStorage:", userId);

      const res = await fetch(`http://localhost:5000/api/jobs?userId=${userId}`);
      const jobs = await res.json();

      console.log("🔍 Jobs received from server:", jobs);

      if (!Array.isArray(jobs)) {
        throw new Error("❌ Expected an array but got something else.");
      }

      allJobs = jobs;
      renderJobs(jobs);
    } catch (err) {
      console.error("❌ Could not load jobs", err);
      jobList.innerHTML = "<p>Error loading jobs.</p>";
    }
  };

  // Render jobs
  const renderJobs = (jobs) => {
    jobList.innerHTML = "";

    if (jobs.length === 0) {
      document.querySelector(".freshUser").style.display = "block";
      return;
    } else {
      document.querySelector(".freshUser").style.display = "none";
    }

    jobs.forEach((job) => {
      const card = document.createElement("div");
      card.classList.add("job-card");

      card.innerHTML = `
        <h2>${job.company}</h2>
        <p><strong>Role:</strong> ${job.role}</p>
        <p><strong>Status:</strong> ${job.status}</p>
        <p><strong>Date:</strong> ${
          job.appliedDate ? new Date(job.appliedDate).toLocaleDateString() : "N/A"
        }</p>
        <p><a href="${job.jobLink}" target="_blank"> View</a></p>
        ${job.isBookmarked ? "<p>⭐ Bookmarked</p>" : ""}
        <button class="delete-btn" data-id="${job._id}">🗑 Delete</button>
        <button class="edit-btn" data-id="${job._id}">✏️ Edit</button>
      `;

      jobList.appendChild(card);
    });

    // Add delete functionality
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const id = button.dataset.id;
        if (confirm("Delete this job?")) {
          await fetch(`http://localhost:5000/api/jobs/${id}`, { method: "DELETE" });
          fetchAndDisplay(); // reload jobs
        }
      });
    });
  };

  // Filter + Search logic
  const applyFilters = () => {
    const searchText = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    const filtered = allJobs.filter((job) => {
      const isMatch = //checks if search text is present
        job.company.toLowerCase().includes(searchText) ||
        job.role.toLowerCase().includes(searchText) ||
        job.status.toLowerCase().includes(searchText);

      const matchesStatus = selectedStatus === ""  || job.status === selectedStatus; //checks if dropdown is empty or selected status matches job status

      return isMatch && matchesStatus;
    });

    renderJobs(filtered);
  };

  // Attach filter listeners
  searchInput.addEventListener("input", applyFilters);
  statusFilter.addEventListener("change", applyFilters);

  // Initial fetch
  fetchAndDisplay();
});
