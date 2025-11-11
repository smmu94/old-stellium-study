export default function Loader() {
  return (
    <div className="flex items-center justify-center h-screen bg-oxford">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-jasmine mx-auto mb-4"></div>
        <p className="text-white text-preset-3">Loading...</p>
      </div>
    </div>
  );
}