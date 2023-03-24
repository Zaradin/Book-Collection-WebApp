'use strict';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const developerCollection = require("./developer-store.json");

const developerStore = {

  // import the book collection object
  developerCollection: developerCollection.developers,

  // function to get all of the book collections
  getAllDevelopers() {
    return this.developerCollection;
  },

};

// export the bookcollection Store object so it can be used elsewhere
export default developerStore;
