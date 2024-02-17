import { Media } from "../models/media";

export function mediaTemplate(media: Media) {
  const { id, photographerId, title, image, video, likes, date, price } = media;

  function createImageHtmlElement() {
    const imgElement = document.createElement("img");
    imgElement.classList.add("imgElement_media", "media-element");
    imgElement.setAttribute("src", image);
    imgElement.setAttribute("alt", "");
    imgElement.setAttribute("date", date);
    imgElement.dataset.mediaId = id.toString();
    
    // ARIA attributes
    imgElement.setAttribute("aria-label", title);
    

    return imgElement;
  }

  function createVideoHtmlElement() {
    const videoElement = document.createElement("video");
    videoElement.classList.add("videoElement_media", "media-element");
    videoElement.setAttribute("src", video);
    videoElement.setAttribute("alt", "");
    videoElement.setAttribute("date", date);
    videoElement.src = video;
    videoElement.controls = true;
    videoElement.autoplay = true;
    videoElement.loop = true;

    videoElement.dataset.mediaId = id.toString();
    
    // ARIA attributes
    videoElement.setAttribute("aria-label", title);

    return videoElement;
  }

  function getUserMediaDOM() {

    /******************Article*********************/
    
    const article = document.createElement("article");
    article.classList.add("article_media");
    article.setAttribute("role", "article");
    article.setAttribute("aria-roledescription", "media");
    const mediaElement = image 
    ? createImageHtmlElement() 
    : createVideoHtmlElement();
    mediaElement.setAttribute("tabindex", "1");

    const titleLikesContainer = document.createElement("div");
    titleLikesContainer.classList.add("title-likes-container");

    const nameElement = document.createElement("h3");
    nameElement.textContent = title;
    nameElement.classList.add("titleElement_media");

    const likesContainer = document.createElement("div");
    likesContainer.classList.add("likes-container");

    const likesNumElement = document.createElement("p");
    likesNumElement.textContent = `${media.likes}`;
    likesNumElement.classList.add("likesElement");

    const likesIconElement = document.createElement("img");
    likesIconElement.src = media.liked 
        ? "assets/icons/heart-icon-filled.svg" 
        : "assets/icons/heart-icon.svg";
    likesIconElement.classList.add("like-icon");
    likesIconElement.setAttribute("tabindex", "1");
    const altText = media.liked ? "Action ne pas aimer" : "Action aimer";
    likesIconElement.setAttribute("alt", altText);

    likesIconElement.addEventListener("click", () => {
      media.liked = !media.liked;
      media.likes += media.liked ? 1 : -1;
      updateLikes();
      
    });

    function updateLikes() {
      likesNumElement.textContent = `${media.likes}`;
      likesIconElement.src = media.liked 
      ?"assets/icons/heart-icon-filled.svg" 
      : "assets/icons/heart-icon.svg";
      // Set alt text based on whether the media is liked or not liked
      const altText = media.liked ? "Action ne pas aimer" : "Action aimer";
      likesIconElement.setAttribute("alt", altText);
    }

    article.appendChild(mediaElement);
    article.appendChild(titleLikesContainer);
    titleLikesContainer.appendChild(nameElement);
    titleLikesContainer.appendChild(likesContainer);
    likesContainer.appendChild(likesNumElement);
    likesContainer.appendChild(likesIconElement);

    return article;
  }

  return {
    id,
    photographerId,
    title,
    image,
    video,
    likes,
    date,
    price,
    getUserMediaDOM,
  };
}
