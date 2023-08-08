import { signOut } from "next-auth/react";
import NavImage from "./navImage";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";

export default function NavProfile() {
  const { data: session } = useSession();
  const [hidden, setHidden] = useState(false);

  // change_password hide and show
  useEffect(() => {
    const passDisabled = async () => {
      await axios.get('/api/passDisable', {
        params: {
          user: session.user.sub,
          email: session.user.email
        }
      }).then(function (res) {
        if(res.data.status === null) {
          setHidden(true)
        };
      });
    };
    passDisabled();
  },[]);

  return (
    <li className="nav-item dropdown-center ms-2">
      <button className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <NavImage width={30} height={30} />
      </button>
      <ul className="dropdown-menu dropdown-menu-lg-end">
        <div className="text-center ms-3 me-3 mt-2">
          <NavImage width={100} height={100} />
          <p className="fw-light mt-3">
            { session.user.name } 
            <br /> 
            { session.user.email }
          </p>
        </div>
        <hr />
        <li className="text-center">
          {
            hidden === true ?
            <Link 
              href={`/authentication/reset/${session.user.sub}`}
              className="dropdown-item fw-light"
              >Change password
            </Link>
            : ""
          }
        </li>
        <li className="nav-item ms-2 me-2 text-center mt-3">
          <button className="btn btn-dark btn-sm rounded-5 fw-light mb-2" onClick={() => signOut()}>
            <i className="bi bi-box-arrow-left" /> Logout
          </button>
        </li>
      </ul>
    </li>
  );
};
