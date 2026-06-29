document.addEventListener("DOMContentLoaded", () => {

    const timeline = document.getElementById("timeline");
    let items = Array.from(document.querySelectorAll(".timeline-item"));

    function setItemPositions(itemList) {
        itemList.forEach((item, index) => {
            item.classList.remove("left", "right");
            item.classList.add(index % 2 === 0 ? "left" : "right");
        });
    }

    function sortTimelineItems() {
        items.sort((a, b) => {
            const dateA = new Date(a.dataset.date || "1970-01-01");
            const dateB = new Date(b.dataset.date || "1970-01-01");
            return dateB - dateA;
        });

        items.forEach(item => timeline.appendChild(item));
        setItemPositions(items);
    }

    sortTimelineItems();

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
        const visibleItems = [];

        items.forEach((item, index) => {
            const matchType =
                typeFilter === "all" || item.classList.contains(typeFilter);

            const matchCat =
                catFilter === "all" || item.classList.contains(catFilter);

            const shouldShow = matchType && matchCat;

            item.style.transitionDelay = shouldShow ? `${index * 45}ms` : "0ms";

            if (shouldShow) {
                item.classList.remove("hide");
                item.classList.add("show");
                visibleItems.push(item);
            } else {
                item.classList.remove("show");
                item.classList.add("hide");
                item.classList.remove("left", "right");
            }
        });

        setItemPositions(visibleItems);
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