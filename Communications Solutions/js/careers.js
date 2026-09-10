// ========================================
// CAREERS SEARCH
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const searchInput =
        document.getElementById("job-search");

    const locationFilter =
        document.getElementById("job-location");

    const departmentFilter =
        document.getElementById("job-department");

    const jobCards =
        document.querySelectorAll(".job-card");

    const jobListings =
        document.getElementById("job-listings");


    // ========================================
    // SAFETY CHECK
    // ========================================

    if (
        !searchInput ||
        !locationFilter ||
        !departmentFilter ||
        !jobListings ||
        jobCards.length === 0
    ) {
        return;
    }


    // ========================================
    // RESULTS MESSAGE
    // ========================================

    const resultsMessage =
        document.createElement("p");

    resultsMessage.className =
        "job-results-message";

    jobListings.appendChild(resultsMessage);


    // ========================================
    // FILTER JOBS
    // ========================================

    function filterJobs() {

        const searchTerm =
            searchInput.value.toLowerCase().trim();

        const selectedLocation =
            locationFilter.value.toLowerCase();

        const selectedDepartment =
            departmentFilter.value.toLowerCase();


        let visibleJobs = 0;


        jobCards.forEach(function (job) {

            const jobText =
                job.innerText.toLowerCase();

            const jobDepartment =
                job.dataset.department;


            const matchesSearch =
                jobText.includes(searchTerm);


            const matchesLocation =
                selectedLocation === "all" ||
                jobText.includes(selectedLocation);


            const matchesDepartment =
                selectedDepartment === "all" ||
                jobDepartment === selectedDepartment;


            const shouldShow =
                matchesSearch &&
                matchesLocation &&
                matchesDepartment;


            if (shouldShow) {

                job.style.display = "flex";

                visibleJobs++;

            } else {

                job.style.display = "none";

            }

        });


        // ========================================
        // RESULTS MESSAGE
        // ========================================

        if (visibleJobs === 0) {

            resultsMessage.textContent =
                "No positions match your search.";

        } else {

            resultsMessage.textContent =
                `${visibleJobs} position${visibleJobs === 1 ? "" : "s"} found.`;

        }

    }


    // ========================================
    // EVENT LISTENERS
    // ========================================

    searchInput.addEventListener(
        "input",
        filterJobs
    );


    locationFilter.addEventListener(
        "change",
        filterJobs
    );


    departmentFilter.addEventListener(
        "change",
        filterJobs
    );


    // ========================================
    // INITIAL RESULTS
    // ========================================

    filterJobs();

});