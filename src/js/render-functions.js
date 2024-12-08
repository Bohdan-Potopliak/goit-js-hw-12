`use strict`

function createMarkup (arr) {
    return arr.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
    <li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
            <img
            class="gallery-image"
            src="${webformatURL}"
            alt="${tags}"
            />
        </a>
        <ul class="bottom-bar">
            <li>
                <p class="bottom-txt">Likes</p>
                <p class="bottom-value">${likes}</p>
            </li>
            <li>
                <p class="bottom-txt">Views</p>
                <p class="bottom-value">${views}</p>
            </li>
            <li>
                <p class="bottom-txt">Comments</p>
                <p class="bottom-value">${comments}</p>
            </li>
            <li>
                <p class="bottom-txt">Downloads</p>
                <p class="bottom-value">${downloads}</p>
            </li>
        </ul>
    </li>`).join("");
}

export default createMarkup;