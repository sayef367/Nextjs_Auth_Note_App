import Users from '../../model/auth';
import mongodbConnect from '../../database/dbConn';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({error: 'Method is not GET'});
  };

  try {
    const {user, email} = req.query;
    await mongodbConnect();
    const resData = await Users.findOne({ email: email });

    if (resData === null) {
      res.status(200).json({status: null});
    } else {
      const id = resData._id.toString();
      if (id === user) {
        res.status(200).json({status: null});
      } else {
        res.status(200).json({status: 'ok'});
      };
    };

  } catch (error) {
    res.status(500).json({error: 'Internal Error...'});
  };
};