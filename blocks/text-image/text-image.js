export default function decorate() {
  const textImageWrapper = document.querySelector('.text-image-wrapper');

  if (textImageWrapper) {
    // Select the first div containing a picture element and add the class 'image-container'
    const imageDiv = textImageWrapper.querySelector('div > picture')?.closest('div');
    if (imageDiv) {
      imageDiv.classList.add('image-container');
    }

    // Create a new div with the class 'text-container'
    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    // Select all the divs that need to be placed inside the 'text-container'
    const textDivs = textImageWrapper.querySelectorAll('div[data-aue-prop="text"], div[data-aue-prop="description"], div[data-aue-model="button"]');

    // Append each selected div to the new 'text-container'
    textDivs.forEach(div => {
      textContainer.appendChild(div);
    });

    // Insert the 'text-container' after the 'image-container'
    if (imageDiv) {
      imageDiv.parentNode.insertBefore(textContainer, imageDiv.nextSibling);
    } else {
      textImageWrapper.appendChild(textContainer);
    }
  }
}
