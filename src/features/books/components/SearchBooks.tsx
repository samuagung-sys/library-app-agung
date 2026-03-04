import { useState } from "react";

type Props = {
  onSearch: (value: string) => void;
};

export default function SearchBooks({ onSearch }: Props) {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setValue(text);
    onSearch(text);
  };

  const clearSearch = () => {
    setValue("");
    onSearch("");
  };

  return (
    <div className="flex gap-2 w-full">
      <input
        type="text"
        placeholder="Search books..."
        value={value}
        onChange={handleChange}
        className="border rounded-lg px-3 py-2 w-full"
      />

      {value && (
        <button
          onClick={clearSearch}
          className="px-3 py-2 bg-gray-200 rounded-lg"
        >
          Clear
        </button>
      )}
    </div>
  );
}