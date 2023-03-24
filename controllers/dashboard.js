'use strict';

// import all required modules
import logger from '../utils/logger.js';
import bookcollectionStore from '../models/bookcollection-store.js';
import { v4 as uuidv4 } from 'uuid';


// create dashboard object
const dashboard = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    logger.info('dashboard rendering');
  

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'Book Collection App Dashboard',
      bookcollection: bookcollectionStore.getAllbookCollections(),
    };

    // render the dashboard view and pass through the data
    logger.info('about to render', viewData.bookcollection);
    response.render('dashboard', viewData);
  },
  
  addBookCollection(request, response) {
    const newBookCollection = {
      id: uuidv4(),
      collectionName: request.body.collectionName,
      books: [],
    };
      bookcollectionStore.addBookCollection(newBookCollection);
      response.redirect('/dashboard');
  },
};

// export the dashboard module
export default dashboard;
