import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { TrashSimple } from "@phosphor-icons/react";

interface IDeleteAlert {
  onNoteDeleted: () => void;
}
export default function DeleteAlert({ onNoteDeleted }: IDeleteAlert) {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:bg-secondary w-full rounded flex items-center px-2 py-2">
        <TrashSimple
          strokeWidth={1.5}
          className="mr-1.5 size-4 text-muted-foreground"
        />
        <span className="text-sm">Deletar</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Nota</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir? Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={onNoteDeleted}>
            Confirmar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
