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
  const userEmail = localStorage.getItem("email");

  let allJobs = [];

  // Fetch jobs and display
  const fetchAndDisplay = async () => {
    try {
      const res = await fetch(`/api/jobs?userId=${userId}`);
      const jobs = await res.json();

      if (!Array.isArray(jobs)) throw new Error("Invalid job data");

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

    // Delete logic
    document.querySelectorAll(".delete-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const id = button.dataset.id;
        if (confirm("Delete this job?")) {
          await fetch(`/api/jobs/${id}`, { method: "DELETE" });
          fetchAndDisplay();
        }
      });
    });

    // Edit logic
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", async () => {
        const id = button.dataset.id;
        const jobToEdit = allJobs.find((job) => job._id === id);

        if (!jobToEdit) {
          alert("Job not found");
          return;
        }

        const updatedRole = prompt("Edit role:", jobToEdit.role);
        const updatedStatus = prompt("Edit status:", jobToEdit.status);

        if (updatedRole && updatedStatus) {
          try {
            const response = await fetch(`/api/jobs/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ role: updatedRole, status: updatedStatus }),
            });

            if (!response.ok) throw new Error("Failed to update job");
            alert("✅ Job updated!");
            fetchAndDisplay();
          } catch (err) {
            console.error(err);
            alert("❌ Failed to update job");
          }
        }
      });
    });
  };

  // Filter + Search logic
  const applyFilters = () => {
    const searchText = searchInput.value.toLowerCase();
    const selectedStatus = statusFilter.value;

    const filtered = allJobs.filter((job) => {
      const isMatch =
        job.company.toLowerCase().includes(searchText) ||
        job.role.toLowerCase().includes(searchText) ||
        job.status.toLowerCase().includes(searchText);

      const matchesStatus = selectedStatus === "" || job.status === selectedStatus;

      return isMatch && matchesStatus;
    });

    renderJobs(filtered);
  };

  // Attach filter listeners
  searchInput.addEventListener("input", applyFilters);
  statusFilter.addEventListener("change", applyFilters);

  // Initial fetch
  fetchAndDisplay();

  // Logout logic
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("userId");
      window.location.href = "login.html";
    });
  }
});
