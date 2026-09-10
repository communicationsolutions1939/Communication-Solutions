document.addEventListener("DOMContentLoaded", function () {

    const employerForm = document.getElementById("employer-inquiry-form");

    if (!employerForm) {
        return;
    }


    const requiredFields = [
        document.getElementById("company-name"),
        document.getElementById("contact-name"),
        document.getElementById("current-title"),
        document.getElementById("email"),
        document.getElementById("phone"),
        document.getElementById("role-type"),
        document.getElementById("location"),
        document.getElementById("hiring-needs")
    ];


    employerForm.addEventListener("submit", function (event) {

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

            event.preventDefault();

        }

    });


    requiredFields.forEach(function (field) {

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