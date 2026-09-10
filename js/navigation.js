// ========================================
// MOBILE NAVIGATION
// ========================================

const menuButton =
    document.getElementById("mobile-menu-button");

const navLinks =
    document.getElementById("nav-links");


if (menuButton && navLinks) {

    menuButton.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "mobile-open"
            );


            const isOpen =
                navLinks.classList.contains(
                    "mobile-open"
                );


            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );


            menuButton.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation menu"
                    : "Open navigation menu"
            );


            menuButton.textContent =
                isOpen ? "✕" : "☰";

        }
    );


    const links =
        navLinks.querySelectorAll("a");


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navLinks.classList.remove(
                    "mobile-open"
                );


                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );


                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );


                menuButton.textContent =
                    "☰";

            }
        );

    });

}