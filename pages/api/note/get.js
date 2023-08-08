import Notes from '../../../model/note';
import mongodbConnect from '../../../database/dbConn';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({error: 'Method is not GET'});
  };

  try {
    const userId = req.query;
    await mongodbConnect();
    const resData = await Notes.find( userId, {title: 1, content: 1}).sort({date: 'desc'});
    
    res.status(200).json(resData);

  } catch (error) {
    res.status(500).json({error: 'Internal Error...'});
  };
};