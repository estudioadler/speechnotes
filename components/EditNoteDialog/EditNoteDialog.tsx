import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PencilSimple } from "@phosphor-icons/react";
import { Label } from '../ui/label';

interface EditNoteDialogProps {
  note: {
    id: string;
    title: string;
    content: string;
  };
  onNoteEdited: (id: string, newTitle: string, newContent: string) => void;
}

export const EditNoteDialog = ({ note, onNoteEdited }: EditNoteDialogProps) => {
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    onNoteEdited(note.id, editedTitle, editedContent);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost"  className="w-full justify-start px-2">
          <PencilSimple strokeWidth={1.5} className="size-4 text-muted-foreground" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Nota</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex flex-col gap-4">
            <Label htmlFor="title">
              Título
            </Label>
            <Input
              id="title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Label htmlFor="content">
              Conteúdo
            </Label>
            <Textarea
              id="content"
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="col-span-3"
              rows={5}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button variant="ghost" onClick={() => setIsOpen(false)} className="mr-2">
            Cancelar
          </Button>
          <Button onClick={handleSave}>Salvar Alterações</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

