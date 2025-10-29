
import FeaturesCard from "@/components/ui/cards/featuresCard";
import SignUpButton from "@/components/ui/signUpButton";
import * as FaIcons from "react-icons/fa";
import { FEATURES } from "./contants";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col items-center w-full px-4 gap-16">
      <div className="flex flex-col items-center gap-6 max-w-2xl w-full text-center">
        <h1 className="text-preset-1 text-oxford">
            The future of academic organization, today.
        </h1>
        <p className="text-preset-3 text-oxford">
            StelliumStudy helps you stay organized, focused, and motivated. Transform the way you study with visual and intuitive tools designed for your success.
        </p>
      </div>
      <div className="w-full max-w-6xl gap-6 flex flex-col">
        <h3 className="text-preset-2 text-oxford text-center">
            Explore our key tools
        </h3>
        <div className="grid grid-cols-3 gap-6">
          {FEATURES.map((feature: typeof FEATURES[number]) => {
            const IconComponent = FaIcons[feature.icon as keyof typeof FaIcons];
            return (
              <FeaturesCard
                key={feature.title}
                icon={
                  IconComponent ? (
                    <IconComponent size={28} className="text-vermilion" />
                  ) : null
                }
                title={feature.title}
                description={feature.description}
              />
            );
          })}
        </div>
      </div>
      <div className="flex flex-col items-center gap-6 max-w-2xl text-center">
        <h2 className="text-preset-2 text-oxford text-center">
          Are you ready to elevate your study experience?
        </h2>
        <p className="text-preset-3 text-oxford">
            Join us today and start your journey towards academic success with StelliumStudy.
        </p>
        <SignUpButton />
      </div>
    </div>
  );
}