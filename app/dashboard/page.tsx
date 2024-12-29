"use client";

import { useState } from "react";
import { NewNoteCard } from "@/components/NewNoteCard/NewNoteCard";
import { NoteCard } from "@/components/NoteCard/NoteCard";
import { toast } from "sonner";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { Header } from "../header";
import Footer from "../footer";
interface Note {
  id: string;
  title: string;
  date: Date;
  content: string;
  pin: boolean;
  originalPosition: number;
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [notes, setNotes] = useState<Note[]>(() => {
    if (typeof window !== "undefined") {
      const notesOnStorage = localStorage.getItem("notes");
      return notesOnStorage ? JSON.parse(notesOnStorage) : [];
    }
    return [];
  });

  const { data: session } = useSession();
  if (!session) return null;

  const onNoteCreated = (content: string, title: string = "") => {
    const newNote = {
      id: uuidv4(),
      title,
      date: new Date(),
      content,
      pin: false,
      originalPosition: notes.length,
    };

    const notesArray = [...notes, newNote];
    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    toast.success("Nota criada com sucesso!");
  };

  const onNoteDuplicated = (note: Note) => {
    const duplicatedNote = {
      ...note,
      id: uuidv4(),
      date: new Date(),
      originalPosition: notes.length,
    };
    const updatedNotes = [...notes, duplicatedNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    toast.success("Nota duplicada com sucesso!");
  };

  const onNoteEdited = (id: string, newTitle: string, newContent: string) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, title: newTitle, content: newContent } : note
    );

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    toast.success("Nota editada com sucesso!");
  };

  const onNoteDeleted = (id: string) => {
    const notesArray = notes.filter((note) => note.id !== id);
    setNotes(notesArray);
    localStorage.setItem("notes", JSON.stringify(notesArray));
    toast.success("Nota excluída com sucesso!");
  };

  const onNotePinned = (id: string, pin: boolean) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, pin } : note
    );

    const pinnedNotes = updatedNotes.filter((note) => note.pin);
    const unpinnedNotes = updatedNotes.filter((note) => !note.pin);

    pinnedNotes.sort((a, b) => a.originalPosition - b.originalPosition);
    unpinnedNotes.sort((a, b) => a.originalPosition - b.originalPosition);

    const sortedNotes = [...pinnedNotes, ...unpinnedNotes];
    setNotes(sortedNotes);
    localStorage.setItem("notes", JSON.stringify(sortedNotes));
  };

  const filteredNotes =
    search !== ""
      ? notes.filter(
          (note) =>
            note.content.toLowerCase().includes(search.toLowerCase()) ||
            note.title.toLowerCase().includes(search.toLowerCase())
        )
      : notes;

  return (
    <div className="h-screen">
    <Header />
    <main className="container mx-auto px-4 flex flex-col items-center justify-center pt-6 md:pt-12">
      <div className="flex flex-col items-center justify-center md:text-center py-8 w-full max-w-xl">
        <div className="px-4">
          <h1 className="text-4xl mb-4">
            Bem vindo! <span className="text-muted-foreground">{session?.user?.name}.</span>
          </h1>
          <p className="mb-8 text-muted-foreground max-w-md">
            Crie notas
            em <span className="text-primary">áudio</span> ou <span className="text-primary">texto</span> e organize-os com facilidade.
          </p>
        </div>
        <div className="flex items-center justify-center w-full relative">
          <SearchInput
            handleSearch={(e) => setSearch(e.target.value)}
            value={search}
          />
          <div className="absolute right-1.5">
            <NewNoteCard onNoteCreated={onNoteCreated} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 auto-rows-[250px] gap-4 w-full max-w-4xl">
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onNoteDeleted={onNoteDeleted}
            onNotePinned={onNotePinned}
            onNoteDuplicated={onNoteDuplicated}
            onNoteEdited={onNoteEdited}
          />
        ))}
      </div>
    </main>
    <Footer />
    </div>
  );
}