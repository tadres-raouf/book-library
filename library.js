var nameRegExp= /^[a-zA-Z0-9\s]+$/;
var priceRegex = /^(?:\d+|\d+\.\d{1,2})$/;
var authorNameRegExp = /^[a-zA-Z]+( [a-zA-Z]+)*$/;
var mailRegExp=  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
function book (name,price,authorName,authorEmail){
    if(!nameRegExp.test(name)){
        throw new Error("please enter a valid book name");
    }
    if(!priceRegex.test(price)){
        throw new Error("please enter a valid book price");
    }
    if(!authorNameRegExp.test(authorName)){
        throw new Error("please enter a valid book author");
    }
    if (!mailRegExp.test(authorEmail)) {
        throw new Error("Please enter a valid email");
    }
    this.name=name;
    this.price=price;
    this.author={
        name:authorName,
        email:authorEmail
    };
};



var books=[];
var numbooks=0;
var currentBook=0;
function numberBooks(){
    numbooks=parseInt(document.getElementById("numbooks").value,10);

    if(isNaN(numbooks)||numbooks<1){
        document.getElementById("output").innerText="please enter a valid number";
        numbooks=0;
        return;
    }
    document.getElementById("output").innerText = "";
    document.getElementById("inputSection").style.display="none";
    document.getElementById("bookForm").style.display="block";
}

function addBook(){
    var bookName=document.getElementById("bookName").value;
    var bookPrice=document.getElementById("bookPrice").value;
    var authorName=document.getElementById("authorName").value;
    var authorEmail=document.getElementById("authorEmail").value;

    var isValid=true;

    if(!nameRegExp.test(bookName)){
        document.getElementById("nameError").style.display="block";
        isValid=false;
    }else{
        document.getElementById("nameError").style.display="none";
    }
    if(!priceRegex.test(bookPrice)){
        document.getElementById("priceError").style.display="block";
        isValid=false;
    }else{
        document.getElementById("priceError").style.display="none";
    }
    if(!authorNameRegExp.test(authorName)){
        document.getElementById("authorNameError").style.display="block";
        isValid=false;
    }else{
        document.getElementById("authorNameError").style.display="none";
    }
    if(!mailRegExp.test(authorEmail)){
        document.getElementById("emailError").style.display="block";
        isValid=false;
    }else{
        document.getElementById("emailError").style.display="none";
    }
    if(!isValid) return;

    var newBook=new book(bookName,bookPrice,authorName,authorEmail);
    books.push(newBook);
    currentBook++;

    document.getElementById("bookForm").reset();
     if(currentBook>=numbooks){
        document.getElementById("formSection").style.display="none";
        document.getElementById("tableSection").style.display="block";
        document.getElementById("bookTable").style.display="table";
        bookTable();
     }
    
}

function bookTable(){
    var tableBody=document.getElementById("bookTableBody");
    tableBody.innerHTML="";

    for(var i=0; i<books.length; i++){
        var row = document.createElement("tr");
        row.innerHTML=`
        <td>${books[i].name} </td>
        <td>${books[i].price} </td>
        <td>${books[i].author.name} </td>
        <td>${books[i].author.email} </td>
        <td>
            <button class="btn" onclick="editBook(${i})">Edit</button>
        </td>
        <td>
            <button class="btn" onclick="deleteBook(${i})">Delete</button>
        </td>
        `;
        tableBody.appendChild(row);
    }
}

function deleteBook(index){
    books.splice(index,1);
    bookTable();
}

function editBook(index) {
    var tableBody = document.getElementById("bookTableBody");
    var row = tableBody.rows[index];
    var book = books[index];

    row.innerHTML = `
         <td><input type="text" value="${book.name}" class="style" id="editName${index}"></td>
         <td><input type="text" value="${book.price}" class="style" id="editPrice${index}"></td>
         <td><input type="text" value="${book.author.name}" class="style" id="editAuthorName${index}"></td>
         <td><input type="text" value="${book.author.email}" class="style" id="editAuthorEmail${index}"></td>
         <td>
             <button class="btn" onclick="saveBook(${index})">Save</button>
             
         </td>
         <td><button class="btn" onclick="bookTable()">Cancel</button></td>
     `;

}

function saveBook(index) {
    var newName = document.getElementById("editName" + index).value;
    var newPrice = document.getElementById("editPrice" + index).value;
    var newAuthorName = document.getElementById("editAuthorName" + index).value;
    var newAuthorEmail = document.getElementById("editAuthorEmail" + index).value;
    
    try {
        // Validate inputs
        if (!nameRegExp.test(newName)) throw new Error("Invalid book name");
        if (!priceRegex.test(newPrice)) throw new Error("Invalid price");
        if (!authorNameRegExp.test(newAuthorName)) throw new Error("Invalid author name");
        if (!mailRegExp.test(newAuthorEmail)) throw new Error("Invalid email");
        
        // Update book
        books[index] = new book(newName, newPrice, newAuthorName, newAuthorEmail);
        bookTable();
    } catch (e) {
        alert(e.message);
    }
}
