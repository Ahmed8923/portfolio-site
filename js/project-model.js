const projectDetails = {

    project1: `
    <h2>Promotional Website</h2>
    <p class="text-muted">Oct 2025</p>


    <p>
      This project is a full promotional website designed for a public figure.
      It includes product catalogue, contact form, and responsive design.
    </p>

    <div class="d-flex flex-wrap justify-content-center gap-2 mt-3">
      <span class="tag">HTML</span>
      <span class="tag">CSS</span>
      <span class="tag">JavaScript</span>
      <span class="tag">UI Design</span>
    </div>

    <img src="img/project-images/pr1.png" class="img-fluid rounded my-4">
    <br>
    <img src="img/project-images/pr1.2.png" class="img-fluid rounded my-4">
    <br>
    <img src="img/project-images/pr1.3.png" class="img-fluid rounded my-4">
    `,

    project2: `
    <h2>Digital Skills Roadmap</h2>
    <p class="text-muted">Nov 2025</p>


    <p>
        A research project exploring digital skills in modern careers,
        including job roles, employer expectations, and a personal
        career development plan.
    </p>

    <div class="d-flex flex-wrap justify-content-center gap-2 mt-3">
        <span class="tag">Research</span>
        <span class="tag">Career Planning</span>
        <span class="tag">Digital Skills</span>
        <span class="tag">Analysis</span>
    </div>


  `,

    project3: `
    <h2>Unity Game</h2>
    <p class="text-muted">Oct 2025</p>


    <p>
        This project is a prototype 2D video game developed using the
        Unity Game Engine, inspired by classic games such as Asteroids
        and Geometry Wars.
    </p>

    <div class="d-flex flex-wrap justify-content-center gap-2 mt-3">
      <span class="tag">Unity</span>
      <span class="tag">Game Dev</span>
      <span class="tag">2D Graphics</span>
      <span class="tag">Gameplay</span>
    </div>


    <video controls class="img-fluid rounded my-4">
        <source src="img/project-images/game.mkv" type="video/mp4">
        Your browser does not support the video tag.
    </video>

  `,


    project4: `
    <h2>Database System</h2>
    <p class="text-muted">Jan 2026</p>

    <p>
        A database system built using SQLite to manage users, products, and sales data, including CRUD operations and data analysis for business insights.
    </p>

    <div class="d-flex flex-wrap justify-content-center gap-2 mt-3">
        <span class="tag">SQLite</span>
        <span class="tag">SQL</span>
        <span class="tag">Database</span>
        <span class="tag">CRUD</span>
        <span class="tag">Data Analysis</span>
    </div>

    <img src="img/project-images/pr-data.png" class="img-fluid rounded my-4">

  `,

    project5: `
    <h2>Escape Room Game</h2>
    <p class="text-muted">May 2026</p>


    <p>
        An interactive text-based escape room game built as a console application, featuring
        puzzles, item collection, and room exploration.
    </p>

    <div class="d-flex flex-wrap justify-content-center gap-2 mt-3">
        <span class="tag">Python</span>
        <span class="tag">Game Logic</span>
        <span class="tag">Problem Solving</span>
    </div>

    <img src="img/project-images/pr5.png" class="img-fluid rounded my-4">

  `,

    project6: `
    <h2>Digital Wellbeing Project</h2>
    <p class="text-muted">Jun 2026</p>


    <p>
        A digital wellbeing project created for InternetMatters.org, designed to promote
        healthy technology use through an engaging website for college
        students.
    </p>

    <div class="d-flex flex-wrap justify-content-center gap-2 mt-3">
        <span class="tag">UI/UX</span>
        <span class="tag">HTML</span>
        <span class="tag">CSS</span>
        <span class="tag">JavaScript</span>
        <span class="tag">Bootstrap</span>
    </div>

    <img src="img/project-images/pr6.1.png" class="img-fluid rounded my-4">
    <br>

    <img src="img/project-images/pr6.2.png" class="img-fluid rounded my-4">
    <br>

    <img src="img/project-images/pr6.3.png" class="img-fluid rounded my-4">
    `,


};

function openModal(id) {

    document.getElementById("modal-body").innerHTML = projectDetails[id];

    document.getElementById("projectModal").style.display = "flex";
    document.body.style.overflow = "hidden"; // stop scroll
}

function closeModal() {
    document.getElementById("projectModal").style.display = "none";
    document.body.style.overflow = "auto";
}
