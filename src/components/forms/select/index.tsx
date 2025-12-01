import ReactSelect from "react-select";
import { SelectProps } from "./types";

export default function Select<T>({ 
  label, 
  name,
  options, 
  placeholder = "Select an option", 
  error, 
  value, 
  onChange,
  disabled = false,
  loading = false, 
}: SelectProps<T>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="block text-preset-4-bolder text-oxford mb-3" htmlFor={name}>
        {label}
      </label>
      <ReactSelect
        id={name}
        name={name}
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        isDisabled={disabled || loading}
        isLoading={loading}
        isClearable
        styles={{
          control: (base) => ({
            ...base,
            height: "2.5rem",
            borderColor: error ? "#f04438" : "#e8e8e8",
            boxShadow: "none",
            borderRadius: "0.375rem",
            padding: "0.125rem",
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "0.875rem",
            fontWeight: 500,
            backgroundColor: disabled || loading ? "#f3f4f6" : "white",
            cursor: disabled || loading ? "not-allowed" : "pointer",
            "&:hover": {
              borderColor: "#e8e8e8",
            },
            "&:focus": {
              borderColor: "#0a0f29",
              outline: "none"
            },
          }),
          option: (base, state) => ({
            ...base,
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "0.875rem",
            fontWeight: 500,
            lineHeight: "1.4",
            backgroundColor: state.isSelected 
              ? "#0a0f29" 
              : state.isFocused 
                ? "#e8e8e8" 
                : "white",
            color: state.isSelected ? "white" : "#0a0f29",
            cursor: "pointer",
            "&:active": {
              backgroundColor: "#0a0f29",
              color: "white"
            },
          }),
          placeholder: (base) => ({
            ...base,
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#9ca3af",
          }),
          singleValue: (base) => ({
            ...base,
            fontFamily: "var(--font-space-grotesk)",
            fontSize: "0.875rem",
            fontWeight: 500,
            lineHeight: "1.4",
            color: "#0a0f29",
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "0.375rem",
            border: "1px solid #e8e8e8",
          }),
          menuList: (base) => ({
            ...base,
            padding: 0,
          }),
          clearIndicator: (base) => ({
            ...base,
            color: "#0a0f29",
          }),
          dropdownIndicator: (base) => ({
            ...base,
            color: "#0a0f29",
          }),
        }}
      />
      <span className={`block text-xs min-h-5 mt-1 ${error ? "text-red-500" : "text-transparent"}`}>
        {error || "\u00A0"}
      </span>
    </div>
  );
}