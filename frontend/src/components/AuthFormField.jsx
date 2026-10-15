import { useState } from "react";

export default function AuthFormField({
  label,
  id,
  type = "text",
  value,
  onChange,
  autoComplete,
  required = true,
  showPasswordToggle = false,
}) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const inputType =
    showPasswordToggle && passwordVisible ? "text" : type;

  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-slate-700">{label}</span>
      <span className="relative block">
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          required={required}
          className={`w-full rounded-lg border border-slate-300 py-2 text-slate-800 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 ${
            showPasswordToggle ? "pl-3 pr-11" : "px-3"
          }`}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setPasswordVisible((visible) => !visible)}
            aria-label={passwordVisible ? "Hide password" : "Show password"}
            aria-pressed={passwordVisible}
          >
            {passwordVisible ? (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 3l18 18M10.6 10.6a2 2 0 002.8 2.8" />
                <path d="M9.9 5.2A10.8 10.8 0 0112 5c5 0 8.5 4.2 9.5 7-.4 1.1-1.2 2.3-2.3 3.4M6.2 6.2C3.9 7.7 2.8 9.8 2.5 12c1 2.8 4.5 7 9.5 7 1 0 1.9-.2 2.7-.5" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        )}
      </span>
    </label>
  );
}
