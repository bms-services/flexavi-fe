
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";

interface CommentReplyFormProps {
  parentId: string;
  onSubmit: (content: string, parentId: string) => void;
  onCancel: () => void;
  placeholder?: string;
}

export function CommentReplyForm({ parentId, onSubmit, onCancel, placeholder = "Schrijf een reactie..." }: CommentReplyFormProps) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      onSubmit(content, parentId);
      setContent("");
    }
  };

  return (
    <div className="flex gap-3 ml-8 mt-2">
      <Avatar className="h-6 w-6">
        <AvatarFallback>U</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Textarea
          placeholder={placeholder}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[80px] resize-none text-sm"
        />
        <div className="flex justify-end mt-2 space-x-2">
          <Button 
            onClick={onCancel}
            size="sm"
            variant="ghost"
          >
            <X className="h-4 w-4 mr-1" />
            Annuleren
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!content.trim()}
            size="sm"
          >
            <Send className="h-4 w-4 mr-1" />
            Reageren
          </Button>
        </div>
      </div>
    </div>
  );
}
