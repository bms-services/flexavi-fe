
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { PostType } from "@/types/community";
import { Form } from "@/components/ui/form";
import { MediaUpload } from "./MediaUpload";
import { PostTypeSelect } from "./PostTypeSelect";
import { GroupSelect } from "./GroupSelect";
import { PostTitleField } from "./PostTitleField";
import { PostContentField } from "./PostContentField";
import { FormActions } from "./FormActions";

const formSchema = z.object({
  title: z.string().min(3, "Titel moet minimaal 3 karakters bevatten").max(100, "Titel mag maximaal 100 karakters bevatten"),
  content: z.string().min(10, "Inhoud moet minimaal 10 karakters bevatten"),
  groupId: z.string().min(1, "Selecteer een groep"),
  type: z.nativeEnum(PostType),
});

interface CreatePostFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  onCancel: () => void;
  preselectedGroup?: { id: string } | null;
}

export function CreatePostForm({ onSubmit, onCancel, preselectedGroup }: CreatePostFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      groupId: preselectedGroup?.id || "",
      type: PostType.GENERAL,
    },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Nieuw bericht</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <PostTitleField control={form.control} />
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <GroupSelect control={form.control} />
            <PostTypeSelect control={form.control} />
          </div>
          
          <PostContentField control={form.control} />
          <MediaUpload />
          <FormActions onCancel={onCancel} />
        </form>
      </Form>
    </div>
  );
}
