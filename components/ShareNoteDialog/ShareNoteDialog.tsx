import { useState } from 'react';
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShareFat, Copy, Check, X } from "@phosphor-icons/react";
import { toast } from "sonner";

interface ShareNoteDialogProps {
  noteId: string;
}

export const ShareNoteDialog = ({ noteId }: ShareNoteDialogProps) => {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);
  const shareLink = `${window.location.origin}/shared-note/${noteId}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareLink).then(() => {
      setCopied(true);
      toast.success("Link copiado para a área de transferência!");
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="hover:bg-primary-foreground group"
          onClick={() => setOpen(true)}
        >
          <ShareFat
            size={32}
            strokeWidth={1.25}
            className="size-4 text-muted-foreground group-hover:text-primary"
          />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Compartilhar Nota</AlertDialogTitle>
          <AlertDialogDescription>
            Copie o link abaixo para compartilhar esta nota com outras pessoas.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center space-x-2 mt-4 relative">
          <Input
            readOnly
            value={shareLink}
            className="pr-10 flex-1 truncate"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1.5 top-1.5 bottom-0 bg-background hover:bg-primary-foreground group"
            onClick={copyToClipboard}
          >
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
            )}
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 hover:bg-primary-foreground"
          onClick={() => setOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};

