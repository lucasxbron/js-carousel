import { images as importedImages } from "./images.js";

document.addEventListener("DOMContentLoaded", () => {
  const imageUrlsList: string[] = importedImages.map((image) => image.url);

  let currentIndex: number = 0;

  const carouselContainer: HTMLElement | null =
    document.getElementById("carousel-container");
  // If the carousel container is not found, exit the function early to prevent errors.
  if (!carouselContainer) return;

  const imgElement: HTMLImageElement = document.createElement("img");
  const addButton: HTMLButtonElement = document.createElement("button");
  const delButton: HTMLButtonElement = document.createElement("button");
  const leftButton: HTMLButtonElement = document.createElement("button");
  const rightButton: HTMLButtonElement = document.createElement("button");
  const buttonContainer: HTMLDivElement = document.createElement("div");

  imgElement.classList.add("carousel-image");
  addButton.classList.add("carousel-button", "favorite-button");
  delButton.classList.add("carousel-button", "delete-button");
  leftButton.classList.add("carousel-button", "left-button");
  rightButton.classList.add("carousel-button", "right-button");
  buttonContainer.classList.add("button-container");

  addButton.innerHTML = '<i class="fa-solid fa-plus"></i>';
  delButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
  leftButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
  rightButton.innerHTML = '<i class="fas fa-chevron-right"></i>';

  buttonContainer.appendChild(addButton);
  buttonContainer.appendChild(delButton);

  carouselContainer.appendChild(imgElement);
  carouselContainer.appendChild(leftButton);
  carouselContainer.appendChild(rightButton);
  carouselContainer.appendChild(buttonContainer);

  // Create popUp elements
  const popUp: HTMLDivElement = document.createElement("div");
  const popUpContent: HTMLDivElement = document.createElement("div");
  const input: HTMLInputElement = document.createElement("input");
  const okButton: HTMLButtonElement = document.createElement("button");
  const cancelButton: HTMLButtonElement = document.createElement("button");

  popUp.classList.add("popUp");
  popUpContent.classList.add("popUp-content");
  okButton.classList.add("popUp-button");
  cancelButton.classList.add("popUp-button");

  okButton.innerHTML = '<i class="fa-solid fa-check"></i>';
  cancelButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';

  popUpContent.appendChild(input);
  popUpContent.appendChild(okButton);
  popUpContent.appendChild(cancelButton);
  popUp.appendChild(popUpContent);
  carouselContainer.appendChild(popUp);

  // Hide popUp by default
  // Hide the pop-up when the cancel button is clicked
  popUp.style.display = "none";
  // This function updates the image element's source to the current image URL
  function updateImage(): void {
    imgElement.src = imageUrlsList[currentIndex];
  }
  // When the left button is clicked, decrement the currentIndex if it's greater than 0,
  // otherwise set it to the last index of the imageUrlsList.
  leftButton.addEventListener("click", () => {
    // Initial call to updateImage to set the first image in the carousel
    currentIndex =
      currentIndex > 0 ? currentIndex - 1 : imageUrlsList.length - 1;
    updateImage();
  });

  // When the right button is clicked, move to the next image or loop back to the first image if at the end
  rightButton.addEventListener("click", () => {
    currentIndex =
      currentIndex < imageUrlsList.length - 1 ? currentIndex + 1 : 0;
    updateImage();
  });
  delButton.addEventListener("click", () => {
    imageUrlsList.splice(currentIndex, 1);
    if (imageUrlsList.length === 0) {
      imgElement.src = "";
    } else {
      currentIndex =
        currentIndex >= imageUrlsList.length
          ? imageUrlsList.length - 1
          : currentIndex;
      updateImage();
    }
  });

  // Show the pop-up when the add button is clicked to allow the user to input a new image URL
  addButton.addEventListener("click", () => {
    popUp.style.display = "block";
  });

  // When the OK button is clicked, add the new image URL to the list and update the carousel
  okButton.addEventListener("click", () => {
    const imageUrl = input.value;
    if (imageUrl) {
      imageUrlsList.push(imageUrl);
      currentIndex = imageUrlsList.length - 1;
      updateImage();
    }
    popUp.style.display = "none";
    input.value = "";
  });

  cancelButton.addEventListener("click", () => {
    popUp.style.display = "none";
    input.value = "";
  });

  updateImage();
});
