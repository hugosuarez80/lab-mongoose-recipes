const mongoose = require('mongoose');
// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const myRecipe = new Recipe({
      "title": "Bandeja Paisa",
    "cuisine": "Colombian"
    })
    myRecipe.save()
    .then((myRecipe) => console.log("Inserted"))

    Recipe.insertMany(data).then(res => {
      
      

      Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"},{duration: 100})
        .then(res => console.log(res))
        .catch(err => console.log(err))

      Recipe.deleteOne({title: "Carrot Cake"})
        .then(res => console.log(res))
        .catch(err => console.log(err))

       setTimeout(()=> mongoose.connection.close(), 0)
    
    }).catch(err => console.log(err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })



