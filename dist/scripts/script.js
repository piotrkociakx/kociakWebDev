"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const headers = document.querySelectorAll(".header");
    const container = document.querySelector(".container");
    container === null || container === void 0 ? void 0 : container.addEventListener("scroll", () => {
        headers.forEach((header) => {
            const rect = header.getBoundingClientRect();
            if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                header.style.opacity = "1";
            }
            else {
                header.style.opacity = "0.5";
            }
        });
    });
});
//# sourceMappingURL=script.js.map