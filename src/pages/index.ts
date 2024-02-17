import { photographerTemplate } from "../templates/photographer";
import { Photographer } from "../models/photographer";
import { getPhotographers } from "../api";
import "../styles/main.css";


const photographersSection = document.querySelector(".photographer_section");
const loaderElement = document.getElementById('loader');

document.addEventListener('DOMContentLoaded',function() {

  if (loaderElement) {
    // Hide the loader
    loaderElement.style.display = 'none';
    console.log('Loader hidden successfully.');
  } else {
    console.error('Loader element not found.');
  }
 
async function displayData(photographers: Photographer[]) {
  // Afficher les photographes
  photographers.forEach((photographer) => {
    const photographerModel = photographerTemplate(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection?.appendChild(userCardDOM);
  });
}


async function init() {
  // Récupère les datas des photographes
  const photographers = await getPhotographers();
  displayData(photographers);
}


init();
});