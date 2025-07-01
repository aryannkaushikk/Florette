import FAQItem from "./FAQItem";
import colorTheme from "../themes/colorTheme";

export default function FAQBox({ faqData, color, page }) {
  const theme = colorTheme[color];

  return (
    <div className={`space-y-4 ${!page && "rounded-lg"}`}>
      {faqData.map((item, index) => (
        <FAQItem
          key={index}
          question={item.question}
          answer={item.answer}
          color={color}
        />
      ))}
    </div>
  );
}
