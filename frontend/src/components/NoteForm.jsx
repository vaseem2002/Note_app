import React, { useState, useEffect } from 'react';

const NoteForm = ({ onSubmit, initialData = {}, loading = false, onCancel }) => {
  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [characterCount, setCharacterCount] = useState(0);

  useEffect(() => {
    setCharacterCount(content.length);
  }, [content]);

  useEffect(() => {
    setTitle(initialData.title || '');
    setContent(initialData.content || '');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-4 px-6">
        <h2 className="text-xl font-semibold text-white">
          {initialData.title ? 'Edit Note' : 'Create New Note'}
        </h2>
        <p className="text-indigo-100 text-sm mt-1">
          {initialData.title ? 'Update your note details' : 'Add a new note to your collection'}
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="title">
              Title
            </label>
            <span className="text-xs text-gray-500">
              {title.length}/100
            </span>
          </div>
          <input
            id="title"
            type="text"
            placeholder="Add a descriptive title..."
            value={title}
            onChange={(e) => setTitle(e.target.value.slice(0, 100))}
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
            required
            maxLength={100}
          />
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium text-gray-700" htmlFor="content">
              Content
            </label>
            <span className={`text-xs ${characterCount > 1000 ? 'text-red-500' : 'text-gray-500'}`}>
              {characterCount}/1000
            </span>
          </div>
          <textarea
            id="content"
            placeholder="Write your thoughts here..."
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, 1000))}
            rows="6"
            className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out resize-none"
            required
            maxLength={1000}
          ></textarea>
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
          >
            Cancel
          </button>
          
          <button
            type="submit"
            disabled={loading || !title.trim() || !content.trim()}
            className="flex items-center justify-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150 ease-in-out"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {initialData.title ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {initialData.title ? 'Update Note' : 'Create Note'}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;