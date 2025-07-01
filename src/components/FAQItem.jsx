import { useState } from "react";
import colorTheme from "../themes/colorTheme";

export default function FAQItem({ question, answer, color }) {
  const theme = colorTheme[color];

  const [isOpen, setIsOpen] = useState(false);

  function toggleFAQ() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={`border-2 ${theme.text} rounded-md mb-4 overflow-hidden`}>
      <button
        onClick={toggleFAQ}
        className="bg-white flex justify-between items-center w-full p-4 rounded-sm"
      >
        <span className={`${theme.text}`}>{question}</span>

        <span className="relative w-6 h-6 inline-block">
          <span
            className={`absolute inset-0 transition-all duration-300 ${
              isOpen ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
            }`}
          >
            +
          </span>
          <span
            className={`absolute inset-0 transition-all duration-300 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          >
            –
          </span>
        </span>
      </button>

      <div
        className={`transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-40 opacity-100 p-4" : "max-h-0 opacity-0 p-0"
        } ${theme.buttonBg} rounded-sm`}
      >
        <p className={`${theme.buttonText}`}>{answer}</p>
      </div>
    </div>
  );
}
