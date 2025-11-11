import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import Image from "next/image";

export default function Avatar() {
  const { user } = useSelector((state: RootState) => state.auth);
  return (
    <div className="flex flex-col items-center gap-2 mb-6 pb-6">
      <div className="w-18 h-18 rounded-full bg-jasmine flex items-center justify-center overflow-hidden">
        {user?.photoURL ? (
          <Image
            className="rounded-full object-cover"
            src={user.photoURL}
            alt={user.displayName || "User avatar"}
            width={80}
            height={80}
            priority
          />
        ) : (
          <span className="text-3xl text-oxford font-bold">
            {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U"}
          </span>
        )}
      </div>
      <p className="text-preset-3-bolder text-white text-center">
        {user?.displayName || "User"}
      </p>
      <p className="text-preset-4 text-jasmine text-center">
        {user?.email}
      </p>
    </div>
  );
}