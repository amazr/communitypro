const express = require('express');
const userModel = require('./models/user');
const app = express();


//GETS
app.get('/a/getTest', (req,res) => {
    let test = "This is a test";
    res.json(test);
    console.log('Test string');
});

app.get('/', (req,res) => {
    res.send('Hello World!')
});

app.get('/users', async (req, res) => {
  const users = await userModel.find({});

  try {
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

//POSTS
app.post('/user', async (req, res) => {
    //Put json object into userModel
    //const user = new userModel();

    try {
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
});

module.exports = app