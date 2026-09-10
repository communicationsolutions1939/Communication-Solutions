document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);

    const selectedPosition = params.get("position");

    const positionDropdown = document.getElementById("position");
    const locationDropdown = document.getElementById("location");
    const applicationForm = document.getElementById("application-form");

    if (
        !positionDropdown ||
        !locationDropdown ||
        typeof jobs === "undefined"
    ) {
        return;
    }

    Object.keys(jobs).forEach(function (jobID) {

        const job = jobs[jobID];

        const option = document.createElement("option");

        option.value = jobID;

        option.textContent = job.title;

        positionDropdown.appendChild(option);

    });

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

    const personalFields = [
        document.getElementById("first-name"),
        document.getElementById("last-name"),
        document.getElementById("email"),
        document.getElementById("phone"),
        document.getElementById("city")
    ];

    applicationForm.addEventListener("invalid", function (event) {

        const field = event.target;

        if (personalFields.includes(field)) {

            field.classList.add("field-error");

        }

    }, true);

    personalFields.forEach(function (field) {

        if (!field) {
            return;
        }

        field.addEventListener("input", function () {

            if (field.value.trim()) {

                field.classList.remove("field-error");

            }

        });

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const applicationForm = document.getElementById("application-form");
    const cityField = document.getElementById("city");

    if (!applicationForm || !cityField) {
        return;
    }

    applicationForm.addEventListener("submit", function (event) {

        if (!cityField.value.trim()) {

            cityField.classList.add("field-error");

            event.preventDefault();

        } else {

            cityField.classList.remove("field-error");

        }

    });

    cityField.addEventListener("input", function () {

        if (cityField.value.trim()) {

            cityField.classList.remove("field-error");

        }

    });

});

document.addEventListener("DOMContentLoaded", function () {

    const cityField = document.getElementById("city");
    const submitButton = document.querySelector(
        '#application-form button[type="submit"]'
    );

    if (!cityField || !submitButton) {
        return;
    }

    submitButton.addEventListener("click", function () {

        if (!cityField.value.trim()) {

            cityField.classList.add("field-error");

        } else {

            cityField.classList.remove("field-error");

        }

    });

    cityField.addEventListener("input", function () {

        if (cityField.value.trim()) {

            cityField.classList.remove("field-error");

        }

    });

});