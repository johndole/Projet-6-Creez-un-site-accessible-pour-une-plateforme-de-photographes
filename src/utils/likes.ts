import { Media } from "../models/media";

const totalLikesElement = document.querySelector(".total-likes") as HTMLElement;

export function updateLikes(mediaItems: Media[]) {
const likes= document.querySelectorAll('.like-icon');
likes.forEach(like=>{
  like.addEventListener('click',()=>{
    let totalLikes = 0;
    // Iterate through each media item
    mediaItems.forEach(media => {
        // Retrieve the number of all likes
        totalLikes += media.likes;
    }); // Update the text content of the element displaying the total like
    if (totalLikesElement) {
        totalLikesElement.textContent = ` ${totalLikes}`;
        totalLikesElement.setAttribute('aria-label', `Il y a ${totalLikes} total likes`);
    } else {
        console.error('Total likes element not found');
    }
  })
})
}