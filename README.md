# Odin-Library

This is a basic library application built with HTML, CSS, and JavaScript. The application allows users to:

- Add new books to the library.
- Display the list of books.
- Toggle the read status of each book.
- Delete books from the library.

## Features

**Add Book**: Opens a dialog where you can enter the title, author, number of pages, and whether the book has been read.

**Render Library**: Shows all added books in a card format with their details.

**Toggle Read Status**: Change the status of whether the book has been read or not.

**Remove Books**: Remove a book from the library.

## Key Changes:

**Class-based structure**: The **Book** class encapsulates each book’s details and includes a method to toggle the reading status. The **Library** class manages the collection of books and renders them in the DOM.

**Encapsulation of behavior**: The Library class handles all operations (adding, removing, rendering books), making the code more modular and easier to maintain.

**Simplified event listeners**: The button actions now interact with the class methods.
