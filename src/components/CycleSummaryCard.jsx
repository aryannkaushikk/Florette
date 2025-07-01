import {
  parseISO,
  differenceInDays,
  addDays,
  format,
  compareDesc,
} from "date-fns";

export default function CycleSummaryCard({ periodLogs }) {
  if (!Array.isArray(periodLogs) || periodLogs.length === 0) return null;

  // Sort logs by start_date descending
  const sortedLogs = [...periodLogs].sort((a, b) =>
    compareDesc(parseISO(a.start_date), parseISO(b.start_date))
  );
  const latest = sortedLogs[0];

  const start = parseISO(latest.start_date);
  const end = parseISO(latest.end_date);

  const cycleLength = 28;
  const nextStart = addDays(start, cycleLength);
  const nextEnd = addDays(end, cycleLength);
  const ovulationStart = addDays(start, 12);
  const ovulationEnd = addDays(start, 16);

  return (
    <div className="bg-rose-200 text-rose-900 p-4 rounded-xl shadow-md max-w-xl w-full mt-4 mx-auto">
      <h3 className="text-lg font-semibold mb-2">Cycle Summary</h3>
      <ul className="text-sm space-y-1">
        <li>
          🩸 <strong>Last Period:</strong> {format(start, "MMM d")} –{" "}
          {format(end, "MMM d")}
        </li>
        <li>
          📆 <strong>Cycle Length:</strong> {differenceInDays(end, start) + 1}{" "}
          days
        </li>
        <li>
          🔮 <strong>Next Predicted Period:</strong>{" "}
          {format(nextStart, "MMM d")} – {format(nextEnd, "MMM d")}
        </li>
        <li>
          🎯 <strong>Ovulation Window:</strong>{" "}
          {format(ovulationStart, "MMM d")} – {format(ovulationEnd, "MMM d")}
        </li>
      </ul>
    </div>
  );
}
