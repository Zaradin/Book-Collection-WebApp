'use strict';

// import express and initialise router
import express from 'express';
const router = express.Router();

// import controllers
import start from './controllers/start.js';
import dashboard from './controllers/dashboard.js';
import about from './controllers/about.js'
import bookCollection from './controllers/bookcollection.js';

import statistics from './controllers/statistics.js';


// connect routes to controllers
router.get('/', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/bookcollection/:id', bookCollection.index);
router.get('/bookCollection/:id/deleteBook/:bookID', bookCollection.deleteBook);
// Also change this to reflect the moved function, therefor it would be dashboard.deleteBookCollection
router.get('/bookCollection/deleteBookCollection/:collectionID', bookCollection.deleteBookCollection);

// adding books
router.post('/bookCollection/:id/addbook', bookCollection.addBook);

//updating books
router.post('/bookCollection/:id/updatebook/:bookID', bookCollection.updateBook);

// adding a book collection
router.post('/dashboard/addBookCollection', dashboard.addBookCollection);

// The 4th page
// statistics page
router.get('/statistics', statistics.index);


// export router module
export default router;
