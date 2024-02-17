// lightbox.js

import { Media } from "../models/media";

const lightbox = document.querySelector(".lightbox") as HTMLElement;
const lightboxContent = document.querySelector(".lightbox__container") as HTMLElement;
const closeBtn = document.querySelector(".lightbox__close") as HTMLElement;
const prevBtn = document.querySelector(".lightbox__prev") as HTMLElement;
const nextBtn = document.querySelector(".lightbox__next") as HTMLElement;

let mediaItems: Media[];
let currentIndex: number;
let touchStartX: number;
let touchEndX: number;

export function showLightbox(mediaItemsToShow: Media[], indexToShow: number) {
    mediaItems = mediaItemsToShow;
    currentIndex = indexToShow;
    openLightboxHandler(mediaItems[indexToShow]);
    lightbox.focus();
}

function openLightboxHandler(mediaItem: Media) {
    console.log("Clicked mediaItem:", mediaItem);
    console.log("Current index:", currentIndex);

    if (mediaItem.image) {
        // Display image
        lightboxContent.innerHTML = 
        `<img 
        tabindex= "0" 
        src="${mediaItem.image}" 
        alt="${mediaItem.title}" 
        class="lightbox-image"
        >`;
    } else if (mediaItem.video) {
        // Display video
        lightboxContent.innerHTML = 
        `<video 
        tabindex= "0"
        controls autoplay loop 
        src="${mediaItem.video}"
        alt="${mediaItem.title}"
        class="lightbox-video">
        </video>`;
    } else {
        console.error("Invalid mediaItem:", mediaItem);
        return;
    }

    // Use optional chaining to handle potential null values
    closeBtn?.addEventListener("click", closeLightboxHandler);
    prevBtn?.addEventListener("click", prevMediaHandler);
    nextBtn?.addEventListener("click", nextMediaHandler);


    closeBtn?.setAttribute("aria-label", "Fermer la lightbox");
    prevBtn?.setAttribute("aria-label", "Média précédent");
    nextBtn?.setAttribute("aria-label", "Média suivant");



    // Ajoutez des gestionnaires d'événements pour le clavier
    document.addEventListener("keydown", handleKeyDown);

    if (lightbox) {
        lightbox.style.display = "flex";
    }
    addSwipeListeners();
}

function handleKeyDown(event: KeyboardEvent) {
    switch (event.key) {
        case "ArrowLeft":
            prevMediaHandler();
            break;
        case "ArrowRight":
            nextMediaHandler();
            break;
        case "Escape":
            closeLightboxHandler();
            break;
        default:
            break;
    }
}

function prevMediaHandler() {
    console.log("Prev button clicked. Current index:", currentIndex);
    console.log("mediaItems:", mediaItems);
    if (currentIndex <= 0) {
        // Réinitialiser à la fin du tableau
        currentIndex = mediaItems.length -1 ;
    } else {
        // Passer à l'élément précédent
        currentIndex--;
        openLightboxHandler(mediaItems[currentIndex]);
    }
}

function nextMediaHandler() {
    console.log("Next button clicked. Current index:", currentIndex);
    console.log("mediaItems:", mediaItems);

    if (currentIndex >= mediaItems.length - 1) {
        // Réinitialiser au début du tableau
        currentIndex = 0;
    } else {
        // Passer à l'élément suivant
        currentIndex++;
    }
        openLightboxHandler(mediaItems[currentIndex]);
    }

function handleTouchStart(event: TouchEvent) {
  touchStartX = event.touches[0].clientX;
}

function handleTouchEnd(event: TouchEvent) {
  touchEndX = event.changedTouches[0].clientX;
  handleSwipe();
}

function handleSwipe() {
  const swipeThreshold = 50; // Adjust the threshold as needed

  if (touchStartX - touchEndX > swipeThreshold) {
    // Swipe right to left
    nextMediaHandler();
  } else if (touchEndX - touchStartX > swipeThreshold) {
    // Swipe left to right
    prevMediaHandler();
  }
}

function addSwipeListeners() {
  lightboxContent.addEventListener('touchstart', handleTouchStart);
  lightboxContent.addEventListener('touchend', handleTouchEnd);
}

function removeSwipeListeners() {
  lightboxContent.removeEventListener('touchstart', handleTouchStart);
  lightboxContent.removeEventListener('touchend', handleTouchEnd);
}

function closeLightboxHandler() {

    // Remove event listeners to avoid memory leaks
    closeBtn?.removeEventListener("click", closeLightboxHandler);
    prevBtn?.removeEventListener("click", prevMediaHandler);
    nextBtn?.removeEventListener("click", nextMediaHandler);

    // Retirez les gestionnaires d'événements pour le clavier
    document.removeEventListener("keydown", handleKeyDown);

    // Retirez les attributs aria
    lightbox.removeAttribute("role");
    lightbox.removeAttribute("aria-labelledby");
    lightbox.removeAttribute("aria-modal");

    if (lightbox) {
        lightbox.style.display = "none";
    }
    removeSwipeListeners();
}

export {
  openLightboxHandler,
  closeLightboxHandler,
  prevMediaHandler,
  nextMediaHandler,
};
