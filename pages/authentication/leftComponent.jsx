import Image from "next/image";
import img from "../../public/authentication.png";

export default function LeftComponent() {
  return (
    <div className="col-lg-7 col-md-6 col-sm-12 d-none d-sm-grid mb-5">
      <div>
        <h1>Join Our <br/> Community</h1>
        <p className="fw-lighter">Login and try our authentication system.</p>
      </div>
      <Image src={img} 
        priority
        className="img-fluid" 
        alt="auth" 
        width={550}
        height={550}
      />
    </div>
  );
};
