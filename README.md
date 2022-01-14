# Shopify 2022 summer internship challenge submission

### Overview
This app was built using Node.js and MongoDB. It supports the CRUD functionality that was required, as well as the extra feature of filtering by fields.

### How to run:
You will need [Node.js](https://nodejs.org/en/download/) to run this application. Once that is installed, run ```npm start``` to start the application. The web interface should show up when you visit ```localhost:3000``` in your browser.

Optionally, you can specifiy your own MongoDB database in the ```config/``` folder. For convenience, I have already left a working demo file in the folder.

### Tests:
You can run the tests by using ```npm test```. The tests are found in the ```tests/``` folder.

### Potential features to add:
- Better UI
- Custom item schemas
- Soft deletion (undo's, deletion history)