import colorTheme from "../themes/colorTheme";
import tagMeta from "../data/tagMeta";
import { format, parseISO } from "date-fns";

export default function TipCard({ tip }) {
  const { tag = "Tips", title, content, date_posted } = tip;
  const { color, icon: Icon } = tagMeta[tag] || tagMeta["Tips"];
  const theme = colorTheme[color] || colorTheme["rose"];

  const formattedDate = date_posted
    ? format(parseISO(date_posted), "MMM d, yyyy")
    : "Unknown";

  return (
    <div
      className={`flex flex-col space-y-2 border-l-[6px] ${theme.borderLight} w-full p-3 rounded-xl bg-white hover:shadow-md transition`}
    >
      {/* Tag + Date */}
      <div className="flex justify-between items-center">
        <span
          className={`flex items-center gap-1 text-sm font-semibold px-2 py-1 rounded ${theme.bg} ${theme.text}`}
        >
          <Icon className={`w-4 h-4 ${theme.icon}`} />
          {tag}
        </span>
        <span className="text-sm text-gray-400">{formattedDate}</span>
      </div>

      {/* Title */}
      <div className={`font-bold text-lg ${theme.text}`}>{title}</div>

      {/* Content */}
      <div className={`${theme.text}`}>{content}</div>
    </div>
  );
}
