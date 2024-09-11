const dialog = document.querySelector("dialog");
const newBookBtn = document.querySelector("#newBookBtn");
const addBtn = document.querySelector("#addBtn");
const closeBtn = document.querySelector("#closeBtn");
const cardsContainer = document.querySelector("#cards-container");

const titleElement = document.querySelector("#title");
const authorElement = document.querySelector("#author");
const pagesElement = document.querySelector("#pages");
const hasReadElement = document.querySelector("#read");

// "New Book" button opens the dialog modally
newBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

// "X" button closes the dialog
closeBtn.addEventListener("click", () => {
  dialog.close();
});

const myLibrary = [];

function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

function addBookToLibrary(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
}

addBtn.addEventListener("click", e => {
  e.preventDefault();
  const userTitle = titleElement.value;
  const userAuthor = authorElement.value;
  const userPages = pagesElement.value;
  const userHasRead = hasReadElement.checked;

  addBookToLibrary(userTitle, userAuthor, userPages, userHasRead);
  renderLibrary();
  resetForm();
  dialog.close();
});

function renderLibrary() {
  cardsContainer.innerHTML = "";

  myLibrary.forEach((book, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const titleElement = document.createElement("h2");
    titleElement.textContent = book.title;

    const authorElement = document.createElement("p");
    authorElement.textContent = `Author: ${book.author}`;

    const pagesElement = document.createElement("p");
    pagesElement.textContent = `Pages: ${book.pages}`;

    const statusElement = document.createElement("p");
    statusElement.textContent = `Status: ${
      book.hasRead ? "Read" : "Has not read"
    }`;

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      renderLibrary();
    });

    const toggleStatusBtn = document.createElement("button");
    toggleStatusBtn.classList.add("toggle");
    toggleStatusBtn.textContent = "Toggle status";
    toggleStatusBtn.addEventListener("click", () => {
      book.hasRead = !book.hasRead;
      renderLibrary();
    });

    card.appendChild(titleElement);
    card.appendChild(authorElement);
    card.appendChild(pagesElement);
    card.appendChild(statusElement);
    card.appendChild(toggleStatusBtn);
    card.appendChild(deleteBtn);

    cardsContainer.appendChild(card);
  });
}

// remove all previous inputs
function resetForm() {
  titleElement.value = "";
  authorElement.value = "";
  pagesElement.value = "";
  hasReadElement.checked = false;
}
