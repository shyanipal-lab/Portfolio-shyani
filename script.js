document.addEventListener("DOMContentLoaded", function () {

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {

entries.forEach((entry) => {

if (entry.isIntersecting) {
entry.target.classList.add("active");
}

});

});

revealElements.forEach((el) => {
observer.observe(el);
});

});
