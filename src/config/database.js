const mongoose = require("mongoose");

exports.connect = () =>
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.log("unable to connect to database", err);
      throw err;
    });
