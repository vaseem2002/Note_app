import React, { useState } from 'react';

const NoteItem = ({ note, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleEdit = () => {
    onEdit(note);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    // Add a slight delay to show the animation
    setTimeout(() => {
      if (window.confirm('Are you sure you want to delete this note?')) {
        onDelete(note._id);
      } else {
        setIsDeleting(false);
      }
    }, 300);
  };

  // Format date to be more readable
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 transform hover:shadow-lg hover:-translate-y-1 ${isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <div className="p-6 border-l-4 border-indigo-500">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 truncate max-w-[70%]">
            {note.title}
          </h3>
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
            {formatDate(note.updatedAt)}
          </span>
        </div>
        
        <p className="text-gray-600 mb-4 whitespace-pre-wrap line-clamp-3">
          {note.content}
        </p>
        
        <div className="flex justify-between items-center pt-3 border-t border-gray-100">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Updated {formatDate(note.updatedAt)}</span>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={handleEdit}
              className="flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium px-3 py-2 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
              aria-label="Edit note"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex items-center text-red-600 hover:text-red-800 text-sm font-medium px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
              aria-label="Delete note"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default NoteItem;