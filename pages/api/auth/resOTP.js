import ModelOTP from '../../../model/modelOTP';
import Users from "../../../model/auth";
import mongodbConnect from '../../../database/dbConn';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method is not POST'});
  };

  try {
    if(!req.body) return res.status(404).json({ error: "Don't have OTP data!" });
    const {otp, otpId} = req.body;
    await mongodbConnect();

    //check user OTP Data
    const data = await ModelOTP.findOne({ email: otpId });
    if(!data) return res.status(410).json({ error: "OTP is Expired!" });
    //Match user OTP
    if(otp != data.otp) return res.status(410).json({ error: "OTP is not match!" });
  
    //save signUp information
    const userData = new Users({ name: data.name, email: data.email, password: data.password }, function(err, data){
      if(err) return res.status(404).json({ error: 'Registration Error!' });
    });
    await userData.save();

    res.status(200).json({ message: 'Registration Successful.' });

  } catch (error) {
    res.status(500).json({ error: 'Internal Error...' });
  };
};