import { cn } from "@/utils/format";
import DocViewer, { DocViewerProps, PDFRenderer, PNGRenderer, DocViewerRenderers, BMPRenderer, HTMLRenderer, ImageProxyRenderer, JPGRenderer, MSDocRenderer, MSGRenderer, TIFFRenderer, TXTRenderer } from "react-doc-viewer";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../dialog";
import { UserX } from "lucide-react";


interface FileViewerProps extends DocViewerProps {
    containerClassName?: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function FileViewer(props: FileViewerProps) {
    return (
        <Dialog open={props.open} onOpenChange={props.onOpenChange}>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <UserX className="h-5 w-5" />
                        Geblokkeerde gebruiker details
                    </DialogTitle>
                </DialogHeader>
                <div className={cn("flex flex-col items-center justify-center", props.containerClassName)}>
                    <div className="text-center w-full h-full">
                        <DocViewer
                            config={{
                                header: {
                                    disableHeader: true,
                                    disableFileName: true,
                                    retainURLParams: false,
                                },
                            }}
                            pluginRenderers={[
                                ...DocViewerRenderers,
                                BMPRenderer,
                                HTMLRenderer,
                                ImageProxyRenderer,
                                JPGRenderer,
                                MSDocRenderer,
                                MSGRenderer,
                                PDFRenderer,
                                PNGRenderer,
                                TIFFRenderer,
                                TXTRenderer,
                            ]}
                            className="!bg-white h-[80vh] w-[800px]"
                            {...props}
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}