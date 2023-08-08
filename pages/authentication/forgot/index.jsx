import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function Forgot() {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const router = useRouter();
  
  async function resetHandel() {
    const otpId = { email: email };
    if(!email) {
      alert('input field empty!');
    } else {
      setLoading(false);
      await axios.post('/api/auth/forgot/postForgot', otpId)
      .then((res) => {
        alert(res.data.message);
        router.push(`/authentication/forgot/${email}`);
      }).catch((error) => {
        if(error.response.data.error === undefined){
          alert('Please enter valid email id');
        } else {
          alert(error.response.data.error);
        }
      });
      setLoading(true);
    };
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-md-center">
        <div className="col-lg-5 col-md-8 col-sm-12">
          <div className="text-center">
            <i className="bi bi-fingerprint fs-1 border rounded-4 p-2" />
            <h2 className="mt-4">Forgot password?</h2>
            <p className="text-secondary">No worries, we'll send you reset instructions.</p>
          </div>
          <div className="mb-3 mt-4">
            <label  className="form-label">Email</label>
            <input type="email" 
              onChange={(e) => setEmail(e.target.value)}
              className="form-control" 
              placeholder="Enter your email" 
              required
            />
          </div>
          <div className="d-grid gap-2 mt-4">
            {
              loading ?
              <button type="submit" 
                onClick={resetHandel}
                className='btn btn-dark' >
                Reset password
              </button>
              :
              <button className="btn btn-dark disabled" type="button">
                <span className="spinner-border spinner-border-sm me-2" />
                Searching...
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
