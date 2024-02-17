// main.ts
import "../styles/main.css";
import "../styles/photographer.css";
import { photographerTemplate } from "../templates/photographer";
import { mediaTemplate } from "../templates/media";
import { getPhotographers, getPhotographersMedia } from "../api";
import { displayModal, closeModal, validateForm } from "../utils/contactForm";
import { Media } from "../models/media";
import { showLightbox } from "../utils/lightBoxModal";
import { initDropdown, toggleDropdown } from "../utils/SortGallery";
import { updateLikes } from "../utils/likes";


document.addEventListener('DOMContentLoaded', function () {
  const loaderElement = document.getElementById('loader');
  if (loaderElement) {
    // Show the loader

    // Set a timeout to hide the loader after 2 seconds
    setTimeout(() => {
      loaderElement.style.display = 'none';
    }, 100);
  }

  // Get the photographer's ID from the query parameter in the URL
  const urlParams = new URLSearchParams(window.location.search);
  const photographerId = urlParams.get('id');
  const openModalButton = document.querySelector(".contact_button") as HTMLButtonElement;
  const closeModalButton = document.querySelector(".closeButton") as HTMLButtonElement;
  const form = document.querySelector("form") as HTMLFormElement;
  const galleryContainer = document.querySelector("#gallery") as HTMLDivElement;
  const totalLikesElement = document.querySelector(".total-likes") as HTMLElement;

  let mediaItems: Media[];


  async function fetchPhotographerById(photographerId: string | null): Promise<any> {
    if (!photographerId) {
      return Promise.reject(new Error("Photographer ID not provided"));
    }
    const photographers = await getPhotographers();
    const photographer = photographers.find(p => p.id === photographerId);

    if (photographer) {
      console.log(`Photographer found for ID ${photographerId}:`, photographer);
      return photographer;
    } else {
      return Promise.reject(new Error('Photographer not found'));
    }
  }

  function fetchAndDisplayPhotographer(photographerId: string | null): void {
    fetchPhotographerById(photographerId)
      .then(photographer => {
        if (photographer) {
          const photographerModel = photographerTemplate(photographer);
          const userCardDOM = photographerModel.getUserCardDOM();
          const userCardContainer = document.querySelector('.photograph-header');

          if (userCardContainer) {
            userCardContainer.appendChild(userCardDOM);
          }
        } else {
          console.error("Photographer not found");
        }
      })
      .catch(error => console.error("Error fetching photographer:", error));
  }

  function fetchAndDisplayMedia(photographerId: string | null): void {
    if (!photographerId) {
      console.error("Photographer ID not provided");
      return;
    }

    const parsedPhotographerId = parseInt(photographerId, 10);

    getPhotographersMedia()
      .then(medias => {
        console.log('All medias:', medias);

        mediaItems = medias.filter(media => media.photographerId === parsedPhotographerId);
        console.log('Filtered media items:', mediaItems);

        if (galleryContainer) {
          // Append the sorted media items to the media container
          mediaItems.forEach(mediaItem => {
            const mediaModel = mediaTemplate(mediaItem);
            const userMediaDOM = mediaModel.getUserMediaDOM();
            galleryContainer.appendChild(userMediaDOM);
          });
        } else {
          console.error('Media section not found');
          return;
        }
        // Update the total likes
        let totalLikes = mediaItems.reduce((sum, media) => sum + media.likes, 0);
        totalLikesElement.textContent = ` ${totalLikes}`;
        updateLikes(mediaItems);



        // Attach click event listener to the dropdown for sorting
        initDropdown(mediaItems, mediaTemplate, "gallery");
        toggleDropdown();
      })
      .catch(error => console.error('Error fetching media:', error));
  };


  openModalButton.addEventListener("click", displayModal);
  closeModalButton.addEventListener("click", closeModal);

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    validateForm();
  });

  galleryContainer.addEventListener("click", (event) => {
    // Check if the clicked element is an image
    const clickedImage = event.target as HTMLImageElement;
    if (!clickedImage || !clickedImage.dataset.mediaId) return;

    // Trouver l'index de l'image dans le tableau mediaItems
    const clickedImageId = clickedImage.dataset.mediaId;
    console.log("Clicked image ID:", clickedImageId);

    const currentIndex = mediaItems.findIndex((media) => media.id.toString() === clickedImageId);
    console.log("Found index:", currentIndex);

    // Vérifier si l'index a été trouvé 
    if (currentIndex !== -1) {
      // Appeler votre fonction showLightbox avec l'index trouvé
      showLightbox(mediaItems, currentIndex);
      console.log("Clicked image ID:", clickedImageId, "Current index:", currentIndex);
    } else {
      console.log("Index not found for clicked image ID:", clickedImageId);
    }
  });


  



  fetchAndDisplayPhotographer(photographerId);
  fetchAndDisplayMedia(photographerId);
});

