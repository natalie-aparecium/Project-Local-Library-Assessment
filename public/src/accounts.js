//function returns the account object that has the matching ID.
function findAccountById(accounts, id) {
  //use find() method to find the account in relation to the given id
  return accounts.find((account) => account.id === id);
}

/*function returns a sorted array of the provided account objects. 
The objects are sorted alphabetically by last name.*/
function sortAccountsByLastName(accounts) {
  //use sort() and toLowerCase() methods to sort the accounts by last name
  return accounts.sort((accountA, accountB) => accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase()? 1 : -1);
}

/*funciton returns a _number_ that represents the number of times the account's ID 
  appears in any book's `borrows` array */
function getTotalNumberOfBorrows(account, books) {

  const accountID = account.id;
  //console.log(accountID);
  let totalNumTimes = 0;

  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if(accountID === borrow.id){
        totalNumTimes += 1;
      }
    });
  });

  return totalNumTimes;

}

/*function returns an array of book objects, including author information, 
that represents all books _currently checked out_ by the given account.
 _Look carefully at the object below,_ as it's not just the book object;
  the author object is nested inside of it. */
function getBooksPossessedByAccount(account, books, authors) {
  const accountID = account.id;
  let arrayOfBookObjects = [];

  books.forEach((book) => {
    const borrowed = book.borrows;
    const authorID = book.authorId;
    borrowed.forEach((borrow) => {
      if(accountID === borrow.id && !borrow.returned){
        authors.forEach((author) => {
          if(author.id === authorID){
            const allInfo = {...book, author : author}
            arrayOfBookObjects.push(allInfo);
          }
        })
        
      }
    });
  });

  return arrayOfBookObjects;

}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
