// import all required modules
import logger from '../utils/logger.js';
import bookcollectionStore from '../models/bookcollection-store.js';

// create the statistics object
const statistics = {
  index(request, response) {
    logger.info('statistics rendering (printing from statistics.js)')
    
    // total book collections
    const BookCollections = bookcollectionStore.getAllbookCollections()
    
    const totalBookCollections = BookCollections.length
    
    // average number of books per collection
    const numOfBooks = BookCollections.reduce((total, collection) => total + collection.books.length, 0);
    const averageNumBooks = (numOfBooks / totalBookCollections);
    
    // Sorted Book Collection which as the most books and Least Books
    const sortedArray = BookCollections.sort((a,b) => b.books.length - a.books.length);
    const collectionMostBooks = sortedArray[0];
    const collectionLeastBooks = sortedArray[sortedArray.length -1];
    
    
    const viewData = {
      totalNumberBookCollections: totalBookCollections,
      averageNumberOfBooks: averageNumBooks,
      totalNumberOfBooks: numOfBooks,
      collectionMostBooksID: collectionMostBooks.id,
      collectionNameMostBooks: collectionMostBooks.collectionName,
      collectionNameMostBooksTotal: collectionMostBooks.books.length,
      collectionLeastBooksID: collectionLeastBooks.id,
      collectionNameLeastBooks: collectionLeastBooks.collectionName,
      collectionNameLeastBooksTotal: collectionLeastBooks.books.length,
    }
    
    response.render('statistics', viewData)
  },
};

export default statistics;