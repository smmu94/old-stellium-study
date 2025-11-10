import { InfoCardProps } from "./types";

export default function InfoCard({ title, description, icon, cardClassName }: InfoCardProps) {
  return (
    <div className="p-6 rounded-lg shadow bg-jasmine hover:transform hover:scale-105 transition-transform flex flex-col gap-2 items-center text-center w-xs">
      {icon}
      <h3 className="text-preset-3-bolder text-oxford">{title}</h3>
      <p className="text-oxford">{description}</p>
    </div>
  );
}
