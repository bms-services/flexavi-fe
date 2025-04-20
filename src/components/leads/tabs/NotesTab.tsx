
import React, { useState } from "react";
import { Note } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusCircle, MessageSquare, Bold, Italic, List, ListOrdered } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { nl } from "date-fns/locale";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { useToast } from "@/hooks/use-toast";

interface NotesTabProps {
  notes: Note[];
  leadId: string;
}

// TipTap editor menu component
const EditorMenu = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="border-b mb-4 pb-2 flex gap-1">
      <Button
        type="button"
        size="icon"
        variant={editor.isActive('bold') ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={editor.isActive('italic') ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={editor.isActive('bulletList') ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant={editor.isActive('orderedList') ? 'default' : 'outline'}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};

export const NotesTab: React.FC<NotesTabProps> = ({ notes, leadId }) => {
  const { toast } = useToast();
  const [allNotes, setAllNotes] = useState<Note[]>(notes);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Typ hier je notitie...',
      }),
    ],
    content: '',
  });

  const handleAddNote = () => {
    if (!editor || editor.isEmpty) return;
    
    const content = editor.getHTML();
    
    // Create a new note object
    const newNote: Note = {
      id: `note-${Date.now()}`,
      leadId,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    // Update state with the new note
    setAllNotes([newNote, ...allNotes]);
    
    // Reset the editor
    editor.commands.clearContent();
    
    // Show success toast
    toast({
      title: "Notitie toegevoegd",
      description: "De notitie is succesvol toegevoegd.",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Nieuwe Notitie</CardTitle>
          <CardDescription>
            Voeg een nieuwe notitie toe aan deze lead
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-3">
            <EditorMenu editor={editor} />
            <EditorContent editor={editor} className="min-h-[120px] prose prose-sm max-w-none" />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button onClick={handleAddNote} disabled={!editor || editor.isEmpty}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Notitie Toevoegen
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notitiegeschiedenis</h3>
        {allNotes.length === 0 ? (
          <p className="text-muted-foreground">
            Nog geen notities voor deze lead.
          </p>
        ) : (
          <div className="space-y-4">
            {allNotes
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .map((note) => (
                <Card key={note.id}>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mr-2" />
                        <span className="text-sm text-muted-foreground">
                          {formatDistanceToNow(new Date(note.createdAt), {
                            addSuffix: true,
                            locale: nl,
                          })}
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {format(new Date(note.createdAt), "d MMMM yyyy HH:mm", {
                          locale: nl,
                        })}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="prose prose-sm max-w-none"
                      dangerouslySetInnerHTML={{ __html: note.content }} 
                    />
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};
