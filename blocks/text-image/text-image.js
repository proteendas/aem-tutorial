import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate() {
  const textImageWrapper = document.querySelector('.text-image-wrapper');

  if (textImageWrapper) {
    // Select the first div containing a picture element
    const pictureElement = textImageWrapper.querySelector('div > picture');
    const imageDiv = pictureElement?.closest('div');

    if (imageDiv) {
      // Use createOptimizedPicture to load the picture
      const imgElement = imageDiv.querySelector('img');
      if (imgElement) {
        const src = imgElement.getAttribute('src');
        const alt = imgElement.getAttribute('alt');
        const optimizedPicture = createOptimizedPicture(src, alt, false, []);
        imageDiv.innerHTML = ''; // Clear existing content
        imageDiv.appendChild(optimizedPicture);
        imageDiv.classList.add('image-container');
      }
    }

    // Create a new div with the class 'text-container'
    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    // Select all the divs that need to be placed inside the 'text-container'
    const textDivs = textImageWrapper.querySelectorAll('div[data-aue-prop="text"], div[data-aue-prop="description"], div[data-aue-model="button"]');

    // Append each selected div to the new 'text-container'
    textDivs.forEach((div) => {
      textContainer.appendChild(div);
    });

    // Remove any existing empty divs within the textImageWrapper
    textImageWrapper.querySelectorAll('div').forEach((div) => {
      if (div.childNodes.length === 0) {
        div.remove();
      }
    });

    // Insert the 'text-container' after the 'image-container'
    if (imageDiv) {
      imageDiv.parentNode.insertBefore(textContainer, imageDiv.nextSibling);
    } else {
      textImageWrapper.appendChild(textContainer);
    }
  }
}
