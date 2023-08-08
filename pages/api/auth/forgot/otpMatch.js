import ModelOTP from '../../../../model/modelOTP';
import mongodbConnect from '../../../../database/dbConn';

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

    res.status(200).json({ id: data._id, message: 'OTP is match.' });

  } catch (error) {
    res.status(500).json({ error: 'Internal Error...' });
  };
};