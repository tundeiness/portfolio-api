const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendGrid = require('@sendgrid/mail');


const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH,  DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next();
})

app.get('/api', (req, res, next) =>{
  res.send('API Status: Running!')
})


app.post('/api/email', (req, res, next) => {
  sendGrid.setApiKey('098uytrfd432#45$%6uyTygv89UYTcxzsAW');
  const msg = {
    to:'tundeiness@yahoo.co.uk',
    from: req.body.email,
    subject:'Website Contact',
    text: req.body.message,
  }
  sendGrid.send(msg)
  .then(result =>{
    res.status(200).json({
      success: true,
    });
  })
  .catch(err =>{
    console.log("Error", err)
    res.status(401).json({
      success: false,
    })
  })
})


app.listen(4040, '0.0.0.0');  // app.listen(preffered port, localhost)
