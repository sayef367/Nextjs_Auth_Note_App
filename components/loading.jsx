import Image from "next/image";
import LoadingSvg from "../public/DoubleRing1-4s-200px.svg";

export default function Loading() {
  return (
    <div className="text-center mt-5 mb-5">
      <Image 
        priority
        src={LoadingSvg}
        alt="svg"
      />
    </div>
  );
};
