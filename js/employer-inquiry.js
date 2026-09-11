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


    employerForm.addEventListener("submit", async function (event) {

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


        const submitButton = employerForm.querySelector(
            'button[type="submit"]'
        );


        if (submitButton) {

            submitButton.disabled = true;
            submitButton.textContent = "Sending...";

        }


        try {

            const response = await fetch(
                employerForm.action,
                {
                    method: "POST",
                    body: new FormData(employerForm),
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            if (response.ok) {

                window.location.href = "thank-you.html";

            } else {

                throw new Error("Form submission failed.");

            }


        } catch (error) {

            const formMessage =
                document.getElementById("form-message");


            if (formMessage) {

                formMessage.textContent =
                    "Something went wrong. Please try again.";

            }


            if (submitButton) {

                submitButton.disabled = false;
                submitButton.textContent = "Send Message";

            }

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