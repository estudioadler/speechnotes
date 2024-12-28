"use client";

import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Microphone, TextT } from "@phosphor-icons/react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useNoteCreation } from "@/hooks/useNoteCreation";
import { Plus } from "@phosphor-icons/react/dist/ssr";


interface NewNoteCardProps {
  onNoteCreated: (content: string, title: string) => void;
}

export const NewNoteCard = ({ onNoteCreated }: NewNoteCardProps) => {
  const { content, title, setContent, setTitle, handleSubmit } =
    useNoteCreation(onNoteCreated);
  const { isRecording, startRecording, stopRecording } = useSpeechRecognition({
    onTranscript: setContent,
  });

  const textAlertDialogRef = useRef<HTMLButtonElement>(null);
  const audioAlertDialogRef = useRef<HTMLButtonElement>(null);

  const closeAlertDialog = (ref: React.RefObject<HTMLButtonElement>) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleSave = (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(e as never);
    closeAlertDialog(textAlertDialogRef);
    closeAlertDialog(audioAlertDialogRef);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={"sm"} variant="secondary" className="text-xs">
          <Plus strokeWidth={1.5} className="size-4" />
          Criar Nota
        </Button>
      </DialogTrigger>
      <DialogContent className="w-fit">
        <DialogHeader>
          <DialogTitle>Crie uma Nota</DialogTitle>
          <DialogDescription>
            Crie uma nova nota em texto ou áudio.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-6">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 aspect-square size-44"
              >
                <TextT size={24}/>
                <span>Texto</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Digite sua Nota</AlertDialogTitle>
                <AlertDialogDescription>
                  Crie uma nova nota em texto.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <form onSubmit={handleSave} className="space-y-4">
                <Input
                  placeholder="Título da nota"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  className="min-h-[200px] resize-none"
                  placeholder="Digite o conteúdo da nota"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <AlertDialogFooter>
                  <AlertDialogCancel ref={textAlertDialogRef}>Cancelar</AlertDialogCancel>
                  <Button type="submit">Salvar</Button>
                </AlertDialogFooter>
              </form>
            </AlertDialogContent>
          </AlertDialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 aspect-square size-44"
              >
                <Microphone size={24} />
                <span>Gravação</span>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Grave sua nota</AlertDialogTitle>
                <AlertDialogDescription>
                  {isRecording ? "Gravando..." : "Clique para começar a gravar"}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="space-y-4">
                <Input
                  placeholder="Título da nota"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                  className="min-h-[200px] resize-none"
                  value={content}
                  readOnly
                  placeholder="O conteúdo da gravação aparecerá aqui..."
                />
                <AlertDialogFooter>
                  <AlertDialogCancel ref={audioAlertDialogRef}>Cancelar</AlertDialogCancel>
                  {isRecording ? (
                    <Button onClick={stopRecording}>Parar</Button>
                  ) : (
                    <Button onClick={startRecording}>Iniciar</Button>
                  )}
                  <Button
                    onClick={handleSave}
                    disabled={!content}
                  >
                    Salvar
                  </Button>
                </AlertDialogFooter>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogContent>
    </Dialog>
  );
};

