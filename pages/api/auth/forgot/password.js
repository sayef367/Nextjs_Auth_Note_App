import mongodbConnect from '../../../../database/dbConn';
import Users from '../../../../model/auth';
import { hash } from "bcryptjs";

export default async function handler(req, res) {
  if (req.method !== 'PUT'){
    return res.status(405).end();
  };
  
  try {
    const {id, password} = req.body;
    await mongodbConnect();
    const checkExisting = await Users.findOne({_id: id}); //find user
    if(!checkExisting) {
      return res.status(422).json({ error: "User is not Exist!" });
    } else {
      await Users.findByIdAndUpdate({_id: id}, {password: await hash(password, 12)}); //hash password
      res.status(200).json({ message: 'Password successfully change.' });
    };

  } catch (error) {
    res.status(500).json({error: 'Internal Error...'});
  };
};
