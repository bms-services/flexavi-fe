import { AttachmentRes } from "@/zustand/types/attachmentT";

export const handlePreviewFile = (file: File | AttachmentRes) => {
    const isFileInstance = typeof window !== "undefined" && file instanceof Blob && "name" in file;

    if (isFileInstance) {
        return {
            uri: URL.createObjectURL(file as File),
            fileType: (file as File).name.split(".").pop(),
        };

    } else if ("url" in file && "name" in file) {
        return {
            uri: file.url,
            fileType: file.name.split(".").pop(),
        };
    } else {
        return {
            uri: "",
            fileType: undefined,
        }
    }
};

