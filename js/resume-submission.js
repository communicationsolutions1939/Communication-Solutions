document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("resume-submission-form");

    if (!form) {
        return;
    }

    const requiredFields = Array.from(
        form.querySelectorAll("[required]")
    );

    function validateField(field) {
        const isValid = field.value.trim() !== "";

        field.classList.toggle("field-error", !isValid);

        return isValid;
    }

    requiredFields.forEach(function (field) {

        function recheckIfNeeded() {
            if (field.classList.contains("field-error")) {
                validateField(field);
            }
        }

        field.addEventListener("input", recheckIfNeeded);
        field.addEventListener("change", recheckIfNeeded);

    });

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        let firstInvalidField = null;

        requiredFields.forEach(function (field) {

            if (!validateField(field) && !firstInvalidField) {
                firstInvalidField = field;
            }

        });

        if (firstInvalidField) {

            firstInvalidField.focus();

            firstInvalidField.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

            return;
        }

        const submitButton = form.querySelector(
            'button[type="submit"]'
        );

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        try {

            const response = await fetch(
                form.action,
                {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (response.ok) {

                window.location.href = "thank-you.html";

            } else {

                throw new Error("Resume submission failed.");

            }

        } catch (error) {

            let formMessage = document.getElementById(
                "resume-form-message"
            );

            if (!formMessage) {

                formMessage = document.createElement("p");

                formMessage.id = "resume-form-message";
                formMessage.className = "form-message";
                formMessage.setAttribute("aria-live", "polite");

                form.appendChild(formMessage);

            }

            formMessage.textContent =
                "Something went wrong. Please try again.";

            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = "Submit Resume";
            }

        }

    });

});