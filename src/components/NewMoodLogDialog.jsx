import { useState } from "react";

export default function NewMoodLogDialog({ open, onClose, onSave }) {
  const [mood, setMood] = useState("😊");
  const [tags, setTags] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      mood,
      tags: tags
        .split(",")
        .map((t) => {
          const normalized = t.trim().toLowerCase();
          return normalized.charAt(0).toUpperCase() + normalized.slice(1);
        })
        .filter(Boolean),
      note,
      date: new Date().toLocaleDateString("en-GB"), // DD/MM/YYYY
    };
    onSave(newLog);
    setMood("😊");
    setTags("");
    setNote("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-[90%] max-w-md space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">New Mood Log</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Mood Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mood
            </label>
            <select
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            >
              <option value="😊">😊 Happy</option>
              <option value="😔">😔 Sad</option>
              <option value="😡">😡 Angry</option>
              <option value="😐">😐 Neutral</option>
              <option value="😭">😭 Crying</option>
              <option value="🤩">🤩 Excited</option>
            </select>
          </div>

          {/* Tags */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. tired, exams, social"
              className="w-full mt-1 border border-gray-300 rounded-lg p-2"
            />
          </div>

          {/* Note */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Note
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={4}
              className="w-full mt-1 border border-gray-300 rounded-lg p-2"
              placeholder="Write about how you’re feeling..."
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg"
            >
              Save Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
