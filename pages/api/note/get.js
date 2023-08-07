import Notes from '../../../model/note';
import mongodbConnect from '../../../database/dbConn';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({error: 'Method is not GET'});
  };

  try {
    mongodbConnect();
    const resData = await Notes.find().sort({date: 'desc'});
    
    res.status(200).json(resData);

  } catch (error) {
    res.status(500).json({error: 'internal error GET page!'});
  };
};