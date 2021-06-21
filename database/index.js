const mongoose = require("mongoose");
const mongoPort = 27017;
const DB_URI = `mongodb://mongodb:${mongoPort}/test`;
const DB_URI_LOCALHOST = `mongodb://localhost:${mongoPort}/test`;

function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test" || process.env.NODE_ENV === "dev") {
      console.log("In test | In dev mode");
      //   const Mockgoose = require("mockgoose").Mockgoose;
      //   const mockgoose = new Mockgoose(mongoose);

      //   mockgoose.prepareStorage().then(() => {
      //     mongoose
      //       .connect(DB_URI, {
      //         useNewUrlParser: true,
      //         useFindAndModify: false,
      //         useUnifiedTopology: true,
      //       })
      //       .then((res, err) => {
      //         if (err) return reject(err);
      //         resolve();
      //       });
      //   });
      mongoose
        .connect(DB_URI_LOCALHOST, {
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    } else {
      mongoose
        .connect(DB_URI, {
          useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
        })
        .then((res, err) => {
          if (err) return reject(err);
          resolve();
        });
    }
  });
}

function close() {
  return mongoose.disconnect();
}

function connection() {
  return mongoose.connection;
}

module.exports = { connect, close, connection };
