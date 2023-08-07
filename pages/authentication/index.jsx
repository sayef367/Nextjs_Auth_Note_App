import Link from "next/link";
import LeftComponent from "./leftComponent";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function AuthPage() {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  //User ID Login
  async function loginInfo() {
    if (!values.email || !values.password) {
      alert('input field empty!'); //input validation
    } else {
      setLoading(false);
      //send data nextauth
      const status = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: "/"
      });
      if(status.error) alert(status.error); //show all error
      if(status.ok) router.push(status.url); //if true then login
      setLoading(true);
    };
  };
  //Google Login
  async function handelGoogleSignin() {
    signIn('google', { callbackUrl: "/" });
  };
  //Github Login
  async function handelGithubSignin() {
    signIn('github', { callbackUrl: "/" });
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row">
        <LeftComponent />

        <div className="col-lg-5 col-md-6 col-sm-12 align-self-center">
          <h2 className="text-center mb-5">Hello ! Welcome Back</h2>
          <div>
            <div className="input-group input-group-lg mb-4">
              <input 
                onChange={(e) => setValues({...values, email: e.target.value})}
                type="email" 
                className="form-control fw-light fs-6" 
                placeholder="Enter your email address"
              />
            </div>
            <div className="input-group input-group-lg">
              <input 
                onChange={(e) => setValues({...values, password: e.target.value})}
                type={`${show ? "text" : "password"}`}
                className="form-control fw-light fs-6" 
                placeholder="Password"
              />
            </div>
            <div className="mt-2 row">
              <div className="col-6">
                <input onClick={() => setShow(!show)} className="form-check-input shadow-none" type="checkbox" />
                <label className="form-check-label fw-lighter ms-1">
                  {`${show ? "Hide password" : "Show password"}`}
                </label>
              </div>
            </div>
            <div className="d-grid gap-2 mt-4">
              {
                loading ?
                <button type="submit" 
                  onClick={loginInfo}
                  className='btn btn-dark' >
                  Log In
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
            Don't have an account ? <Link className="link-underline link-underline-opacity-0" 
              href='/authentication/signUp'>
            Create Account !</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
