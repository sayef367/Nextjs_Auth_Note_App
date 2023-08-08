import { mailOptions, transporter } from "../../../../lib/nodemailer";
import mongodbConnect from "../../../../database/dbConn";
import Users from "../../../../model/auth";
import ModelOTP from "../../../../model/modelOTP";

export default async function handler(req, res) {
  if (req.method === 'POST'){
    if(!req.body) return res.status(404).json({ error: "Don't have form data!" });
    const { email } = req.body;
    await mongodbConnect();
    //check duplicate Users
    const checkExisting = await Users.findOne({ email });
    if(!checkExisting) return res.status(409).json({ error: "User not Exist!" });
    //generate OTP
    const otp = Math.floor(Math.random() * 999999);
    //send email OTP
    await transporter.sendMail({
      ...mailOptions,
      to: email,
      subject: 'My Note sent the OTP',
      text: 'OTP has been sent from My Note',
      html: `
        <center>
          <p>This is an automatically generated email from My Note.<p/>
          <h3>Your verification code is:</h3>
          <h1>${otp}</h1>
          <p>Do not share it with anyone. The code expires in 80 seconds.</p>
        </center>`
    });
    //hash password save
    let newModelOTP = new ModelOTP({ _id: checkExisting._id, email, otp: otp });
    await newModelOTP.save();
    return res.status(200).json({ message: "OTP send successfully." });
  };

  return res.status(400).json({ error: 'Bad request!' });
};