import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// Extended color palette (20+ distinct hues)
const tagColors = [
  "#be123c",
  "#db2777",
  "#e11d48",
  "#ec4899",
  "#f43f5e",
  "#f87171",
  "#fb7185",
  "#fda4af",
  "#fecdd3",
  "#ffe4e6",
  "#a855f7",
  "#d946ef",
  "#c084fc",
  "#818cf8",
  "#6366f1",
  "#60a5fa",
  "#38bdf8",
  "#22d3ee",
  "#06b6d4",
  "#0ea5e9",
];

const roseShades = [
  "#f43f5e",
  "#fb7185",
  "#fda4af",
  "#fecdd3",
  "#ffe4e6",
  "#f87171",
];

export default function MoodCharts({ logs }) {
  const moodCounts = logs.reduce((acc, log) => {
    acc[log.mood] = (acc[log.mood] || 0) + 1;
    return acc;
  }, {});
  const moodData = Object.entries(moodCounts).map(([mood, count]) => ({
    name: mood,
    value: count,
  }));

  const dateCounts = logs.reduce((acc, log) => {
    acc[log.date] = (acc[log.date] || 0) + 1;
    return acc;
  }, {});
  const dateData = Object.entries(dateCounts).map(([date, count]) => ({
    date,
    count,
  }));

  const tagCounts = logs.reduce((acc, log) => {
    log.tags.forEach((tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
    });
    return acc;
  }, {});
  const tagData = Object.entries(tagCounts).map(([tag, count]) => ({
    name: tag,
    value: count,
  }));

  return (
    <div className="space-y-6">
      {/* Pie Charts Side-by-Side */}
      <div className="flex gap-4">
        {/* Mood Pie */}
        <div className="w-1/2">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">
            Mood Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={moodData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {moodData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={roseShades[index % roseShades.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tag Pie */}
        <div className="w-1/2">
          <h2 className="text-lg font-semibold text-gray-700 mb-1">
            Tag Distribution
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tagData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  label
                >
                  {tagData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={tagColors[index % tagColors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-gray-700">Logs per Day</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dateData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#be123c" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
