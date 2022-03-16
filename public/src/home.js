const { findAuthorById } = require("./books");

/*returns a _number_ that represents the number of book objects inside of the array */
function getTotalBooksCount(books) {
  let initialValue = 0;
  let logNumOfBooks = books.reduce((index) => {
    return index + 1;
  }, initialValue);

  //console.log(logNumOfBooks);

  return logNumOfBooks;
}

/*returns a _number_ that represents the number of account objects inside of the array*/
function getTotalAccountsCount(accounts) {
  let initialValue = 0;
  let logNumOfAccounts = accounts.reduce((index) => {
    return index + 1;
  }, initialValue);

  return logNumOfAccounts;
}

/*returns a _number_ that represents the number of books _that are currently 
 checked out of the library._This number can be found by looking at the 
 first transaction object in the `borrows` array of each book. 
 If the transaction says the book has not been returned (i.e. `returned: false`),
 the book is currently being borrowed. */
function getBooksBorrowedCount(books) {
  let numOfBooksBorrowed = 0;

  books.forEach((book) => {
    const borrowed = book.borrows;

    if(borrowed[0].returned === false){
      numOfBooksBorrowed += 1;
    }
  });

  return numOfBooksBorrowed;

}

/*helper function to loop through array and return an array 
with a certain amount of objects*/
function certainLengthArray(array, num){
  let newArray = []
  for(let i = 0; i < num; i++){
    newArray.push(array[i]);
  }

  return newArray;
}

/*It returns an array containing five objects or fewer that represents the
 most common occurring genres, ordered from most common to least. */
function getMostCommonGenres(books) {
  //declare arrays to be used to store new arrays
  let genres = [];
  let mostCommonGenres = [];
  let orderedArray = [];

  //forEach method is used to loop through books genres
  books.forEach((book) => {
    bookGenre = book.genre;

    //some method is used to see if genre is in array of genres
    const result = genres.some((genre) => bookGenre === genre);

    //if genre is found in array of genres, then it will add 1 to that object's count
    if(result === true){
      let object = mostCommonGenres.find((genre) => genre.name === bookGenre);
      object.count += 1;
    }
    /*if genre is not found in array of genres, then it will be added to array of objects.
     As well as be added to the array of objects with counts*/
    else{
      genres.push(bookGenre);
      mostCommonGenres.push({name : book.genre, count : 1});
    }
  });

  //console.log(mostCommonGenres);
  //sort method is used to sort the objects based on their count from greatest to least
  mostCommonGenres.sort((genreA, genreB) => (genreA.count < genreB.count ? 1 : -1));
  //console.log(mostCommonGenres);
  
  /*use of helper function to return an array with max of 5 objects*/
  orderedArray = certainLengthArray(mostCommonGenres, 5);
  //console.log(orderedArray);

  return orderedArray;
}

/*returns an array containing five objects or fewer that represents the
most popular books in the library. Popularity is represented by the 
number of times a book has been borrowed. */
function getMostPopularBooks(books) {

  let mostPopularBooks = [];
  let fiveMostPopular = [];

  books.forEach((book) => {
    const borrowed = book.borrows;
    let count = 0;
    borrowed.forEach((borrow) =>{
      count += 1;
    });
    mostPopularBooks.push({name : book.title, count : count});
  })

  //console.log(mostPopularBooks);
  mostPopularBooks.sort((bookA, bookB) => (bookA.count < bookB.count ? 1 : -1));
  //console.log(mostPopularBooks);

  /*use of helper function to return an array with max of 5 objects*/
  fiveMostPopular = certainLengthArray(mostPopularBooks, 5);
  //console.log(fiveMostPopular);

  return fiveMostPopular;
}

/*returns an array containing five objects or fewer that represents the most popular authors 
 whose books have been checked out the most. Popularity is represented by finding all of the
  books written by the author and then adding up the number of times those books have been borrowed.*/
function getMostPopularAuthors(books, authors) {

  let authorsAndCounts = [];
  let mostPopularAuthors = [];

  //loop through authors and find all books written by author
  authors.forEach((author) => {
    let authorID = author.id;
    let authorName = (`${author.name.first} ${author.name.last}`);
    //console.log(authorName);

     let count = 0;

    //loop through books whose author id matches the current author in loop
    books.forEach((book) => {
      const bookAuthor = book.authorId
      //if the author ids match
      if(authorID === bookAuthor){
        const borrowed = book.borrows;
        //then loop through borrows to count how many times it has been borrowed
        count += borrowed.length;
      }

    });

    //use push method to add the object of author and count into the authorAndCounts array
    authorsAndCounts.push({name : authorName, count : count});
    //console.log(authorsAndCounts);
  });

  //console.log(authorsAndCounts);
  //use sort method to sort the objects from greatest to least
  authorsAndCounts.sort((authorA, authorB) => (authorA.count < authorB.count ? 1 : -1));
  //console.log(authorsAndCounts);

  /*use of helper function to return an array with max of 5 objects*/
  mostPopularAuthors = certainLengthArray(authorsAndCounts, 5);

  //console.log(mostPopularAuthors);
  return mostPopularAuthors;

}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
