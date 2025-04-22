
import React, { useRef, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Underline as UnderlineIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DocumentEditorProps {
  content: string;
  onChange: (content: string) => void;
  autoFocus?: boolean;
}

export const DocumentEditor: React.FC<DocumentEditorProps> = ({ 
  content, 
  onChange,
  autoFocus = false
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Placeholder.configure({
        placeholder: 'Begin hier met typen...',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    autofocus: autoFocus,
  });

  useEffect(() => {
    // Set content when it changes externally
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return null;
  }

  const formatSection = (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'bg-gray-200' : ''}
        title="Vet"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? 'bg-gray-200' : ''}
        title="Cursief"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'bg-gray-200' : ''}
        title="Onderstrepen"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
    </div>
  );

  const headingSection = (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : ''}
        title="Kop 1"
      >
        <Heading1 className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : ''}
        title="Kop 2"
      >
        <Heading2 className="h-4 w-4" />
      </Button>
    </div>
  );

  const listSection = (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'bg-gray-200' : ''}
        title="Opsommingstekens"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'bg-gray-200' : ''}
        title="Genummerde lijst"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );

  const alignmentSection = (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''}
        title="Links uitlijnen"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''}
        title="Centreren"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''}
        title="Rechts uitlijnen"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );

  const historySection = (
    <div className="flex items-center gap-1">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        title="Ongedaan maken"
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        title="Opnieuw"
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );

  return (
    <div className="border rounded-md overflow-hidden flex flex-col h-full bg-white">
      <div className="bg-gray-50 p-2 border-b flex items-center gap-2 flex-wrap">
        {formatSection}
        <span className="border-r h-6 mx-1" />
        {headingSection}
        <span className="border-r h-6 mx-1" />
        {listSection}
        <span className="border-r h-6 mx-1" />
        {alignmentSection}
        <span className="border-r h-6 mx-1" />
        {historySection}
      </div>
      
      <div ref={editorRef} className="flex-grow overflow-auto">
        <EditorContent 
          editor={editor} 
          className="prose max-w-none p-6 min-h-[500px] h-full" 
        />
      </div>
    </div>
  );
};
