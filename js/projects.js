const items = document.querySelectorAll(".timeline-item");



const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.2
});

items.forEach(item => observer.observe(item));



document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(".timeline-item");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));

    let typeFilter = "all";
    let catFilter = "all";

    const typeButtons = document.querySelectorAll(".filter-btn");
    const catButtons = document.querySelectorAll(".cat-btn");

    function applyFilters() {
        items.forEach(item => {

            const matchType = (typeFilter === "all" || item.classList.contains(typeFilter));
            const matchCat = (catFilter === "all" || item.classList.contains(catFilter));

            item.classList.toggle("hide", !(matchType && matchCat));
        });
    }

    typeButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            typeFilter = btn.dataset.filter;
            applyFilters();
        });
    });

    catButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            catFilter = btn.dataset.cat;
            applyFilters();
        });
    });

});
