// Book Constructor
function Book(title, author, isbn){
  this.title = title;
  this.author =author;
  this.isbn= isbn;
}

// UI Constructor
function UI(){};

const ui = new UI(); // global ui object

UI.prototype.addBookToTable= function(book){
  const list = document.getElementById('book-list');
  const row= document.createElement('tr');
  row.innerHTML= `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href='#' class='delete'>X</a></td>
  `;

  list.appendChild(row);

};

UI.prototype.clearFields=function(){
  document.getElementById('title').value='';
  document.getElementById('author').value='';
  document.getElementById('isbn').value='';
};

UI.prototype.showAlert = function(message,classname){
  const container = document.querySelector('.container');
  const form = document.getElementById('book-form');

//create element for alert
const div = document.createElement('div');
// Add class name
div.className=`alert ${classname}`;
// Add message
div.appendChild(document.createTextNode(message));

container.insertBefore(div,form);

// Remove afrter 3 sec
setTimeout(function(e){
  document.querySelector('.alert').remove();
},3000);
}

UI.prototype.deleteBook = function(target){
  if(target.className=='delete'){
    ui.showAlert('Book deleted from list!','success');
    target.parentElement.parentElement.remove();

  }

  
  
};

document.getElementById('book-form').addEventListener('submit', function(e){
  // get input values
  const title = document.getElementById('title').value;
  const author =document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  // create book obj
  const book = new Book(title, author, isbn);
  // Add book to table
  // create UI object
 

if(title==''||author==''||isbn==''){
  ui.showAlert('Please fill in all fields!', 'error');
} else{
  ui.addBookToTable(book);
  ui.clearFields();
  ui.showAlert('Book Added to list!','success');
}
  // Clear Fields
  e.preventDefault();
});

document.getElementById('book-list').addEventListener('click', function(e){
  
  ui.deleteBook(e.target);
  e.preventDefault();
});