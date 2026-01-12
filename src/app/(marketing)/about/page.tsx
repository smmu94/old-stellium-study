
import InfoCard from "@/components/ui/cards/infoCard";
import SignUpButton from "@/components/ui/signUpButton";
import * as FaIcons from "react-icons/fa";
import { VALUES } from "./contants";

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center w-full px-4 gap-16">
      <div className="flex flex-col items-center gap-6 max-w-2xl w-full text-center">
        <h1 className="text-preset-1 text-oxford">
            Your Academic Universe, <span className="border-b-4 border-jasmine pb-1">Reimagined.</span>
        </h1>
        <p className="text-preset-3 text-oxford">
            StelliumStudy empowers students by making organization and study intuitive and engaging. We help you to organize, study, prepare, and stay up-to-date with all your academic needs.
        </p>
      </div>
      <div className="w-full max-w-6xl gap-6 flex flex-col">
        <h3 className="text-preset-2 text-oxford text-center">
          How StelliumStudy Helps You
        </h3>
        <div className="flex flex-wrap gap-6 justify-center">
          {VALUES.map((value: typeof VALUES[number]) => {
            const IconComponent = FaIcons[value.icon as keyof typeof FaIcons];
            return (
              <InfoCard
                key={value.title}
                icon={
                  IconComponent ? (
                    <IconComponent size={28} className="text-vermilion" />
                  ) : null
                }
                title={value.title}
                description={value.description}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 max-w-2xl text-center">
        <h2 className="text-preset-2 text-oxford text-center">
          Ready to flow?
        </h2>
        <p className="text-preset-3 text-oxford">
            Start your journey to academic excellence today.
        </p>
        <SignUpButton />
      </div>
    </div>
  );
}