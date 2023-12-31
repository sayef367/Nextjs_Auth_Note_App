import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";

export default function Reset({ user }) {
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [cPassword, setCpassword] = useState('');
  const router = useRouter();

  //password post submit data
  async function resetHandel() {
    if(!password || !cPassword) return alert('Password input field empty!');
    if(password.length < 8) return alert('Password Must be use 8 characters!');
    setLoading(false);
    if(password === cPassword) {
      const passRegisterData = {
        id: user,
        password: password
      };
      await axios.put('/api/auth/forgot/password', passRegisterData)
      .then((res) => {
        alert(res.data.message);
        router.push('/');
      }).catch((error) => {
        alert(error.response.data.error);
      });
    } else {
      alert('Password is not matched!');
    };
    setLoading(true);
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-md-center">
        <div className="col-lg-5 col-md-8 col-sm-12">
          <div className="text-center">
            <i className="bi bi-shield-lock-fill fs-1 border rounded-4 p-2" />
            <h2 className="mt-4">Set new password</h2>
            <p className="text-secondary">Must be at least 8 characters.</p>
          </div>
          <div className="mb-3 mt-4">
            <label  className="form-label">New password</label>
            <input type="password" 
              onChange={(e) => setPassword(e.target.value)}
              className="form-control" 
              placeholder="******"
              minLength={8}
            />
          </div>
          <div className="mb-3 mt-4">
            <label  className="form-label">Confirm password</label>
            <input type="password" 
              onChange={(e) => setCpassword(e.target.value)}
              className="form-control" 
              placeholder="******"
              minLength={8}
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
                Resetting...
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps({req}) {
  const session = await getSession({ req });
  if(!session) {
    return {
      redirect: {
        destination: '/authentication',
        permeanent: false
      }
    };
  };
  return {
    props: {
      session,
      user: session.user.sub
    }
  };
};