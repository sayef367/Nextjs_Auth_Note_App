import Notes from '../../../model/note';
import mongodbConnect from '../../../database/dbConn';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  };

  try {
    const { title, content, user } = req.body;
    
    await mongodbConnect();
    let newNote = new Notes({ title, content, user });
    await newNote.save();
    res.status(200).json({ message: 'Note is successfully added.' });

  } catch (error) {
    res.status(500).json({error: 'Internal Error...'});

  } finally {
    if (mongodbConnect) res.status(200).end();
  };
};