import { FeaturesCardProps } from "./types";

export default function FeaturesCard({ title, description, icon }: FeaturesCardProps) {
  return (
    <div className="p-6 rounded-lg shadow bg-jasmine hover:transform hover:scale-105 transition-transform flex flex-col gap-2 items-center text-center max-w-sm w-full">
      {icon}
      <h3 className="text-preset-3-bolder text-oxford">{title}</h3>
      <p className="text-oxford line-clamp-3">{description}</p>
    </div>
  );
}
