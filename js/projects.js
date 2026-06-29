document.addEventListener("DOMContentLoaded", () => {

    const items = document.querySelectorAll(".timeline-item");

    // ✅ SCROLL ANIMATION
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    items.forEach(item => observer.observe(item));

    // ✅ FILTER STATE
    let typeFilter = "all";
    let catFilter = "all";

    const typeButtons = document.querySelectorAll(".filter-btn");
    const catButtons = document.querySelectorAll(".cat-btn");

    // ✅ FILTER FUNCTION
    function applyFilters() {
        items.forEach(item => {

            const matchType =
                typeFilter === "all" || item.classList.contains(typeFilter);

            const matchCat =
                catFilter === "all" || item.classList.contains(catFilter);

            // ✅ toggle hide class
            item.classList.toggle("hide", !(matchType && matchCat));
        });
    }

    // ✅ TYPE FILTER BUTTONS
    typeButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            typeButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            typeFilter = btn.dataset.filter;
            applyFilters();
        });
    });

    // ✅ CATEGORY FILTER BUTTONS
    catButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            catButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            catFilter = btn.dataset.cat;
            applyFilters();
        });
    });

});