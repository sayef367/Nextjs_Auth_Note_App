import Image from "next/image";
import img from "../public/profileSVG.png";

export default function NavImage(props) {
  return (
    <Image 
      priority
      className="rounded-circle"
      src={img}
      alt="profile" 
      width={props.width} height={props.height}
    />
  );
};