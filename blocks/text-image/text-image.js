import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate() {
  // Select all elements with the class 'text-image-wrapper'
  const textImageWrappers = document.querySelectorAll('.text-image-wrapper');

  textImageWrappers.forEach((textImageWrapper) => {
    // Select the first div containing a picture element within the current wrapper
    const pictureElement = textImageWrapper.querySelector('div > picture');
    const imageDiv = pictureElement?.closest('div');

    if (imageDiv) {
      // Use createOptimizedPicture to load the picture
      const imgElement = imageDiv.querySelector('img');
      if (imgElement) {
        console.log(imgElement);
        const src = imgElement.getAttribute('src');
        const alt = imgElement.getAttribute('alt');
        const optimizedPicture = createOptimizedPicture(src, alt, false, []);
        imageDiv.innerHTML = ''; // Clear existing content
        imageDiv.appendChild(optimizedPicture);
      }

      imageDiv.classList.add('image-container');

      // Add 'text-image-div-container' to the parent div of the 'image-container'
      const parentDiv = imageDiv.parentElement;
      if (parentDiv) {
        parentDiv.classList.add('text-image-div-container');
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

    // Remove any existing empty divs within the current textImageWrapper
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
  });
}
