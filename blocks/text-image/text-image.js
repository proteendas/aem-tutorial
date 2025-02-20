export default function decorate() {
  const textImageWrapper = document.querySelector('.text-image-wrapper');
  const imageDiv = textImageWrapper.querySelector('picture');
  const headingDiv = textImageWrapper.querySelector('h4');
  const descriptionDiv = textImageWrapper.querySelector('p');
  const textContainer = document.createElement('div');
  textContainer.classList.add('text-content');
  if (headingDiv) {
    textContainer.appendChild(headingDiv);
  }
  if (descriptionDiv) {
    textContainer.appendChild(descriptionDiv);
  }
  textImageWrapper.innerHTML = '';
  const newStructure = `
    <div class="image-container">
        ${imageDiv.outerHTML}
    </div>
    ${textContainer.outerHTML}
    `;
  textImageWrapper.innerHTML = newStructure;
}
