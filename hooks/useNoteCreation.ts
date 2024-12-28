"use client";

import { useState } from 'react';

export const useNoteCreation = (onNoteCreated: (content: string, title: string) => void) => {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onNoteCreated(content, title);
      setContent('');
      setTitle('');
    }
  };

  return { content, setContent, title, setTitle, handleSubmit };
};