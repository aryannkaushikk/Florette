import { useState } from "react";
import { Tag } from "lucide-react";
import tagMeta from "../data/tagMeta";
import colorTheme from "../themes/colorTheme";
import { useSubmitTip } from "../hooks/useSubmitTip";

export default function PostTipForm({ color = "rose" }) {
  const baseTheme = colorTheme[color];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTag, setSelectedTag] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim() || !selectedTag) return;
    if (onSubmit) {
      onSubmit({ title, description, tag: selectedTag });
    }
    setTitle("");
    setDescription("");
    setSelectedTag(null);
    setShowDropdown(false);
  };

  const handleTagSelect = (tag) => {
    setSelectedTag(tag);
    setShowDropdown(false);
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setSelectedTag(null);
    setShowDropdown(false);
  };

  const { mutate, isPending, isError, error } = useSubmitTip();

  const onSubmit = ({ title, description, tag }) => {
    if (!title || !description) return;
    mutate({ title, description, tag }, { onSuccess: () => reset() });
  };

  const tagColor = selectedTag
    ? colorTheme[tagMeta[selectedTag].color]
    : baseTheme;
  const labelText = selectedTag || "Label";

  return (
    <div className="relative right-1 w-full bg-white rounded-xl shadow-md py-3 px-6 space-y-4 ">
      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-lg font-semibold placeholder-gray-500 focus:outline-none"
      />

      {/* Description */}
      <textarea
        placeholder="Write a description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={1}
        className="w-full text-gray-700 placeholder-gray-400 resize-none border-none focus:ring-0 focus:outline-none"
      />

      {/* Footer row with Label and Create */}
      <div className="flex items-center justify-between border-t border-gray-200 relative">
        {/* Label Button */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm transition ${tagColor.bg} ${tagColor.textDark}`}
          >
            <Tag className="w-4 h-4" />
            {labelText}
          </button>

          {showDropdown && (
            <div className="absolute z-10 bottom-full mb-2 left-0 bg-white shadow-lg rounded-md overflow-hidden max-h-64 overflow-y-auto border border-gray-200">
              {Object.keys(tagMeta).map((tag) => {
                const tagTheme = colorTheme[tagMeta[tag].color];
                return (
                  <button
                    key={tag}
                    onClick={() => handleTagSelect(tag)}
                    className={`flex items-center gap-2 px-4 py-2 w-full text-left ${tagTheme.hover} ${tagTheme.text} ${tagTheme.hoverText}`}
                  >
                    <span className={`text-sm`}>{tag}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Create Button */}
        <button
          onClick={handleSubmit}
          className={`px-4 py-2 rounded-md font-medium ${baseTheme.buttonBg} ${baseTheme.buttonText} ${baseTheme.buttonHover} transition`}
        >
          {isPending ? "Creating..." : "Create"}
        </button>

        {isError && (
          <p className="text-sm text-red-600 mt-2">{error.message}</p>
        )}
      </div>
    </div>
  );
}
