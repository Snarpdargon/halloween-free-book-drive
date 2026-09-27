// ==========================================
// HALLOWEEN FREE BOOK DRIVE
// ==========================================


// Available books

const books = [

    {
        id: 1,
        title: "Dracula",
        author: "Bram Stoker",
        description:
            "A classic gothic story about Count Dracula and his mysterious castle."
    },

    {
        id: 2,
        title: "Frankenstein",
        author: "Mary Shelley",
        description:
            "A famous gothic tale about a scientist and the creature he brings to life."
    },

    {
        id: 3,
        title: "The Legend of Sleepy Hollow",
        author: "Washington Irving",
        description:
            "A spooky Halloween classic featuring Ichabod Crane and the Headless Horseman."
    },

    {
        id: 4,
        title: "The Strange Case of Dr. Jekyll and Mr. Hyde",
        author: "Robert Louis Stevenson",
        description:
            "A mysterious story exploring the strange relationship between Dr. Jekyll and Mr. Hyde."
    },

    {
        id: 5,
        title: "The Picture of Dorian Gray",
        author: "Oscar Wilde",
        description:
            "A gothic novel about beauty, morality, and a mysterious portrait."
    },

    {
        id: 6,
        title: "The Turn of the Screw",
        author: "Henry James",
        description:
            "A classic supernatural story involving a governess and mysterious apparitions."
    }

];


// Currently selected book

let selectedBook = null;


// ==========================================
// LOCAL STORAGE
// ==========================================

function getTakenBooks() {

    const saved =
        localStorage.getItem("takenBooks");

    if (!saved) {

        return [];

    }

    return JSON.parse(saved);
}


function saveTakenBooks(takenBooks) {

    localStorage.setItem(
        "takenBooks",
        JSON.stringify(takenBooks)
    );

}


// ==========================================
// DISPLAY BOOKS
// ==========================================

function displayBooks() {

    const bookList =
        document.getElementById("book-list");

    const takenBooks =
        getTakenBooks();


    bookList.innerHTML = "";


    books.forEach(book => {

        const alreadyTaken =
            takenBooks.some(
                item => item.bookId === book.id
            );


        const card =
            document.createElement("article");

        card.className =
            "book-card";


        card.innerHTML = `

            <div class="book-icon">
                📖
            </div>

            <span class="available-badge">
                ${alreadyTaken
                    ? "Already Taken"
                    : "FREE TO TAKE"}
            </span>

            <h3>
                ${book.title}
            </h3>

            <p class="book-author">
                ${book.author}
            </p>

            <p class="book-description">
                ${book.description}
            </p>

            <button
                class="primary-button"
                ${alreadyTaken ? "disabled" : ""}
                onclick="openBook(${book.id})"
            >
                ${alreadyTaken
                    ? "Book Taken"
                    : "🎃 Take This Book"}
            </button>

        `;


        bookList.appendChild(card);

    });

}


// ==========================================
// OPEN BOOK
// ==========================================

function openBook(bookId) {

    const takenBooks =
        getTakenBooks();


    const alreadyTaken =
        takenBooks.some(
            item => item.bookId === bookId
        );


    if (alreadyTaken) {

        return;

    }


    selectedBook =
        books.find(
            book => book.id === bookId
        );


    if (!selectedBook) {

        return;

    }


    document.getElementById(
        "modal-title"
    ).textContent =
        selectedBook.title;


    document.getElementById(
        "modal-author"
    ).textContent =
        "by " + selectedBook.author;


    document.getElementById(
        "modal-description"
    ).textContent =
        selectedBook.description;


    document.getElementById(
        "book-note"
    ).value = "";


    document.getElementById(
        "book-modal"
    ).classList.remove("hidden");

}


// ==========================================
// TAKE BOOK
// ==========================================

function takeBook() {

    if (!selectedBook) {

        return;

    }


    const note =
        document
            .getElementById("book-note")
            .value
            .trim();


    const takenBooks =
        getTakenBooks();


    takenBooks.push({

        bookId:
            selectedBook.id,

        title:
            selectedBook.title,

        author:
            selectedBook.author,

        note:
            note,

        date:
            new Date().toLocaleDateString()

    });


    saveTakenBooks(takenBooks);


    closeModal();


    document.getElementById(
        "success-text"
    ).textContent =
        `"${selectedBook.title}" is now yours. Enjoy your spooky read!`;


    document
        .getElementById("success-message")
        .classList.remove("hidden");


    selectedBook = null;


    displayBooks();

    displayTakenBooks();

}


// ==========================================
// DISPLAY TAKEN BOOKS
// ==========================================

function displayTakenBooks() {

    const container =
        document.getElementById("taken-books");


    const takenBooks =
        getTakenBooks();


    container.innerHTML = "";


    if (takenBooks.length === 0) {

        container.innerHTML = `

            <div class="taken-card">

                <p>
                    🎃 You haven't taken a book yet.
                    Choose a spooky story above!
                </p>

            </div>

        `;

        return;

    }


    takenBooks.forEach(book => {

        const card =
            document.createElement("div");


        card.className =
            "taken-card";


        card.innerHTML = `

            <h3>
                📖 ${book.title}
            </h3>

            <p>
                by ${book.author}
            </p>

            <small>
                Taken on ${book.date}
            </small>

            ${
                book.note
                    ? `
                        <div class="note">
                            📝 ${book.note}
                        </div>
                    `
                    : `
                        <div class="note">
                            No note was left for this book.
                        </div>
                    `
            }

        `;


        container.appendChild(card);

    });

}


// ==========================================
// CLOSE MODAL
// ==========================================

function closeModal() {

    document
        .getElementById("book-modal")
        .classList.add("hidden");

    selectedBook = null;

}


// ==========================================
// CLOSE SUCCESS
// ==========================================

function closeSuccess() {

    document
        .getElementById("success-message")
        .classList.add("hidden");

}


// ==========================================
// SCROLL TO BOOKS
// ==========================================

function scrollToBooks() {

    document
        .getElementById("books-section")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// ==========================================
// INITIALIZE APPLICATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayBooks();

        displayTakenBooks();

    }
);
