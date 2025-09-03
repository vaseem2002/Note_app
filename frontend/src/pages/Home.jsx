import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNotes } from '../context/NotesContext';
import NoteForm from '../components/NoteForm';
import NoteList from '../components/NoteList';
import Modal from '../components/Modal';

const Home = () => {
  const { user } = useAuth();
  const { notes, loading, error, getNotes, createNote, updateNote, deleteNote, clearError } = useNotes();
  
  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    if (user) {
      getNotes();
    }
  }, [user, getNotes]);

  useEffect(() => {
    if (error) {
      alert(error);
      clearError();
    }
  }, [error, clearError]);

  const handleCreateNote = async (noteData) => {
    try {
      await createNote(noteData);
      setShowModal(false);
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  const handleUpdateNote = async (noteData) => {
    try {
      await updateNote(editingNote._id, noteData);
      setEditingNote(null);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id);
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNote(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Notes App</h1>
          <p className="text-lg text-gray-600">Please login or register to start creating notes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Note
        </button>
      </div>

      <NoteList
        notes={notes}
        onEdit={handleEditNote}
        onDelete={handleDeleteNote}
        loading={loading}
      />

      {showModal && (
        <Modal onClose={handleCloseModal} title={editingNote ? 'Edit Note' : 'Create Note'}>
          <NoteForm
            onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
            initialData={editingNote || {}}
            loading={loading}
          />
        </Modal>
      )}
    </div>
  );
};

export default Home;