import Notes from '../../../model/note';
import mongodbConnect from '../../../database/dbConn';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  };

  try {
    const { title, content } = req.body;
    mongodbConnect();
    let newNote = new Notes({ title, content });
    await newNote.save();
    res.status(200).json({ message: 'Note is successfully added.' });

  } catch (error) {
    res.status(500).json({error: 'internal error POST page!'});
  };
};