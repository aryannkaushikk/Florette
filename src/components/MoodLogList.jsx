import { Trash2 } from "lucide-react";

export default function MoodLogList({ logs, onDelete }) {
  if (logs.length === 0) {
    return (
      <p className="text-gray-500 mt-4">
        No mood logs yet. Add your first entry!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {logs.map((log) => (
        <div
          key={log.id}
          className="p-4 bg-white shadow rounded-xl border border-gray-200 relative flex justify-between items-center"
        >
          <div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{log.mood}</span>
              <div className="text-sm text-gray-700">
                <p className="font-semibold">
                  {log.tags
                    .map(
                      (tag) =>
                        tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
                    )
                    .join(", ")}
                </p>
                <p className="text-gray-500 text-xs">{log.date}</p>
              </div>
            </div>
            <p className="mt-2 text-gray-800">{log.note}</p>
          </div>

          <button
            onClick={() => onDelete(log.id)}
            className="text-rose-600 hover:text-rose-800"
            title="Delete log"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      ))}
    </div>
  );
}
