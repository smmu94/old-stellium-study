import SignUpButton from "@/components/ui/signUpButton";

export default function HomePage() {

  return (
    <div className="flex flex-col justify-start items-center gap-16">
      <div className="flex flex-col gap-6 w-[70%] text-center items-center">
        <h1 className="text-preset-1 text-oxford">
          Organize your academic life in a fun and effective way
        </h1>
        <p className="text-preset-3 text-oxford">
          Stellium Study makes studying visually appealing and addictively organized.
          Start creating your schedule, adding notes, and tracking your progress today.
        </p>
        <SignUpButton />
      </div>
      <div className="relative aspect-video w-full max-w-4xl">
        <video
          className="absolute inset-0 w-full h-full rounded-lg shadow-xl bg-rose"
          controls
          poster="/images/education.jpg"
        >
          <source src="/video/education.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
