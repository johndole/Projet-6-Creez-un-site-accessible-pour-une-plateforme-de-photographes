import { Media } from "../models/media";
import { updateLikes } from "./likes";

const sortButtons = document.querySelectorAll(
  '.dropdown [role="option"]'
);
const dropdownContainer = document.querySelector(
  ".sort__dropdown"
) as HTMLDivElement;


export const initDropdown = (
  mediaItems: Media[],
  mediaTemplate: (media: Media) => any,
  containerId: string
): void => {
  const galleryContainer = document.getElementById(containerId);

  if (galleryContainer && sortButtons.length > 0) {
    sortButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Deselect all buttons
        sortButtons.forEach((btn) =>
          btn.setAttribute("aria-selected", "false"),
        );
        // Select the clicked button
        button.setAttribute("aria-selected", "true");

        const selectedOption = button.getAttribute("data-value");

        // Sort the media based on the selected option
        switch (selectedOption) {
          case "popularity":
            mediaItems.sort((a, b) => b.likes - a.likes);
            console.log("media sorted by popularity", mediaItems);
            break;
          case "date":
            mediaItems.sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            console.log("media sorted by date", mediaItems);
            break;
          case "title":
            mediaItems.sort((a, b) => a.title.localeCompare(b.title));
            console.log("media sorted by title", mediaItems);
            break;
          default:
            console.error("Invalid option selected");
            return;
        }

        // Clear the existing media items in the container
        galleryContainer.innerHTML = "";

        // Append the sorted media items to the media container
        mediaItems.forEach((mediaItem) => {
          const mediaModel = mediaTemplate(mediaItem);
          const userMediaDOM = mediaModel.getUserMediaDOM();
          galleryContainer.appendChild(userMediaDOM);
          updateLikes(mediaItems);
        });
      });
    });

    // Set "popularity" as the default sorting
    const popularityButton = document.querySelector(
      '.dropdown [data-value="popularity"]'
    );
    if (popularityButton) {
      popularityButton.dispatchEvent(new Event("click")); // Dispatch a click event on the "Popularity" button
    } else {
      console.error("Popularity button not found");
    }
  } else {
    console.error("Gallery container or sort buttons not found");
  }
};


export const toggleDropdown = () => {
  dropdownContainer.style.display =
    dropdownContainer.style.display === "flex" ? "none" : "flex";
};

// Get all buttons with the class 'dropdown-option'
const dropdownButtons = document.querySelectorAll(".sort__button");
// Attach click event listener to each button
dropdownButtons.forEach((button) => {
  button.addEventListener("click", toggleDropdown);
});

// Attach click event listener to the dropdown container for event delegation
dropdownContainer.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLButtonElement)) return;

  const oldSelectedOptionHtml = document.querySelector(
    ".dropdown > button"
  ) as HTMLButtonElement;
  const newSelectedOptionHtml = event.target;
  // onSortChange(selectedValue);
  // TODO revoir l'event listener car chaque bouton a gardé son event initial
  oldSelectedOptionHtml.parentNode?.insertBefore(
    newSelectedOptionHtml,
    oldSelectedOptionHtml
  );


  dropdownContainer.prepend(oldSelectedOptionHtml);

});

const dropDown = document.querySelector(".dropdown") as HTMLDivElement;

dropDown.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    toggleDropdown();
  }
})