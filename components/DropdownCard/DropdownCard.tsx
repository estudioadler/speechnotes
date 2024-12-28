import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteAlert from "../DeleteAlert/DeleteAlert";
import { DotsThree } from "@phosphor-icons/react";
import { EditNoteDialog } from "../EditNoteDialog/EditNoteDialog";
import { DuplicateNoteButton } from "../DuplicateNoteButton/DuplicateNoteButton";

interface DropdownCardProps {
  note: {
    id: string;
    title: string;
    date: Date;
    content: string;
    pin: boolean;
  }
  onNoteDeleted: () => void;
  onNoteDuplicated: () => void;
  onNoteEdited: (id: string, newTitle: string, newContent: string) => void;
}

export const DropdownCard = ({
  note,
  onNoteDeleted,
  onNoteDuplicated,
  onNoteEdited,
}: DropdownCardProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-2 right-2 hover:bg-primary-foreground group"
        >
          <DotsThree strokeWidth={1.5} className="size-4 text-muted-foreground group-hover:text-primary" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <EditNoteDialog note={note} onNoteEdited={onNoteEdited} />
        <DuplicateNoteButton onNoteDuplicated={onNoteDuplicated} />
        <DropdownMenuSeparator />
        <DeleteAlert onNoteDeleted={onNoteDeleted} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

