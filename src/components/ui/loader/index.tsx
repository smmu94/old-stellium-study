import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loader() {
  return (
    <div className="flex h-screen items-center justify-center">
      <AiOutlineLoading3Quarters className="animate-spin h-15 w-15 text-jasmine" />
    </div>
  );
}