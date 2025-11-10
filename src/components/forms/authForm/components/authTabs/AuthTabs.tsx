interface AuthTabsProps {
  isSignIn: boolean;
  setIsSignIn: (value: boolean) => void;
}

export default function AuthTabs({ isSignIn, setIsSignIn }: AuthTabsProps) {
  return (
    <div className="flex bg-gray-100 rounded-lg w-full">
      <button
        type="button"
        className={`flex-1 py-2 rounded-lg text-preset-4-bolder transition-all text-oxford ${isSignIn ? "bg-white shadow" : ""} cursor-pointer`}
        onClick={() => setIsSignIn(true)}
      >
        Sign In
      </button>
      <button
        type="button"
        className={`flex-1 py-2 rounded-lg text-preset-4-bolder transition-all text-oxford ${!isSignIn ? "bg-white shadow" : ""} cursor-pointer`}
        onClick={() => setIsSignIn(false)}
      >
        Sign Up
      </button>
    </div>
  );
}
