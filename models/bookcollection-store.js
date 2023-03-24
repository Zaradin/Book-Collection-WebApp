'use strict';

import _ from 'lodash';

import { createRequire } from "module";
import JsonStore from './json-store.js';
///const bookCollection = require("./bookcollection-store.json");

const bookcollectionStore = {

  // import the book collection object
  ///bookCollection: bookCollection.bookCollections,
  
  store: new JsonStore('./models/bookcollection-store.json', { bookCollections: [] }),
  collection: 'bookCollections',

  // function to get all of the book collections
  getAllbookCollections() {
    return this.store.findAll(this.collection);
  },
  
  getBookCollcetion(id){
    return this.store.findOneBy(this.collection, (collection => collection.id == id));
  },
  
  removeBook(id, bookID) {
    const arrayName = "books";
    // remove the song with id songId from the playlist
    this.store.removeItem(this.collection, id, arrayName, bookID);
  },
  
  addBookCollection(bookCollection){
    this.store.addCollection(this.collection, bookCollection);
  },
  
  removeBookCollection(bookCollectionID) {
    const bookColletion = this.getBookCollcetion(bookCollectionID);
    this.store.removeCollection(this.collection, bookColletion);
  },
  
  addBook(id, book){
    const arrayName = "books";
    const bookCollection = this.getBookCollcetion(id);
    this.store.addItem(this.collection, id, arrayName, book);
  },
  
  editBook(id, bookID, updatedBook) {
    const arrayName = "books";
    this.store.editItem(this.collection, id, bookID, arrayName, updatedBook);
  },


};

// export the bookcollection Store object so it can be used elsewhere
export default bookcollectionStore;
