const mongoose = require('mongoose');
const app = require('./server/app');

mongoose.connect(
  "mongodb://localhost:27017/bank",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)

app.listen(3030);
