import { images as importedImages } from './images.js';

document.addEventListener('DOMContentLoaded', () => {
    const imageUrls: string[] = importedImages.map(image => image.url);

    let currentIndex: number = 0;

    const carouselContainer: HTMLElement | null = document.getElementById('carousel-container');
    if (!carouselContainer) return;

    const imgElement: HTMLImageElement = document.createElement('img');
    const favButton: HTMLButtonElement = document.createElement('button');
    const delButton: HTMLButtonElement = document.createElement('button');
    const leftButton: HTMLButtonElement = document.createElement('button');
    const rightButton: HTMLButtonElement = document.createElement('button');
    const buttonContainer: HTMLDivElement = document.createElement('div');

    imgElement.classList.add('carousel-image');
    favButton.classList.add('carousel-button', 'favorite-button');
    delButton.classList.add('carousel-button', 'delete-button');
    leftButton.classList.add('carousel-button', 'left-button');
    rightButton.classList.add('carousel-button', 'right-button');
    buttonContainer.classList.add('button-container');

    favButton.innerHTML = '<i class="fa-regular fa-heart"></i>';
    delButton.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
    leftButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    rightButton.innerHTML = '<i class="fas fa-chevron-right"></i>';

    buttonContainer.appendChild(favButton);
    buttonContainer.appendChild(delButton);

    carouselContainer.appendChild(imgElement);
    carouselContainer.appendChild(leftButton);
    carouselContainer.appendChild(rightButton);
    carouselContainer.appendChild(buttonContainer);

    function updateImage(): void {
        imgElement.src = imageUrls[currentIndex];
    }

    leftButton.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : imageUrls.length - 1;
        updateImage();
    });

    rightButton.addEventListener('click', () => {
        currentIndex = (currentIndex < imageUrls.length - 1) ? currentIndex + 1 : 0;
        updateImage();
    });

    delButton.addEventListener('click', () => {
        imageUrls.splice(currentIndex, 1);
        if (imageUrls.length === 0) {
            imgElement.src = '';
        } else {
            currentIndex = (currentIndex >= imageUrls.length) ? 0 : currentIndex;
            updateImage();
        }
    });

    favButton.addEventListener('click', () => {
        alert(`Image ${imageUrls[currentIndex]} marked as favorite!`);
    });

    updateImage();
});
