import NewNote from "@/pages/note/newNote";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import NavProfile from "./navProfile";

export default function Navbar() {
  const { data: session } = useSession();;
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand ps-2 pt-0 pb-0 fw-bold fs-3">
            <i className="bi bi-journals"/> My Notes
          </a>
          <button className="navbar-toggler collapsed" type="button" 
            data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" 
            aria-expanded="false" aria-label="Toggle navigation">
            <span className="toggler-icon top-bar"></span>
            <span className="toggler-icon middle-bar"></span>
            <span className="toggler-icon bottom-bar"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {
            session ? 
              <ul className="navbar-nav ms-auto fw-light">
                <li className="nav-item ms-3 me-3 pt-1 text-center mt-2" 
                data-bs-toggle="modal" data-bs-target="#exampleModalNewNote">
                  <i className="bi bi-pencil-square"/> Write Note
                </li>
                <NavProfile />
              </ul>
              : 
              <ul className="navbar-nav ms-auto fw-light">
                <li className="nav-item ms-2 me-2">
                  <Link className="nav-link" href="/authentication">
                    <button className="btn btn-dark btn-sm rounded-5 fw-light">
                      <i className="bi bi-box-arrow-right" /> Login
                    </button>
                  </Link>
                </li>
              </ul>
            }
          </div>
        </div>
      </nav>

      {/* add new note */}
      <NewNote />
    </div>
  );
};