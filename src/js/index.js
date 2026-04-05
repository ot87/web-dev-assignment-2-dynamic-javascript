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

  projectsContainer.append(...projectCardList);
}

renderProjects(projectList);
