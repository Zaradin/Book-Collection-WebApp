'use strict';

// import all required modules
import logger from '../utils/logger.js';
import bookCollectionStore from '../models/bookcollection-store.js';
import { v4 as uuidv4 } from 'uuid';

import isbn from 'node-isbn';

const bookcollection = {
  
  index(request, response) {

    const collectionID = request.params.id;
    logger.debug('Collection id = ' + collectionID);
    
    const viewData = {
      title: 'Book Collection',
      bookCollection: bookCollectionStore.getBookCollcetion(collectionID),
    };
    response.render('bookCollection', viewData);
  },
  deleteBook(request, response) {
      const bookCollectionID = request.params.id;
      const bookID = request.params.bookID;
      logger.debug(`Deleting Book ${bookID} from Collection ${bookCollectionID}`);
      bookCollectionStore.removeBook(bookCollectionID, bookID);
      response.redirect('/bookcollection/' + bookCollectionID);
  },
  
  addBook(request, response) {
    const bookCollectionID = request.params.id;
    const bookcollection = bookCollectionStore.getBookCollcetion(bookCollectionID);
    const newBook = {
      id: uuidv4(),
      title: request.body.Title,
      author: request.body.Author,
      publicationDate: request.body.PublicationDate,
      publisher: request.body.Publisher,
      isbn: request.body.ISBN
    };
    bookCollectionStore.addBook(bookCollectionID, newBook);
    response.redirect('/bookcollection/' + bookCollectionID);
  },

  updateBook(request, response) {
    const bookCollectionID = request.params.id;
    const bookID = request.params.bookID;
    logger.debug("updating book " + bookID);
    const updatedBook = {
      id: bookID,
      title: request.body.title,
      author: request.body.author,
      publicationDate: request.body.publicationDate,
      publisher: request.body.publisher,
      isbn: request.body.isbn,
      
    };
    bookCollectionStore.editBook(bookCollectionID, bookID, updatedBook);
    response.redirect('/bookcollection/' + bookCollectionID);
  },

  
  // Must move this to the dashboard.js as that's where it should reside
  // Will do once everything else is working as it should
  deleteBookCollection(request, response){
    const bookCollectionID = request.params.collectionID;
    
    logger.debug(`Deleting Book Collection ${bookCollectionID}`);
    
    bookCollectionStore.removeBookCollection(bookCollectionID);
    
    response.redirect('/dashboard');
  },
};

export default bookcollection;
