import Notes from '../../../model/note';
import mongodbConnect from '../../../database/dbConn';

export default async function handler(req, res) {
  if (req.method !== 'PUT'){
    return res.status(405).end();
  };

  try {
    const {id} = req.query;
    const {title, content} = req.body;
    mongodbConnect();
    await Notes.findByIdAndUpdate(id, {title, content});
    res.status(200).json({ message: 'Note is successfully update.'});

  } catch (error) {
    res.status(500).json({error: 'Not Update!'});
  };
};
