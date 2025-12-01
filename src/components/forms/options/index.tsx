import { OptionsProps } from "./types";

export default function Options<T>({
  label,
  options,
  value,
  onChange,
  error,
}: OptionsProps<T>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-preset-4-bolder text-oxford">{label}</label>
      <div className={"flex flex-wrap w-full gap-2 justify-center"}>
        {options.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={String(option.value)}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                w-20 flex flex-col items-center gap-2 px-0 py-2 rounded-lg border-2 transition-all cursor-pointer
                ${
            isSelected
              ? "border-oxford bg-oxford/20"
              : "border-oxford/20 hover:border-oxford/40 hover:bg-oxford/20"
            }
              `}
            >
              <div className="flex items-center justify-center">
                {option.children}
              </div>
              <span className="text-preset-5 text-oxford text-center">
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
      <span className={`block text-xs min-h-5 mt-1 ${error ? "text-red-500" : "text-transparent"}`}>
        {error || "\u00A0"}
      </span>
    </div>
  );
}