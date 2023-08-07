import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function OtpPage({ otpID }) {
  const [otp, setOtp] = useState('');
  const [time, setTime] = useState(80);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const btnDisable = (otp.length === 5 || otp.length === 6) ? '' : 'disabled';

  //otp time counting
  useEffect(() => {
    const otpTime = setInterval(() => {
      setTime(pev => pev -= 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(otpTime);
    }, 80000);
  },[]);

  //data post the server
  async function handleSubmit() {
    const otpData = {
      otp: otp,
      otpId: otpID
    };
    setLoading(false);
    await axios.post('/api/auth/resOTP', otpData)
    .then((res) => {
      alert(res.data.message);
      router.push('/authentication');
    }).catch((error) => {
      alert(error.response.data.error);
    });
    setLoading(true);
  };

  return (
    <div className="mt-5 row justify-content-center">
      <div className="card shadow p-3 mb-5 bg-body-tertiary rounded " style={{width: '350px'}}>
        <div className="card-body text-center">
          <h1 className="mb-3"><i className="bi bi-shield-lock-fill" /></h1>
          <h2 className="card-title">Send OTP Your Mail</h2>
          <div className="mb-1">{otpID}</div>
          <div className="mb-1 text-danger">{time<=0 ? 'Time Out' : time}</div>
            <div>
              <input 
                onChange={(e) => setOtp(e.target.value)}
                type="password" 
                placeholder="Enter OTP"
                maxLength={6} 
                className="form-control mb-3 text-center fw-light fs-6" 
              />
              {
                loading ?
                  <button type="button" 
                    onClick={handleSubmit}
                    className={`btn btn-dark form-control ${btnDisable}`}
                    >Verify OTP
                  </button>
                :
                  <button className="btn btn-dark disabled" type="button">
                    <span className="spinner-border spinner-border-sm me-2" />
                    Verifying...
                  </button>
              }
            </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { otpId } = params;
  return {
    props: {
      otpID: otpId
    }
  };
};