import { Controller, Control, FieldValues, Path } from 'react-hook-form';
import { WithContext as ReactTags, KEYS } from 'react-tag-input';

import type { ReactTagsWrapperProps, Tag } from 'react-tag-input';
import { Label } from './label';

type InputTagsProps<T extends FieldValues> = ReactTagsWrapperProps & {
    id?: string;
    name: Path<T>;
    control: Control<T>;
    label?: string;
    placeholder?: string;
    suggestions?: Tag[];
    maxTags?: number;
    disabled?: boolean;
};

export function InputTags<T extends FieldValues>({
    id,
    name,
    control,
    label,
    placeholder = 'Type and press tab to add a tag',
    suggestions = [],
    maxTags,
    disabled = false,
    ...props
}: InputTagsProps<T>) {
    return (
        <div className="flex flex-col gap-1">
            {label &&
                <Label htmlFor={id} className="text-left">
                    {label}
                </Label>
            }
            <Controller
                name={name}
                control={control}
                render={({ field }) => {
                    const handleDelete = (i: number) => {
                        const newTags = field.value.filter((_: Tag, index: number) => index !== i);
                        field.onChange(newTags);
                    };

                    const handleAddition = (tag: Tag) => {
                        field.onChange([...field.value, tag]);
                    };

                    const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
                        const newTags = [...field.value];
                        newTags.splice(currPos, 1);
                        newTags.splice(newPos, 0, tag);
                        field.onChange(newTags);
                    };

                    return (
                        <div className="relative space-y-1">
                            <ReactTags
                                tags={field.value}
                                suggestions={suggestions}
                                delimiters={[KEYS.TAB, KEYS.COMMA]}
                                id={id}
                                placeholder={placeholder}
                                handleDelete={handleDelete}
                                handleAddition={handleAddition}
                                handleDrag={handleDrag}
                                inputFieldPosition="bottom"
                                classNames={{
                                    tags: 'tagsClass',
                                    tagInput: 'tagInputClass',
                                    tagInputField: 'tagInputFieldClass',
                                    selected: 'selectedClass',
                                    tag: 'tagClass',
                                    remove: 'removeClass',
                                    suggestions: 'suggestionsClass',
                                    activeSuggestion: 'activeSuggestionClass',
                                    editTagInput: 'editTagInputClass',
                                    editTagInputField: 'editTagInputField',
                                    clearAll: 'clearAllClass',
                                }}
                                allowUnique
                                {...props}
                            />
                        </div>
                    );
                }}
            />
        </div>
    );
};