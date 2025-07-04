import React from 'react';
import moment from 'moment';
import { MdOutlinePushPin, MdEdit, MdDelete } from "react-icons/md";

const NoteCard = ({ title, date, content, tags, isPinned, onEdit, onDelete, onPinNote }) => {
  const formattedDate = moment(new Date(date)).format("MMM D, YYYY");

  return (
    <div className="p-4 rounded border bg-white shadow-sm relative group hover:shadow-md transition">
      {/* Title + Pin */}
      <div className="flex items-start justify-between">
        <h6 className="text-sm font-medium text-slate-900">{title}</h6>
        <MdOutlinePushPin
          className={`text-xl cursor-pointer ${isPinned ? 'text-yellow-500' : 'text-slate-400'}`}
          onClick={onPinNote}
        />
      </div>

      {/* Date */}
      <span className="text-xs text-slate-500">{formattedDate}</span>

      {/* Content */}
      <p className="text-sm mt-2 text-slate-700">
        {content?.slice(0, 60)}
        {content?.length > 60 && '...'}
      </p>

      {/* Tags */}
      {tags && (
        <p className="text-xs mt-2 text-blue-500 font-medium">{tags}</p>
      )}

      {/* Edit & Delete buttons */}
      <div className="flex justify-end items-center gap-3 mt-4">
        <button
          className="flex items-center gap-1 text-sm text-blue-500 hover:underline cursor-pointer"
          onClick={onEdit}
        >
          <MdEdit className="text-base" /> Edit
        </button>
        <button
          className="flex items-center gap-1 text-sm text-red-500 hover:underline cursor-pointer"
          onClick={onDelete}
        >
          <MdDelete className="text-base" /> Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
