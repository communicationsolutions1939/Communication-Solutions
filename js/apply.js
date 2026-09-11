document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);

    const selectedPosition = params.get("position");

    const positionDropdown = document.getElementById("position");
    const locationDropdown = document.getElementById("location");
    const applicationForm = document.getElementById("application-form");
    const applicationMessage =
        document.getElementById("application-message");

    if (
        !positionDropdown ||
        !locationDropdown ||
        typeof jobs === "undefined"
    ) {
        return;
    }


    /*
     * Populate Position Dropdown
     */

    Object.keys(jobs).forEach(function (jobID) {

        const job = jobs[jobID];

        const option = document.createElement("option");

        option.value = jobID;

        option.textContent = job.title;

        positionDropdown.appendChild(option);

    });


    /*
     * Populate Location Dropdown
     */

    const locations = new Set();

    Object.keys(jobs).forEach(function (jobID) {

        const job = jobs[jobID];

        if (job.location) {

            locations.add(job.location);

        }

    });


    locations.forEach(function (location) {

        const option = document.createElement("option");

        option.value = location;

        option.textContent = location;

        locationDropdown.appendChild(option);

    });


    /*
     * Autofill Position and Location
     * From Selected Job
     */

    if (selectedPosition && jobs[selectedPosition]) {

        const selectedJob = jobs[selectedPosition];

        positionDropdown.value = selectedPosition;

        if (selectedJob.location) {

            locationDropdown.value = selectedJob.location;

        }

    }


    if (!applicationForm) {
        return;
    }


    /*
     * Required Fields
     */

    const requiredFields = [
        positionDropdown,
        locationDropdown,
        document.getElementById("first-name"),
        document.getElementById("last-name"),
        document.getElementById("email"),
        document.getElementById("phone"),
        document.getElementById("city")
    ];


    /*
     * Remove Error When Field Is Corrected
     */

    requiredFields.forEach(function (field) {

        if (!field) {
            return;
        }


        field.addEventListener("input", function () {

            if (field.value.trim()) {

                field.classList.remove("field-error");

            }

        });


        field.addEventListener("change", function () {

            if (field.value.trim()) {

                field.classList.remove("field-error");

            }

        });

    });


    /*
     * Submit Application
     */

    applicationForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            let formIsValid = true;


            requiredFields.forEach(function (field) {

                if (!field) {
                    return;
                }


                if (!field.value.trim()) {

                    field.classList.add("field-error");

                    formIsValid = false;

                } else {

                    field.classList.remove("field-error");

                }

            });


            if (!formIsValid) {
                return;
            }


            const submitButton = applicationForm.querySelector(
                'button[type="submit"]'
            );


            if (submitButton) {

                submitButton.disabled = true;
                submitButton.textContent = "Sending...";

            }


            if (applicationMessage) {

                applicationMessage.textContent = "";

            }


            try {

                const response = await fetch(
                    applicationForm.action,
                    {
                        method: "POST",
                        body: new FormData(applicationForm),
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


                if (response.ok) {

                    window.location.href = "thank-you.html";

                } else {

                    throw new Error(
                        "Application submission failed."
                    );

                }


            } catch (error) {

                if (applicationMessage) {

                    applicationMessage.textContent =
                        "Something went wrong. Please try again.";

                }


                if (submitButton) {

                    submitButton.disabled = false;
                    submitButton.textContent =
                        "Submit Application";

                }

            }

        }
    );

});