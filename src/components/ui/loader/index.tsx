// src/components/ui/loader.tsx
interface LoaderProps {
  variant?: "full-page" | "container" | "inline";
  text?: string;
}

export default function Loader({ variant = "container", text }: LoaderProps) {
  // Clases base para el spinner
  const spinnerClasses = "animate-spin rounded-full border-t-4 border-b-4 border-jasmine mx-auto";
  const sizeClasses = variant === "inline" ? "h-6 w-6" : "h-12 w-12";

  if (variant === "full-page") {
    return (
      <div className="fixed inset-0 z-[9999] bg-oxford flex flex-col items-center justify-center">
        <div className={spinnerClasses + " h-16 w-16"}></div>
        {text && <p className="text-jasmine mt-4 animate-pulse">{text}</p>}
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center ${variant === "container" ? "h-full min-h-[200px]" : "h-auto"}`}>
      <div className={spinnerClasses + " " + sizeClasses}></div>
      {text && <p className="text-white/60 text-sm mt-2">{text}</p>}
    </div>
  );
}