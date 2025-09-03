import React, { createContext, useContext, useReducer, useCallback } from 'react';
import axios from 'axios';

const NotesContext = createContext();

const notesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true };
    case 'SET_NOTES':
      return { loading: false, notes: action.payload, error: null };
    case 'ADD_NOTE':
      return { ...state, notes: [action.payload, ...state.notes] };
    case 'UPDATE_NOTE':
      return {
        ...state,
        notes: state.notes.map(note =>
          note._id === action.payload._id ? action.payload : note
        ),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter(note => note._id !== action.payload),
      };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

const initialState = {
  notes: [],
  loading: false,
  error: null,
};

export const NotesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notesReducer, initialState);

 
  const getNotes = useCallback(async () => {
    dispatch({ type: 'SET_LOADING' });
    try {
      const response = await axios.get('/api/notes');
      dispatch({ type: 'SET_NOTES', payload: response.data });
    } catch (error) {
      const message = error.response?.data?.message || 'Error fetching notes';
      dispatch({ type: 'SET_ERROR', payload: message });
    }
  }, []);

  const createNote = useCallback(async (noteData) => {
    try {
      const response = await axios.post('/api/notes', noteData);
      dispatch({ type: 'ADD_NOTE', payload: response.data });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Error creating note';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  }, []);

  const updateNote = useCallback(async (id, noteData) => {
    try {
      const response = await axios.put(`/api/notes/${id}`, noteData);
      dispatch({ type: 'UPDATE_NOTE', payload: response.data });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Error updating note';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  }, []);

  const deleteNote = useCallback(async (id) => {
    try {
      await axios.delete(`/api/notes/${id}`);
      dispatch({ type: 'DELETE_NOTE', payload: id });
    } catch (error) {
      const message = error.response?.data?.message || 'Error deleting note';
      dispatch({ type: 'SET_ERROR', payload: message });
      throw error;
    }
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes: state.notes,
        loading: state.loading,
        error: state.error,
        getNotes,
        createNote,
        updateNote,
        deleteNote,
        clearError,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error('useNotes must be used within a NotesProvider');
  }
  return context;
};
