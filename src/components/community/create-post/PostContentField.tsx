
import { Control } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { PostEditor } from "../PostEditor";

interface PostContentFieldProps {
  control: Control<any>;
}

export function PostContentField({ control }: PostContentFieldProps) {
  return (
    <FormField
      control={control}
      name="content"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Inhoud</FormLabel>
          <FormControl>
            <PostEditor 
              value={field.value} 
              onChange={field.onChange}
              placeholder="Waar gaat je bericht over?"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
