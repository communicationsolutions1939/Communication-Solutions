// ========================================
// JOB DETAILS
// ========================================

const params =
    new URLSearchParams(window.location.search);

const jobID =
    params.get("job");

const job =
    jobs[jobID];


// ========================================
// DISPLAY JOB
// ========================================

if (job) {

    document.getElementById("job-title").textContent =
        job.title;

    document.getElementById("job-location").textContent =
        `${job.location} · ${job.type}`;


    document.getElementById("job-description").textContent =
        job.description;


    const responsibilities =
        document.getElementById("job-responsibilities");

    responsibilities.innerHTML = "";


    job.responsibilities.forEach(function (item) {

        const li =
            document.createElement("li");

        li.textContent =
            item;

        responsibilities.appendChild(li);

    });


    const qualifications =
        document.getElementById("job-qualifications");

    qualifications.innerHTML = "";


    job.qualifications.forEach(function (item) {

        const li =
            document.createElement("li");

        li.textContent =
            item;

        qualifications.appendChild(li);

    });


    // ========================================
    // APPLY BUTTON
    // ========================================

    const applyButton =
        document.getElementById("apply-button");


    if (applyButton) {

        applyButton.href =
            `apply.html?position=${jobID}`;

    }

}