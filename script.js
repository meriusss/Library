let library = [];
const booksContainer = document.querySelector(".books-container");
const addBookButton = document.getElementById("add-book-button");
const addBookForm = document.querySelector(".add-book-form");
const addBookButtonSubmit = document.getElementById("add-book-button-2");
let isOpen = false;
let id = 0;




function book(title, author, pages, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.id = id;
}

function toggleInputForm() {
    addBookButton.addEventListener('click', (e)=>{
        if (isOpen == false){
            addBookForm.style.display = "flex";
            isOpen = true;
        }
        else {
            addBookForm.style.display = "none";
            isOpen = false;
        }
    })
};

function addBookToLibrary(){
    const titleInput = document.getElementById("title-input");
    const authorInput = document.getElementById("author-input");
    const pagesInput = document.getElementById("pages-input");

    let bookObject = new book(titleInput.value, authorInput.value, pagesInput.value, id);
    library.push(bookObject);
    titleInput.value = "";
    authorInput.value = "";
    pagesInput.value = "";
    id++;
}

function updateHtml(){
    booksContainer.innerHTML = "";
    library.forEach(element => {
        const card = document.createElement("div");
        card.classList.add("book-card");
        
        const title = document.createElement("p");
        title.classList.add("book-title");
        title.textContent = '"' + element.title + '"';
        
        const author = document.createElement("p");
        author.classList.add("book-author");
        author.textContent = "by " + element.author;
        
        const pages = document.createElement("p");
        pages.classList.add("book-pages");
        pages.textContent = element.pages + " pages";
        
        const removeButtonContainer = document.createElement("div");
        removeButtonContainer.classList.add("remove-button-container");
        const removeButton = document.createElement("button");
        removeButton.id = "remove-book-button";
        removeButton.classList.add("removeButton")
        removeButton.textContent = "REMOVE BOOK";
        removeButton.setAttribute("index", element.id);
        removeButton.addEventListener('click', (e)=>{
            let removeButtonIndex = parseInt(removeButton.getAttribute("index"));
            let index = library.findIndex(x => x.id === removeButtonIndex);
            library.splice(index, 1);
            updateHtml();
        })
        removeButtonContainer.append(removeButton);
            
        card.append(title, author, pages, removeButtonContainer);
        booksContainer.append(card);  
    });
    
}



addBookButtonSubmit.addEventListener('click', (e)=>{
    e.preventDefault();
    addBookForm.style.display = "none";
    isOpen = false;
    addBookToLibrary();
    updateHtml();
});

toggleInputForm();