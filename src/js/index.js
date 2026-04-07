function renderProjects(projectList) {
  const projectsContainer = document.querySelector(".projects");
  const projectCardList = [];

  projectList.forEach((project) => {
    const imageElement = Object.assign(document.createElement("img"), {
      src: project.image.path,
      alt: project.image.altText,
    });
    const figureElement = document.createElement("figure");
    figureElement.appendChild(imageElement);

    const categoryBadgeElement = Object.assign(document.createElement("span"), {
      className: `category ${project.category.class}`,
      textContent: project.category.name,
    });

    const cardCoverElement = Object.assign(document.createElement("div"), {
      className: "card-cover",
    });
    cardCoverElement.append(figureElement, categoryBadgeElement);

    const titleElement = Object.assign(document.createElement("h3"), {
      textContent: project.title,
    });
    const descriptionElement = Object.assign(document.createElement("p"), {
      textContent: project.description,
    });
    const buttonElement = Object.assign(document.createElement("button"), {
      className: "card-button",
      textContent: project.link ? "View Project" : "Coming Soon",
      onclick: project.link
        ? () => {
            window.open(project.link, "_blank", "noopener,noreferrer");
          }
        : null,
    });

    const cardElement = Object.assign(document.createElement("article"), {
      className: "card",
    });
    cardElement.append(
      cardCoverElement,
      titleElement,
      descriptionElement,
      buttonElement,
    );

    projectCardList.push(cardElement);
  });

  if (projectCardList.length) {
    projectsContainer.replaceChildren(...projectCardList);
  } else {
    projectsContainer.replaceChildren(
      Object.assign(document.createElement("p"), {
        className: "no-matches-found",
        textContent: "No matches found.",
      }),
    );
  }
}

function filterProjects(e) {
  const searchString = e.target.value.trim().toLowerCase();
  const filteredProjectList = projectsData.filter(
    ({ title, description, category }) =>
      title.toLowerCase().includes(searchString) ||
      description.toLowerCase().includes(searchString) ||
      category.name.toLowerCase().includes(searchString),
  );

  renderProjects(filteredProjectList);
}

let projectsData = [];
async function fetchProjects() {
  const projectsContainer = document.querySelector(".projects");

  projectsContainer.innerHTML = "<p>Loading Projects ...</p>";

  try {
    const response = await fetch(
      "https://ot87.github.io/web-dev-assignment-2-dynamic-javascript/data/projects.json",
    );
    projectsData = await response.json();

    renderProjects(projectsData);
  } catch (e) {
    document.querySelector(".projects").innerHTML = `<div>
        <p style="padding-bottom:6px;">Projects are unavailable right now. Please try again later...</p>
        <button id="retry-fetch">Retry</button>
      </div>`;

    document.querySelector("#retry-fetch").addEventListener("click", () => {
      fetchProjects();
    });
  }
}

fetchProjects();

document
  .querySelector("#search-input")
  .addEventListener("keyup", filterProjects);
