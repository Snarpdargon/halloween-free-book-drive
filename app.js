// ==========================================
// HALLOWEEN FREE BOOK DRIVE
// ==========================================


// ==========================================
// AVAILABLE BOOKS
// ==========================================

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


// ==========================================
// APPLICATION STATE
// ==========================================

let selectedBook = null;


// ==========================================
// LOCAL STORAGE
// ==========================================

const STORAGE_KEY = "halloweenBookDriveSelections";


function getTakenBooks() {

    const saved =
        localStorage.getItem(STORAGE_KEY);


    if (!saved) {

        return [];

    }


    try {

        return JSON.parse(saved);

    } catch (error) {

        console.error(
            "Unable to read saved books:",
            error
        );

        return [];

    }

}


function saveTakenBooks(takenBooks) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(takenBooks)
    );

}


// ==========================================
// DISPLAY BOOKS
// ==========================================

function displayBooks() {

    const bookList =
        document.getElementById("book-list");


    if (!bookList) {

        return;

    }


    const takenBooks =
        getTakenBooks();


    bookList.innerHTML = "";


    books.forEach(book => {

        const alreadyTaken =
            takenBooks.some(
                item =>
                    item.bookId === book.id
            );


        const card =
            document.createElement("ion-card");


        card.className =
            "book-card";


        card.innerHTML = `

            <div class="book-icon">
                📖
            </div>

            <ion-card-header>

                <span class="available-badge">

                    ${
                        alreadyTaken
                            ? "Already Taken"
                            : "FREE TO TAKE"
                    }

                </span>

                <ion-card-title>
                    ${book.title}
                </ion-card-title>

                <ion-card-subtitle>
                    ${book.author}
                </ion-card-subtitle>

            </ion-card-header>


            <ion-card-content>

                <p class="book-description">
                    ${book.description}
                </p>


                <ion-button
                    expand="block"
                    ${
                        alreadyTaken
                            ? "disabled"
                            : ""
                    }
                    onclick="openBook(${book.id})"
                >

                    ${
                        alreadyTaken
                            ? "Book Taken"
                            : "🎃 Take This Book"
                    }

                </ion-button>

            </ion-card-content>

        `;


        bookList.appendChild(card);

    });

}


// ==========================================
// OPEN BOOK MODAL
// ==========================================

async function openBook(bookId) {

    const takenBooks =
        getTakenBooks();


    const alreadyTaken =
        takenBooks.some(
            item =>
                item.bookId === bookId
        );


    if (alreadyTaken) {

        return;

    }


    selectedBook =
        books.find(
            book =>
                book.id === bookId
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


    const modal =
        document.getElementById(
            "book-modal"
        );


    await modal.present();

}


// ==========================================
// TAKE BOOK
// ==========================================

async function takeBook() {

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


    const alreadyTaken =
        takenBooks.some(
            item =>
                item.bookId === selectedBook.id
        );


    if (alreadyTaken) {

        return;

    }


    const selection = {

        bookId:
            selectedBook.id,

        title:
            selectedBook.title,

        author:
            selectedBook.author,

        note:
            note,

        date:
            new Date().toLocaleString(),

        timestamp:
            Date.now()

    };


    takenBooks.push(selection);


    saveTakenBooks(takenBooks);


    await closeModal();


    displayBooks();

    displayTakenBooks();


    const alert =
        document.getElementById(
            "success-message"
        );


    alert.message =
        `"${selectedBook.title}" is now yours. Enjoy your spooky read!`;


    await alert.present();


    selectedBook = null;

}


// ==========================================
// DISPLAY TAKEN BOOKS
// ==========================================

function displayTakenBooks() {

    const container =
        document.getElementById(
            "taken-books"
        );


    if (!container) {

        return;

    }


    const takenBooks =
        getTakenBooks();


    container.innerHTML = "";


    if (takenBooks.length === 0) {

        container.innerHTML = `

            <ion-card class="taken-card">

                <ion-card-content>

                    <p>
                        🎃 You haven't taken a book yet.
                        Choose a spooky story above!
                    </p>

                </ion-card-content>

            </ion-card>

        `;

        return;

    }


    takenBooks.forEach(book => {

        const card =
            document.createElement(
                "ion-card"
            );


        card.className =
            "taken-card";


        card.innerHTML = `

            <ion-card-header>

                <ion-card-title>
                    📖 ${book.title}
                </ion-card-title>

                <ion-card-subtitle>
                    by ${book.author}
                </ion-card-subtitle>

            </ion-card-header>


            <ion-card-content>

                <small>
                    Taken on ${book.date}
                </small>


                ${
                    book.note

                        ? `

                            <div class="note">

                                📝
                                ${escapeHTML(book.note)}

                            </div>

                          `

                        : `

                            <div class="note">

                                No note was left
                                for this book.

                            </div>

                          `
                }

            </ion-card-content>

        `;


        container.appendChild(card);

    });

}


// ==========================================
// ESCAPE USER INPUT
// ==========================================

function escapeHTML(text) {

    const div =
        document.createElement("div");


    div.textContent =
        text;


    return div.innerHTML;

}


// ==========================================
// CLOSE MODAL
// ==========================================

async function closeModal() {

    const modal =
        document.getElementById(
            "book-modal"
        );


    await modal.dismiss();


    selectedBook = null;

}


// ==========================================
// CLEAR LOCAL STORAGE
// ==========================================

async function clearTakenBooks() {

    const takenBooks =
        getTakenBooks();


    if (takenBooks.length === 0) {

        return;

    }


    const alert =
        document.createElement(
            "ion-alert"
        );


    alert.header =
        "Clear Saved Books?";


    alert.message =
        "This will remove all book selections and notes saved on this device.";


    alert.buttons = [

        {
            text: "Cancel",
            role: "cancel"
        },

        {
            text: "Clear",
            role: "destructive",

            handler: () => {

                localStorage.removeItem(
                    STORAGE_KEY
                );


                displayBooks();

                displayTakenBooks();

            }

        }

    ];


    document
        .querySelector("ion-app")
        .appendChild(alert);


    await alert.present();

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
