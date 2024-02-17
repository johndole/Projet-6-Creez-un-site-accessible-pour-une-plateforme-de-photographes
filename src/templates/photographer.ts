import { Photographer } from "../models/photographer";

export function photographerTemplate(photographer: Photographer) {
  const { 
    name,
    portrait,
    city,
    country,
    tagline,
    price
  } 
    = photographer;

  function getUserCardDOM() {
    const article = document.createElement("article");
    article.classList.add('photographer_card');
    article.setAttribute("data-photographer-id", photographer.id);
    article.setAttribute("tabindex", "1");
    article.setAttribute("role","link")
    article.setAttribute("aria-label", 
    "Portrait de " + name 
    + "Vient de " + city + country
    + "sont slogan est " + tagline
    +"Prix de la prestation "+ price+"par jour")
    
 


    const imgElement = document.createElement("img");
    imgElement.classList.add('imgElement');
    
    // Set up an event handler for when the image fails to load
    imgElement.onerror = function () {
      // Image failed to load, set a default image as the source
    imgElement.src = 'assets/photographers/account.png';
    };
    
    imgElement.setAttribute("src", portrait);
    imgElement.setAttribute("alt", "Portrait de " + name);
    imgElement.setAttribute("role", "img");

    const nameElement = document.createElement("h2");
    nameElement.textContent = name;
    nameElement.classList.add('nameElement');
   

    const locationElement = document.createElement("p");
    locationElement.textContent = `${city}, ${country}`;
    locationElement.classList.add('locationElement');

    const taglineElement = document.createElement("p");
    taglineElement.textContent = tagline;
    taglineElement.classList.add('taglineElement');

    const prixElement = document.createElement("p");
    prixElement.innerText = `${price} €/jour`;
    prixElement.classList.add('dailyPrice');

    const headerForm = document.querySelector('.header-form');
    const nameForm = document.createElement("h2");
    nameForm.textContent = name;
    nameForm.classList.add('nameForm');
    headerForm?.appendChild(nameForm);
    

    const photographPortrait = document.querySelector('.photograph-portrait');
    const photographPortraitImg = document.createElement("img");
    photographPortraitImg.setAttribute("src", portrait);
    photographPortraitImg.setAttribute("alt","Portrait de " + name);
    photographPortrait?.appendChild(photographPortraitImg);

    const totalLikesPricePhotographer = document.querySelector('.daily-price-photographer');
    const prixElementLikes = document.createElement("p");
    prixElementLikes.innerText = `${price} € / jour`;
    totalLikesPricePhotographer?.appendChild(prixElementLikes);

    // Add a click event listener to the article element
    article.addEventListener('click', function () {
      // Navigate to photographer.html with the photographer's ID as a query parameter
      const photographerId = photographer.id; // Target the photographer's ID
      const dynamicURL = `photographer.html?id=${photographerId}`;
      window.location.href = dynamicURL;
    });
    
    article.appendChild(imgElement);
    article.appendChild(nameElement);
    article.appendChild(locationElement);
    article.appendChild(taglineElement);
    article.appendChild(prixElement);
  
    // ARIA attributes for the entire article
  

    return article;
  }

  return { 
    name,
    portrait,
    city,
    country,
    tagline,
    getUserCardDOM
  };
}