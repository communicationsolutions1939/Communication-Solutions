document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contact-form");

    if (!contactForm) {
        return;
    }

    const requiredFields = [
        document.getElementById("name"),
        document.getElementById("email"),
        document.getElementById("phone"),
        document.getElementById("message")
    ];

    contactForm.addEventListener("submit", function (event) {

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