import { Photographer } from "./models/photographer";
import { Media } from "./models/media";


export async function getPhotographers(): Promise<Photographer[]> {
  try {
    const response = await fetch("/data/photographer.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch photographers. Status: ${response.status}`);
    }

    const data = await response.json();
    const photographers = (data.photographers || []) as Photographer[];
    console.log('Photographers from API:', photographers);

    return photographers.map<Photographer>((photographer) => ({
      ...photographer,
      portrait: `assets/photographers/${photographer.portrait}`,
    }));
    
  } catch (error) {
    console.error("Error fetching photographers:", error);
    return [];
  }
}

export async function getPhotographersMedia(): Promise<Media[]> {
  try {
    const response = await fetch("/data/photographer.json");

    if (!response.ok) {
      throw new Error(`Failed to fetch medias. Status: ${response.status}`);
    }

    const data: { media?: Media[] } = await response.json();
 
    if (Array.isArray(data.media)) {
      return data.media.map<Media>((media) => ({
        ...media,
        ...!!media.image && { image: `assets/Portfolio/${media.photographerId}/${media.image}` },
        ...!!media.video && { video: `assets/Portfolio/${media.photographerId}/${media.video}` },
      }));

      
    } else {
      console.error("Invalid data format. Expected a 'media' property containing an array.");
      return [];
    }
    
  } catch (error) {
    console.error("Error fetching medias:", error);
    return [];
  }


}

/*

export async function updateLikesOnServer(mediaId: number, newLikes: number, likedState: boolean): Promise<Media> {
  try {
    const response = await fetch(`http://localhost:3000/media/${mediaId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: newLikes,
        liked: likedState,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to update likes on the server. Status: ${response.status}`);
    }

    const updatedMedia: Media = await response.json();
    console.log('Updated media on the server:', updatedMedia);
    
    return updatedMedia;
  } catch (error) {
    console.error('Error updating likes on the server:', error);
    throw error; // Rethrow the error to propagate it to the caller
  }
}


*/