import Link from "next/link";
import LeftComponent from "./leftComponent";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  });
  const passLen = register.password.length;

  //signUp user account
  async function handleSubmit() {
    if(!register.name || !register.email) {
      alert('input field empty!');
    } else if (register.password !== register.cPassword) {
      alert('Password is not matched!');
    } else if (passLen < 6) {
      alert('Please type strong password!');
    } else {
      const registerData = {
        name: register.name,
        email: register.email,
        password: register.password
      };
      setLoading(false);
      await axios.post('/api/auth/sendOTP', registerData)
      .then((res) => {
        alert(res.data.message);
        router.push(`/authentication/${register.email}`);
      }).catch((error) => {
        if(error.response.data.error === undefined){
          alert('Please enter valid email id');
        } else {
          alert(error.response.data.error);
        }
      });
      setLoading(true);
    }
  };
  //Google SignUp
  async function handelGoogleSignin() {
    signIn('google', { callbackUrl: "/" });
  };
  //Github SignUp
  async function handelGithubSignin() {
    signIn('github', { callbackUrl: "/" });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <LeftComponent />

        <div className="col-lg-5 col-md-6 col-sm-12 align-self-center">
          <h2 className="text-center mb-5">Create your account</h2>
          <div>
            <div className="input-group input-group-lg mb-4">
              <input type="text" 
                onChange={(e) => setRegister({...register, name: e.target.value})}
                className="form-control fw-light fs-6" 
                placeholder="Enter your full name"
              />
            </div>
            <div className="input-group input-group-lg mb-4">
              <input type="email" 
                onChange={(e) => setRegister({...register, email: e.target.value})}
                className="form-control fw-light fs-6" 
                placeholder="Enter your email address"
              />
            </div>
            <div className="input-group input-group-lg mb-4">
              <input type="password" 
                onChange={(e) => setRegister({...register, password: e.target.value})}
                className="form-control fw-light fs-6" 
                placeholder="Password"
              />
            </div>
            <div className="input-group input-group-lg mb-4">
              <input type="password" 
                onChange={(e) => setRegister({...register, cPassword: e.target.value})}
                className="form-control fw-light fs-6" 
                placeholder="Confirm Password"
              />
            </div>
            <div className="d-grid gap-2">
              {
                loading ?
                  <button type="submit" onClick={handleSubmit} 
                    className="btn btn-dark" >Sign Up
                  </button>
                :
                  <button className="btn btn-dark disabled" type="button">
                    <span className="spinner-border spinner-border-sm me-2" />
                    Loading...
                  </button>
              }
            </div>
          </div>
          <p className="text-center fw-light mt-5 mb-5">--- Or continue with ---</p>
          <div className="text-center">
            <button type="button" 
              onClick={handelGoogleSignin}
              className="btn btn-outline-danger me-3 ps-4 pe-4">
              <i className="bi bi-google" /> Google
            </button>
            <button type="button" 
            onClick={handelGithubSignin}
              className="btn btn-outline-dark ps-4 pe-4">
              <i className="bi bi-github" /> GitHub
            </button>
          </div>
          <p className="text-center fw-light mt-4">
            You have an account ? <Link 
              className="link-underline link-underline-opacity-0" 
              href='/authentication'>
            Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};