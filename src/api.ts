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
        //opération spread (...) est utilisée pour copier toutes les propriétés existantes 
        //de l'objet media dans un nouvel objet.
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

