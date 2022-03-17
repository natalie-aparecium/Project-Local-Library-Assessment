
/*function returns the author object that has the matching ID */
function findAuthorById(authors, id) {
  //use find() method to find the author in relation to the given id
  return authors.find((author) => author.id === id);
}

/*returns the book object that has the matching ID*/
function findBookById(books, id) {
  //use find() method to find the book whose id matches the given id
  return books.find((book) => book.id === id);
}

/* returns an array with two arrays inside of it. 
All of the inputted books are present in either the first or second array*/
function partitionBooksByBorrowedStatus(books) {
  let partitionArray = [];
  let booksCheckedOut = [];
  let booksReturned = [];
  //let bookInfo = {};

  //the filter method will bulid an array with the items whose first borrows returned transaction is false (has not been checked out)
  booksCheckedOut = books.filter((book) => book.borrows[0].returned === false);

  //console.log(booksCheckedOut);

  //the filter method will bulid an array with the items whose first borrows returned transaction is true (has been returned)
  booksReturned = books.filter((book) => book.borrows[0].returned === true);

  /* ^^the code below was exchanged to use the filter method (shown in the code above)
    books.forEach((book) => {                                           
    bookInfo = {...book};                                                 
    const borrowed = book.borrows;

    //let checkedOut;

    borrowed.forEach((borrow) => {
      checkedOut = borrowed.find((borrow) => borrow.returned === false)
    });

    if(checkedOut == undefined){
      //console.log(borrowed.returned);
      booksReturned.push(bookInfo);
    }
    else {
      //console.log(borrowed.returned);
      booksCheckedOut.push(bookInfo);
    }


  }); */

  //console.log(booksCheckedOut);
  //console.log("XXX");
  //console.log(booksReturned);

  partitionArray.push(booksCheckedOut);
  partitionArray.push(booksReturned);

  return partitionArray;
}

/*should return an array of ten or fewer account objects that represents 
the accounts given by the IDs in the provided book's `borrows` array. 
However, each account object should include the `returned` entry 
from the corresponding transaction object in the `borrows` array. */
function getBorrowersForBook(book, accounts) {
  const { borrows } = book;
  //const borrowed = book.borrows;  <--- works the same as code above

  /*used the function map and find to find the list of borrowers for the book 
   by matching if the accounts.id is equal to the id given */
  const renters = borrows.map(({ id, returned })=> {

    const account = accounts.find(account => account.id === id);

    return { ...account, returned, }; 
  });

  /*used the sort function to bring the result into alphabetical order */
  return renters.sort((borrowA, borrowB) => { 
    const companyA = borrowA.company; 
    const companyB = borrowB.company; 
    return companyA.localeCompare(companyB);

  }).slice(0, 10); /*used the slice function to return the output according to the test case. */

}



module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
