import { Button } from "@/components/ui/button";
import { CopySimple } from "@phosphor-icons/react";

interface DuplicateNoteButtonProps {
  onNoteDuplicated: () => void;
}

export const DuplicateNoteButton = ({ onNoteDuplicated }: DuplicateNoteButtonProps) => {
  return (
    <Button variant="ghost" className="w-full justify-start px-2" onClick={onNoteDuplicated}>
      <CopySimple strokeWidth={1.5} className="size-4 text-muted-foreground" />
      Duplicar
    </Button>
  );
};

