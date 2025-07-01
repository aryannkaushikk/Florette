import Calendar from "react-calendar";
import { addDays, parseISO, isWithinInterval } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or any icons you use
import "../styles/calender.css";

export default function TrackerCalender({ periodLogs }) {
  const tileClassName = ({ date, view }) => {
    if (!Array.isArray(periodLogs) || view !== "month") return "";

    for (let log of periodLogs) {
      const start = parseISO(log.start_date);
      const end = parseISO(log.end_date);
      const predictedStart = addDays(start, 28);
      const predictedEnd = addDays(start, 33);

      if (isWithinInterval(date, { start, end })) return "period-date";
      if (isWithinInterval(date, { start: predictedStart, end: predictedEnd }))
        return "predicted-date";
    }

    return "";
  };

  return (
    <div className="bg-rose-100 py-3 rounded-2xl shadow-lg w-sm lg:w-md flex flex-col justify-center items-center">
      <h2 className="text-lg font-bold text-rose-900 mb-4">
        Your Cycle & Predictions
      </h2>

      <Calendar
        tileClassName={tileClassName}
        showNavigation={true}
        prevLabel={
          <ChevronLeft
            size={20}
            className="bg-rose-300 rounded-full text-rose-900"
          />
        }
        nextLabel={
          <ChevronRight
            size={20}
            className="bg-rose-300 rounded-full text-rose-900"
          />
        }
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
      />

      <div className="mt-4 text-xs flex gap-4">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-rose-400 rounded-full"></div>
          <span className="text-rose-800">Your Period</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 bg-rose-200 rounded-full border border-rose-400"></div>
          <span className="text-rose-800">Predicted</span>
        </div>
      </div>
    </div>
  );
}
