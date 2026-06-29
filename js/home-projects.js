// Map each project ID to a Bootstrap icon used on the home page cards
const projectIcons = {
    project1: "bi-laptop",
    project2: "bi-graph-up",
    project3: "bi-controller",
    project4: "bi-database",
    project5: "bi-puzzle",
    project6: "bi-heart-pulse"
};

// Fetch project data from the static JSON file and render the home page cards
async function loadHomeProjects() {
    try {
        const response = await fetch('data/projects.json');
        const projects = await response.json();

        const container = document.getElementById('projectsContainer');
        if (!container) return;

        let html = '';
        let cardCount = 0;

        projects.forEach(project => {
            if (cardCount % 3 === 0) {
                if (cardCount > 0) html += '</div>';
                html += '<div class="row pb-3">';
            }

            const icon = projectIcons[project.id] || 'bi-folder';
            const tagsList = project.tags.map(tag => `<span class="tag">${tag}</span>`).join('');

            html += `
                <div class="col-lg-4 mb-3 d-flex">
                    <div class="card text-center py-3 w-100">
                        <div class="card-body">
                            <div class="circle">
                                <span><i class="bi ${icon}"></i></span>
                            </div>
                            <h4 class="font-weight-bold pb-2">${project.title}</h4>
                            <div class="project-tags">
                                ${tagsList}
                            </div>
                            <p>${project.description}</p>
                        </div>
                    </div>
                </div>
            `;

            cardCount++;
        });

        if (cardCount > 0) html += '</div>';

        container.innerHTML = html;
    } catch (error) {
        console.error('Error loading home projects:', error);
    }
}

document.addEventListener('DOMContentLoaded', loadHomeProjects);
