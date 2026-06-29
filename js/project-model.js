// Store fetched project data by project ID so the modal can open the correct entry
let projectDetails = {};
let projectDataPromise = null;

// Load all project data from the SQLite-backed API once and reuse it
async function loadProjects() {
    if (projectDataPromise) return projectDataPromise;

    projectDataPromise = (async () => {
        try {
            const response = await fetch('/api/projects');
            const projectsArray = await response.json();

            projectsArray.forEach(project => {
                projectDetails[project.id] = project;
            });
        } catch (error) {
            console.error('Error loading projects:', error);
        }
    })();

    return projectDataPromise;
}

// Build the gallery section inside the modal using image/video data from the project record
function renderMediaGallery(mediaItems) {
    if (!mediaItems || mediaItems.length === 0) {
        return "";
    }

    return `
        <div class="modal-gallery">
            ${mediaItems.map(item => {
                if (item.type === "video") {
                    // Detect video type from file extension
                    const fileExt = item.src.split('.').pop().toLowerCase();
                    let mimeType = "video/mp4";
                    if (fileExt === "mkv") mimeType = "video/x-matroska";
                    else if (fileExt === "webm") mimeType = "video/webm";
                    
                    return `
                        <div class="modal-media-card">
                            <video controls preload="metadata" class="modal-media">
                                <source src="${item.src}" type="${mimeType}">
                                Your browser does not support the video tag.
                            </video>
                            ${item.caption ? `<p class="media-caption">${item.caption}</p>` : ""}
                        </div>
                    `;
                }

                return `
                    <div class="modal-media-card">
                        <img src="${item.src}" alt="${item.alt || "Project preview"}" class="modal-media">
                        ${item.caption ? `<p class="media-caption">${item.caption}</p>` : ""}
                    </div>
                `;
            }).join("")}
        </div>
    `;
}

// Create the full HTML content shown in the modal for a selected project
function renderProjectModal(project) {
    const actionButtons = `
        <div class="modal-actions">
            ${project.repoUrl ? `<a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="modal-action-btn repo-btn"><i class="bi bi-github"></i> GitHub Repository</a>` : ""}
            ${project.websiteUrl ? `<a href="${project.websiteUrl}" target="_blank" rel="noopener noreferrer" class="modal-action-btn website-btn"><i class="bi bi-box-arrow-up-right"></i> View Website</a>` : ""}
        </div>
    `;

    return `
        <div class="modal-shell">
            <div class="modal-header">
                <div>
                    <p class="modal-eyebrow">Featured Project</p>
                    <h2>${project.title}</h2>
                    <p class="modal-date">${project.date}</p>
                </div>
                <span class="modal-pill">${project.category}</span>
            </div>

            <div class="modal-body-content">
                <p class="modal-description">${project.description}</p>

                <div class="modal-tags">
                    ${project.tags.map(tag => `<span class="modal-tag">${tag}</span>`).join("")}
                </div>

                ${actionButtons}

                <div class="modal-gallery-section">
                    <div class="gallery-heading">
                        <h3>Project Gallery</h3>
                        <p>Images and video from the final build and showcase materials.</p>
                    </div>
                    ${renderMediaGallery(project.media)}
                </div>
            </div>
        </div>
    `;
}

// Open the modal and display the matching project details
async function openModal(id) {
    await loadProjects();

    const project = projectDetails[id];

    if (!project) return;

    document.getElementById("modal-body").innerHTML = renderProjectModal(project);

    document.getElementById("projectModal").style.display = "flex";
    document.body.style.overflow = "hidden";
}

function closeModal() {
    document.getElementById("projectModal").style.display = "none";
    document.body.style.overflow = "auto";
}
