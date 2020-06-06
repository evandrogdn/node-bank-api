const mongoose = require('mongoose');

mongoose.connect(
  "mongodb://localhost:27017/estoque",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)