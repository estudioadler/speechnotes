import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { DropdownCard } from "@/components/DropdownCard/DropdownCard";
import { Button } from "../ui/button";
import { PushPin, PushPinSlash } from "@phosphor-icons/react";
import { ShareNoteDialog } from "../ShareNoteDialog/ShareNoteDialog";

interface Note {
  id: string;
  title: string;
  date: Date;
  content: string;
  pin: boolean;
  originalPosition: number;
}

interface NoteCardProps {
  note: Note;
  onNoteDeleted: (id: string) => void;
  onNotePinned: (id: string, pin: boolean) => void;
  onNoteEdited: (id: string, newTitle: string, newContent: string) => void;
  onNoteDuplicated: (note: Note) => void;
}

export const NoteCard = ({
  note,
  onNoteDeleted,
  onNotePinned,
  onNoteEdited,
  onNoteDuplicated,
}: NoteCardProps) => {
  const [pin, setPin] = useState(note.pin);

  const handlePinClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setPin(!pin);
    onNotePinned(note.id, !pin);
  };

  return (
    <div className="relative rounded-xl text-left bg-transparent p-6 flex flex-col gap-3 overflow-hidden outline outline-1 outline-neutral-300 dark:outline-neutral-800 cursor-pointer hover:outline-1 hover:outline-offset-0 hover:outline-neutral-500 dark:hover:outline-neutral-700 focus-visible:outline-1 focus-visible:outline-neutral-500 hover:transition-all duration-200">
      <div>
        <h3 className="text-lg font-semibold truncate max-w-44 w-full">{note.title}</h3>
        <span className="text-neutral-800 dark:text-neutral-300 text-xs font-medium">
          {formatDistanceToNow(note.date, { addSuffix: true, locale: ptBR })}
        </span>
      </div>

      <p
        className="text-muted-foreground text-sm leading-6 w-full break-words overflow-wrap overflow-hidden text-overflow-ellipsis"
        style={{
          maxWidth: "100%",
        }}
      >
        {note.content.substring(0, 250)}
        {note.content.length > 200 && "..."}
      </p>

      <div className="absolute right-2 top-2">
        <ShareNoteDialog noteId={note.id} />

        {pin ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePinClick}
            className="hover:bg-primary-foreground"
          >
            <PushPinSlash strokeWidth={1.25} className="size-4" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePinClick}
            className="hover:bg-primary-foreground group"
          >
            <PushPin
              strokeWidth={1.25}
              className="size-4 text-muted-foreground group-hover:text-primary"
            />
          </Button>
        )}
      </div>

      <DropdownCard
        note={note}
        onNoteDeleted={() => onNoteDeleted(note.id)}
        onNoteDuplicated={() => onNoteDuplicated(note)}
        onNoteEdited={onNoteEdited}
      />
    </div>
  );
};

