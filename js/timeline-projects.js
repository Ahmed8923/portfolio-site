// Fetch projects from the static JSON file and render them as timeline items
async function loadTimelineProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();

        const timeline = document.getElementById('timeline');
        if (!timeline) return;

        projects.sort((a, b) => new Date(b.dateSort) - new Date(a.dateSort));

        projects.forEach((project, index) => {
            const position = index % 2 === 0 ? 'left' : 'right';
            const tagsList = (project.tags || []).map(tag => `<span class="tag">${tag}</span>`).join('');
            const typeClass = project.type ? project.type.toString().toLowerCase() : 'college';
            const categoryClass = project.category ? project.category.toString().toLowerCase().replace(/\s+/g, '-') : 'other';

            const timelineItem = document.createElement('div');
            timelineItem.className = `timeline-item ${position} reveal ${typeClass} ${categoryClass}`;
            timelineItem.dataset.date = project.dateSort;
            timelineItem.addEventListener('click', () => openModal(project.id));

            timelineItem.innerHTML = `
                <div class="content">
                    <span class="date">${project.date}</span>
                    <h4>${project.title}</h4>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${tagsList}
                    </div>
                </div>
            `;

            timeline.appendChild(timelineItem);
        });
    } catch (error) {
        console.error('Error loading timeline projects:', error);
    }
}

// Keep a promise so the filter script waits until the timeline has finished loading
window.timelineProjectsReady = null;
document.addEventListener('DOMContentLoaded', () => {
    window.timelineProjectsReady = loadTimelineProjects();
});
