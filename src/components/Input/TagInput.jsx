import React, { useState } from 'react';
import { MdAdd, MdClose } from 'react-icons/md';

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    const newTag = inputValue.trim();
    if (newTag !== "" && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addNewTag();
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mt-3">
      {/* Tag display */}
      {tags?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span key={index} className="flex items-center gap-1 text-sm px-2 py-1 bg-slate-100 rounded">
              #{tag}
              <button onClick={() => handleRemoveTag(tag)} className="text-slate-500 hover:text-red-500">
                <MdClose size={16} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="flex items-center gap-3 mt-3">
        <input
          type="text"
         
          className="text-sm bg-transparent border border-slate-300 px-3 py-2 rounded outline-none w-full"
          placeholder="Add Tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          onClick={addNewTag}
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
        >
          <MdAdd className="text-xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
