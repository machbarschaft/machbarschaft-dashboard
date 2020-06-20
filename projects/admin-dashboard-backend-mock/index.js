const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(3000, () =>
  console.log('Starting mock-server on port 3000!'),
);

require('./help-request')(app);
require('./help-seeker')(app);

app.get('/', (req, res) => {
  res.send('hello world');
});

