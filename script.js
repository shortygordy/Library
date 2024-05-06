const myLibrary = [];

myLibrary.push(new Book('1984', 'George Orwell', 328, false));
myLibrary.push(new Book('Pride and Prejudice', 'Jane Austen', 279, true));
myLibrary.push(new Book('To Kill a Mockingbird', 'Harper Lee', 281, false));
myLibrary.push(new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, true));
myLibrary.push(new Book('Moby Dick', 'Herman Melville', 635, false));
myLibrary.push(new Book('War and Peace', 'Leo Tolstoy', 1225, true));
myLibrary.push(new Book('Ulysses', 'James Joyce', 730, false));
myLibrary.push(new Book('The Catcher in the Rye', 'J.D. Salinger', 234, true));
myLibrary.push(new Book('The Hobbit', 'J.R.R. Tolkien', 310, false));
myLibrary.push(new Book('Frankenstein', 'Mary Shelley', 280, true));
myLibrary.push(new Book('The Book Thief', 'Markus Zusak', 552, false));
myLibrary.push(new Book('Brave New World', 'Aldous Huxley', 268, true));
myLibrary.push(new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1178, false));
myLibrary.push(new Book('The Little Prince', 'Antoine de Saint-Exupéry', 93, true));
myLibrary.push(new Book('The Da Vinci Code', 'Dan Brown', 689, false));
myLibrary.push(new Book('Slaughterhouse-Five', 'Kurt Vonnegut', 275, true));
myLibrary.push(new Book('Don Quixote', 'Miguel de Cervantes', 863, false));
myLibrary.push(new Book('One Hundred Years of Solitude', 'Gabriel García Márquez', 417, true));
myLibrary.push(new Book('A Tale of Two Cities', 'Charles Dickens', 448, false));
myLibrary.push(new Book('Catch-22', 'Joseph Heller', 453, true));


function Book(title, author, pages, ifRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.ifRead = ifRead;
}

Book.prototype.toggleRead = function(i) {
    this.ifRead = !this.ifRead;
    let readText = document.querySelector('#read-indicator' + i + ' > p');
    console.log(readText.textContent);
    if (this.ifRead === true) {
        readText.textContent = "Read";

    } else readText.textContent = "Not read";
}

function addBookToLibrary(event) {

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const ifRead = document.getElementById('toggle').checked;
    const reference = myLibrary.length - 1;

    if (title === '' || author === '' || pages === '') {
        //do nothing
    } else {
        myLibrary.push(new Book(title, author, pages, ifRead, reference));
        updateDOM();
        hideMenu();
        console.log(myLibrary.length - 1);
        event.preventDefault();
    }
}

function createBook(i) {
    const books = document.getElementById('books');
    const book = document.createElement("div");
    book.setAttribute('data', i);
    const title = document.createElement("p");
    const by = document.createElement("p");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const read = document.createElement("p");
    const gridContainer = document.createElement("div");
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    gridContainer.classList.add('book-text');
    const readContainer = document.createElement("div");
    readContainer.id = 'read-indicator' + i;
    readContainer.classList.add('read-indicator');
    const readSwitchLabel = document.createElement('label');
    readSwitchLabel.setAttribute('for', 'toggle' + [i]);
    readSwitchLabel.classList.add('switch');
    const readSwitchInput = document.createElement('input');
    readSwitchInput.setAttribute('type', 'checkbox');
    readSwitchInput.classList.add('checkbox');
    readSwitchInput.setAttribute('id', 'toggle' + [i]);
    book.classList.add("book");

    const path = document.createElementNS(svgNS, "path");
    path.setAttribute("d", "M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z");
    svg.appendChild(path);
    svg.setAttribute('width', "24");
    svg.setAttribute('height', "24");
    svg.setAttribute('viewBox', "0 0 24 24");
    svg.id = 'remove' + i;




    title.textContent = myLibrary[i].title;
    by.textContent = "by"
    author.textContent = myLibrary[i].author;
    pages.textContent = myLibrary[i].pages + " pages";
    read.textContent = myLibrary[i].ifRead ? "Read" : "Not read";
    readSwitchInput.checked = myLibrary[i].ifRead;

    books.appendChild(book);
    book.appendChild(gridContainer);
    gridContainer.appendChild(title);
    gridContainer.appendChild(by);
    gridContainer.appendChild(author);
    gridContainer.appendChild(pages);
    gridContainer.appendChild(readContainer);
    readContainer.appendChild(read);
    readContainer.appendChild(readSwitchInput);
    readContainer.appendChild(readSwitchLabel);
    readContainer.appendChild(svg);

    const ifReadSwitch = document.getElementById('toggle' + i)
    ifReadSwitch.addEventListener('click', () => {
        myLibrary[i].toggleRead(i);
    })

    const remove = document.getElementById('remove' + i);
    remove.addEventListener('click', () => {
        myLibrary.slice(0, i).concat(myLibrary.slice(i + 1))
        const book = document.body.querySelector(`.book[data="${i}"]`)
        book.remove();
    })

}

function initializeDOM() {

    for (let i = 0; i < myLibrary.length; i++) {
        createBook(i);
    }
}

function updateDOM() {
    createBook(myLibrary.length - 1);
}

function showMenu() {
    menu.classList.add('show-menu');
    books.classList.add('no-scroll');
    mainPage.classList.add('blur');
    overlay.classList.add('show-overlay');
}

function hideMenu() {
    menu.classList.remove('show-menu')
    books.classList.remove('no-scroll');
    mainPage.classList.remove('blur');
    overlay.classList.remove('show-overlay');
    form.reset();
}

initializeDOM();

const mainPage = document.getElementById('grid-container');
const menu = document.getElementById('add-book-menu');
const overlay = document.querySelector('.overlay');
const menuCloseButton = document.querySelector(".menu-close-button");
const addBookButton = document.querySelector(".add-book");
const submitButton = document.querySelector("#submit-book");
const form = document.querySelector("form");

addBookButton.addEventListener("click", showMenu);
menuCloseButton.addEventListener("click", hideMenu);
overlay.addEventListener("click", hideMenu);
submitButton.addEventListener("click", addBookToLibrary)