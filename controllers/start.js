'use strict';

// import all required modules
import logger from '../utils/logger.js';
import bookCollectionStore from '../models/bookcollection-store.js';
import isbn from 'node-isbn';


// create start object
const start = {
  
  getBookImage: (isbnPassed) => {
    return new Promise((resolve, reject) => {
      isbn.resolve(isbnPassed, function (err, book) {
        if (err) {
          resolve("https://cdn.glitch.global/86729817-74c2-4e07-8205-80fb02826f4c/bookCoverNotFound.jpg?v=1679478095678");
        } else {
          resolve(book.imageLinks.smallThumbnail);
        }
      });
    });
  },

  // index method - responsible for creating and rendering the view
  async index(request, response) {
    
    //here we will loop over the book collections, get the book cover image for each book
    //and add an attribute to the object with the link
    //finally pass this new bookCollection object to the response.render('start', viewData);
    const savedBookCollection = bookCollectionStore.getAllbookCollections();
    for(var bookCollection of savedBookCollection){
      for(var book of bookCollection.books){
        // check if the coverImage data is already in the book collection,
        // if it is don't fetch it
        // this will dramatically speed up the loading of the home page.
        if(!book.hasOwnProperty("coverImage")){
          book.coverImage = await start.getBookImage(book.isbn);
        }
      }
    }
    
    //logger.info("TESTING87 " + savedBookCollection[0].books[0].title)

    // display confirmation message in log
    logger.info('start rendering');

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Welcome to the BookCollection App',
      bookCoverCollection: savedBookCollection,
    };

    // render the start view and pass through the data
    response.render('start', viewData);
  },
};

// export the start module
export default start;
