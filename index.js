let myLibrary = [
  {
    id: 1,
    title: "New book",
    author: "William",
    numberOfPages: 1200,
    readIt: true,
  },
  {
    id: 2,
    title: "new book",
    author: "Conan",
    numberOfPages: 5000,
    readIt: true,
  },
];

function Book(id, title, author, numberOfPages, readIt) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.readIt = readIt;
}

let title = document.getElementsByClassName("title");

const dialog = document.querySelector("#bookDialog");
const newBtn = document.querySelector(".button-new");
newBtn.addEventListener("click", () => {
  dialog.showModal();
});
const closeBtn = document.querySelector(".button-close");
closeBtn.addEventListener("click", () => {
  dialog.close();
});

const titleValue = document.querySelector("#input-title");
const authorValue = document.querySelector("#input-author");
const numberValue = document.querySelector("#input-number");
const readValue = document.querySelector("#input-read");

const addBtn = document.querySelector(".button-add");
addBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addBookToLibrary(
    titleValue.value,
    authorValue.value,
    numberValue.value,
    readValue.checked
  );
  titleValue.value = "";
  authorValue.value = "";
  numberValue.value = "";
  readValue.checked = false;
  dialog.close();
});

displayLibrary();

function addBookToLibrary(title, author, numberOfPages, readItems) {
  const newBook = new Book(
    myLibrary[myLibrary.length - 1]?.id + 1 || 1,
    title,
    author,
    numberOfPages,
    !readItems ? false : true
  );
  myLibrary.push({ ...newBook });
  displayBook({ ...newBook });
}

function displayLibrary() {
  const titleH1 = document.createElement("h1");
  titleH1.textContent = "List of books";
  document.body.append(titleH1);
  myLibrary.forEach((book) => {
    displayBook(book);
  });
}

function removeBook(id) {
  myLibrary = myLibrary.filter((book) => !(book.id === id));
  const bookToRemove = document.querySelector(`#id-${id}`);
  bookToRemove.remove();
}

function bookReadToggle(id) {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].id === id) {
      myLibrary[i].readIt = !myLibrary[i].readIt;
      break;
    }
  }
  console.log("myLibrary", myLibrary);
  const bookTochange = document.querySelector(`#id-${id}`);
  const toggleButtonToChange = bookTochange.querySelector(".toggle-button");
  console.log(toggleButtonToChange.textContent);
  toggleButtonToChange.textContent =
    toggleButtonToChange.textContent === "No" ? "Yes" : "No";
  console.log(toggleButtonToChange.textContent);
}

function displayBook(book) {
  const article = document.createElement("article");
  article.setAttribute("style", "color:blue; border:1px solid red");
  article.setAttribute("id", `id-${book.id}`);
  document.body.append(article);
  const bookId = document.createElement("p");
  bookId.textContent = book.id;
  article.append(bookId);
  const booktitle = document.createElement("p");
  booktitle.textContent = book.title;
  article.append(booktitle);
  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = book.author;
  article.append(bookAuthor);
  const BooknumberOfPages = document.createElement("p");
  BooknumberOfPages.textContent = book.numberOfPages;
  article.append(BooknumberOfPages);
  const labelReadIt = document.createElement("label");
  labelReadIt.textContent = "Read: ";
  article.append(labelReadIt);
  const btnReadIt = document.createElement("button");
  btnReadIt.textContent = book.readIt ? "Yes" : "No";
  btnReadIt.setAttribute("class", `toggle-button`);
  article.append(btnReadIt);
  btnReadIt.addEventListener("click", () => bookReadToggle(book.id));
  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.setAttribute("style", "display: block; margin-top:15px;");
  article.append(removeButton);
  removeButton.addEventListener("click", () => removeBook(book.id));
}
