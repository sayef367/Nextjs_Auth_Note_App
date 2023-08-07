import mongoose from "mongoose";

export default async function mongodbConnect() {
  try {
    // Connect to the MongoDB 
    await mongoose.connect('mongodb://127.0.0.1:27017/nextjsAuthNoteApp', { 
      useNewUrlParser: true,
      useUnifiedTopology: true,
      })
    .then(() => console.log('DB connecton successful'))
    .catch(err => console.log(err));

  } catch (e) {
    res.status(400).json({error: "could not connect"});
  };
};
