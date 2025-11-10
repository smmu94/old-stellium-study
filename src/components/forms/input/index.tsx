"use client";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { InputProps } from "./types";

export default function Input({
  label,
  placeholder = "",
  name,
  type = "text",
  value,
  onChange,
  error,
  disabled = false,
  loading = false,
  as = "input",
}: InputProps) {
  const inputClass = `w-full border border-solid rounded-md px-3 py-2 text-preset-4 text-oxford focus:outline-none transition ${error ? "border-red-500" : ""} ${!error ? "border-platinum" : ""} ${disabled || loading ? "bg-gray-100 cursor-not-allowed" : ""}`;
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="relative">
      <label className="block text-preset-4 text-oxford mb-1" htmlFor={name}>{label}</label>
      {as === "textarea" ? (
        <textarea
          name={name}
          id={name}
          value={value ?? ""}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={inputClass + " h-24 resize-none"}
        />
      ) : (
        <>
          <input
            type={isPassword && show ? "text" : type}
            name={name}
            id={name}
            value={value ?? ""}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled || loading}
            className={inputClass}
          />
          {isPassword && (
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-7 text-xl text-gray-400"
              onClick={() => setShow((v) => !v)}
            >
              {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          )}
        </>
      )}
      <span className={`block text-xs min-h-5 mt-1 ${error ? "text-red-500" : "text-transparent"}`}>
        {error || "\u00A0"}
      </span>
    </div>
  );
}