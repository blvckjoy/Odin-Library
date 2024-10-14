class Book {
   constructor(title, author, pages, hasRead) {
      this.title = title;
      this.author = author;
      this.pages = pages;
      this.hasRead = hasRead;
   }

   toggleStatus() {
      this.hasRead = !this.hasRead;
   }
}

class Library {
   constructor() {
      this.books = [];
   }

   addBook(book) {
      this.books.push(book);
   }

   removeBook(index) {
      this.books.splice(index, 1);
   }

   renderLibrary() {
      cardsContainer.innerHTML = "";
      this.books.forEach((book, index) => {
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

         const toggleStatusBtn = document.createElement("button");
         toggleStatusBtn.classList.add("toggle");
         toggleStatusBtn.textContent = "Toggle status";
         toggleStatusBtn.addEventListener("click", () => {
            book.toggleStatus();
            this.renderLibrary();
         });

         const deleteBtn = document.createElement("button");
         deleteBtn.classList.add("delete");
         deleteBtn.textContent = "Delete";
         deleteBtn.addEventListener("click", () => {
            this.removeBook(index);
            this.renderLibrary();
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
}

const library = new Library();

// Select DOM elements
const dialog = document.querySelector("dialog");
const newBookBtn = document.querySelector("#newBookBtn");
const addBtn = document.querySelector("#addBtn");
const closeBtn = document.querySelector("#closeBtn");
const cardsContainer = document.querySelector("#cards-container");

const authorElement = document.querySelector("#author");
const titleElement = document.querySelector("#title");
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

addBtn.addEventListener("click", (e) => {
   e.preventDefault();
   const userAuthor = authorElement.value.trim();
   const userTitle = titleElement.value.trim();
   const userPages = pagesElement.value.trim();
   const userHasRead = hasReadElement.checked;

   // reset custom validity
   authorElement.setCustomValidity("");
   titleElement.setCustomValidity("");
   pagesElement.setCustomValidity("");

   // validate inputs
   if (!userAuthor) {
      authorElement.setCustomValidity(`Please fill in the author's name`);
   }
   if (!userTitle) {
      titleElement.setCustomValidity(`Please fill in the book's title`);
   }
   if (!userPages) {
      pagesElement.setCustomValidity(`Please enter the number of pages`);
   } else {
      const pages = Number(userPages);
      if (isNaN(pages) || pages <= 0) {
         pagesElement.setCustomValidity(`Please enter a valid number of pages`);
      }
   }

   // check if the form is valid
   if (
      !authorElement.checkValidity() ||
      !titleElement.checkValidity() ||
      !pagesElement.checkValidity()
   ) {
      // trigger browser's default validation UI
      authorElement.reportValidity();
      titleElement.reportValidity();
      pagesElement.reportValidity();
      return;
   }

   // create a new book instance
   const newBook = new Book(userTitle, userAuthor, userPages, userHasRead);
   library.addBook(newBook);
   library.renderLibrary();
   resetForm();
   dialog.close();
});

// Reset form inputs
function resetForm() {
   titleElement.value = "";
   authorElement.value = "";
   pagesElement.value = "";
   hasReadElement.checked = false;
}
