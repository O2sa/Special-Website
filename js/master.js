//Check fi there is color in localStorage
let mainColor = localStorage.getItem("color-option");
if (localStorage.getItem("color-option") !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  document.querySelectorAll(".colors-list li").forEach((ele) => {
    ele.classList.remove("active");

    if (ele.dataset.color === mainColor) {
      ele.classList.add("active");
    }
  });
}

// Toggle Setting
document.querySelector(".fa-gear").onclick = () => {
  document.querySelector(".fa-gear").classList.toggle("fa-spin");

  document.querySelector(".setting-box").classList.toggle("open");
};

// Switch Colors
const colorsList = document.querySelectorAll(".colors-list li");

colorsList.forEach((li) => {
  li.addEventListener("click", (el) => {
    document.documentElement.style.setProperty(
      "--main-color",
      el.target.dataset.color
    );

    // Add color to localStorage
    localStorage.setItem("color-option", el.target.dataset.color);

    // Remove active class
    handleActiveClasses(el);
  });
});

// Switch backgrounds
const randomEl = document.querySelectorAll(".random-backgrounds span");

randomEl.forEach((li) => {
  li.addEventListener("click", (el) => {
    handleActiveClasses(el);

    // Check if the clicked element yes or no
    if (el.target.dataset.background === "yes") {
      randomOption = true;
      randomBackgrounds();
      localStorage.setItem("background_option", randomOption);
    } else {
      randomOption = false;
      clearInterval(controlInterval);
      localStorage.setItem("background_option", randomOption);
    }
  });
});

// Select Landing Page
let landingPage = document.querySelector(".landing-page");

// Array of imgs
let imgs = [
  "../imgs/landing-01.jpg",
  "../imgs/landing-02.jpg",
  "../imgs/landing-03.webp",
  "../imgs/landing-04.jpeg",
  "../imgs/landing-05.jpeg",
];

// Change background image

// random background option
let randomOption = true;

// control interval
let controlInterval;

// check if there is a random background option
let randomOptionLocal = localStorage.getItem("background_option");

if (randomOptionLocal !== null) {
  document.querySelectorAll(".random-backgrounds span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (randomOptionLocal === "true") {
    randomOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    randomOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}
// randomise function
function randomBackgrounds() {
  if (randomOption === true) {
    controlInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * imgs.length);

      landingPage.style.backgroundImage = 'url("' + imgs[randomNumber] + '")';
    }, 10000);
  }
}
randomBackgrounds();

// Animate Skills Section
let ourSkills = document.querySelector(".skills");

window.onscroll = () => {
  // get the to of skills section
  let skillsTop = ourSkills.offsetTop;

  // get height of skills section
  let skillsHeight = ourSkills.offsetHeight;

  // get the height of window
  let windowHeight = this.innerHeight;

  // window scrolltop
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsTop + skillsHeight - windowHeight) {
    let allSkills = document.querySelectorAll(".skills .skill-progress span");
    allSkills.forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  }
};

let popBoxState;
// Create Popup box for Gallery images
let ourGallery = document.querySelectorAll(".gallery .images-box img");

ourGallery.forEach((img) => {
  img.addEventListener("click", () => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    overlay.className = "pop-overlay";
    document.body.appendChild(overlay);

    // Create popUp BOx
    let popBox = document.createElement("div");
    popBox.className = "pop-box";

    // Set Alt text of ima as a title
    if (img.alt !== null) {
      let imgHeader = document.createElement("h3");
      imgHeader.appendChild(document.createTextNode(img.alt));
      popBox.appendChild(imgHeader);
    }

    // Create image element
    let image = document.createElement("img");
    image.src = img.src;
    image.className = "open";

    // add image to PopBox
    popBox.appendChild(image);

    // add popBox to body
    document.body.appendChild(popBox);

    // Add Close Button for popBox
    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    closeButton.appendChild(document.createTextNode("X"));
    popBox.appendChild(closeButton);

    popBoxState = document.querySelector("pop-box");
    // close popBox
    closeButton.addEventListener("click", () => {
      closeButton.parentNode.remove();
      document.querySelector(".pop-overlay").remove();
    });
 
  });
});

// Animate the bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
moveSection(allBullets);

// Animate header links
let allLinks = document.querySelectorAll(".header-area .links span");
moveSection(allLinks);

// function move to any section
function moveSection(allElements) {
  allElements.forEach((e) => {
    e.addEventListener("click", (el) => {
      document.querySelector(el.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}

function handleActiveClasses(element) {
  element.target.parentElement.querySelectorAll(".active").forEach((ele) => {
    ele.classList.remove("active");
  });
  element.target.classList.add("active");
}

// Handle showing of bullets
let showingBulletsOptions = document.querySelectorAll(".options span");
let showBulletsOption = "yes";

// in localStorage
let localOptionBullets = localStorage.getItem("bullets-option");
if (localOptionBullets !== null) {
  document.querySelectorAll(".options span").forEach((ele) => {
    ele.classList.remove("active");
  });
  if (localOptionBullets === "yes") {
    showBulletsOption = "yes";
    document.querySelector(".options .yes").classList.add("active");
    document.querySelector(".nav-bullets").style.display = "block";
  } else {
    showBulletsOption = "no";
    document.querySelector(".options .no").classList.add("active");
    document.querySelector(".nav-bullets").style.display = "none";
  }
}

showingBulletsOptions.forEach((span) => {
  span.addEventListener("click", (el) => {
    handleActiveClasses(el);

    // handle options
    if (el.target.dataset.option === "yes") {
      document.querySelector(".nav-bullets").style.display = "block";
      showBulletsOption = "yes";
    } else {
      document.querySelector(".nav-bullets").style.display = "none";
      showBulletsOption = "no";
    }
    localStorage.setItem("bullets-option", showBulletsOption);
  });
});

// Reset Optinos
let resetButton = document.querySelector(".reset-optinos");
resetButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.reload();
});

// Toggle Menu
let toggleBtn = document.querySelector(".toggle-menu");
let links = document.querySelector(".links");
let settingBox = document.querySelector(".setting-box");

toggleBtn.onclick = (e) => {
  e.stopPropagation();
  toggleBtn.classList.toggle("menu-active");

  links.classList.toggle("open");
};

document.body.onclick = (e) => {
  // clone menu list onclicl
  if (
    e.target !== toggleBtn &&
    e.target !== links &&
    toggleBtn.classList.contains("menu-active")
  ) {
    toggleBtn.classList.remove("menu-active");

    links.classList.remove("open");
  }
  if (e.target === document.querySelector(".pop-overlay")) {
    document.querySelector(".pop-box").remove();
    e.target.remove();
  }
};
links.onclick = (e) => {
  e.stopPropagation();
};
