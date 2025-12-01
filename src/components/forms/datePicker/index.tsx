"use client";
import DatePickerBase from "react-datepicker";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { DatePickerProps } from "./types";

export default function DatePicker({
  label,
  selected,
  onChange,
  placeholder = "Select a Date",
  name,
  minDate,
  maxDate,
  disabled = false,
  loading = false,
  error,
}: DatePickerProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="block text-preset-4-bolder text-oxford mb-3" htmlFor={name}>
        {label}
      </label>
      <DatePickerBase
        selected={selected}
        onChange={onChange}
        placeholderText={placeholder}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        dateFormat="MM/dd/yyyy"
        isClearable
        popperPlacement="bottom-end"
        className={`w-full border border-solid rounded-md px-3 py-2 text-preset-4 text-oxford focus:outline-none transition ${error ? "border-red-500" : ""} ${!error ? "border-platinum" : ""} ${disabled || loading ? "bg-gray-100 cursor-not-allowed" : ""} cursor-pointer`}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <div className="flex justify-between items-center px-3 py-2 bg-oxford text-white">
            <button
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
              className="text-white hover:text-jasmine cursor-pointer"
            >
              <FaChevronLeft />
            </button>
            <span className="text-preset-4-bolder">
              {date.toLocaleString("en-US", { month: "long", year: "numeric" })}
            </span>
            <button
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
              className="text-white hover:text-jasmine cursor-pointer"
            >
              <FaChevronRight />
            </button>
          </div>
        )}
      />
      <span className={`block text-xs min-h-5 mt-1 ${error ? "text-red-500" : "text-transparent"}`}>
        {error || "\u00A0"}
      </span>
    </div>
  );
};