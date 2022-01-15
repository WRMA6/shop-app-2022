# Shopify 2022 summer internship challenge submission

### Overview
This app was built using Node.js and MongoDB. It supports the CRUD functionality that was required, as well as the extra feature of filtering by fields.

### How to run:
##### Option 1
Visit the [Heroku free-tier deployment](https://shop-app-2022-internship.herokuapp.com/). Keep in mind there may be a bit of downtime for Heroku to start up the application. You may need to wait 30 seconds and refresh for the web page to load.

##### Option 2
Install [Node.js](https://nodejs.org/en/download/) to run this application. Once that is installed, run ```npm start``` to start the application. The web interface should show up when you visit ```localhost:3000``` in your browser.

For your convenience of running the app, I have left a config file of working MongoDB credentials in the source code (I know it's a bad idea in real production scenarios!!). If you want, you can specify your own MongoDB database in the ```config/dbcreds.js``` file.

### Tests:
You can run the tests by using ```npm test```. The tests are found in the ```tests/``` folder.

### Potential features to add:
- Better UI
- Custom/flexible item schemas
- Soft deletion (undo's, deletion history)