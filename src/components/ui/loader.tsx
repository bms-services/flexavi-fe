// import { BoxesLoader } from "react-awesome-loaders";
// import { motion, AnimatePresence } from "framer-motion";
// import { useState, useEffect } from "react";

// type LoaderProps = {
//     show: boolean;
// };

// const messages = [
//     "Brewing some code...",
//     "Making a coffee ☕",
//     "Connecting to Stripe...",
//     "Spinning up something cool...",
//     "Almost there..."
// ];

// export default function Loader({ show }: LoaderProps): JSX.Element {
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         if (!show) return;

//         const interval = setInterval(() => {
//             setCurrentIndex((prev) => (prev + 1) % messages.length);
//         }, 4000); // jeda untuk beri waktu typing + out

//         return () => clearInterval(interval);
//     }, [show]);

//     useEffect(() => {
//         if (show) {
//             document.body.style.overflow = "hidden";
//         } else {
//             document.body.style.overflow = "";
//         }
//         return () => {
//             document.body.style.overflow = "";
//         };
//     }, [show]);

//     return (
//         <AnimatePresence>
//             {show && (
//                 <motion.div
//                     className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     exit={{ opacity: 0 }}
//                     transition={{ duration: 0.3 }}
//                 >
//                     <BoxesLoader
//                         boxColor={"#6366F1"}
//                         style={{}}
//                         desktopSize={"128px"}
//                         mobileSize={"80px"}
//                     />

//                     <div className="fixed bottom-8 left-0 w-full flex justify-center pointer-events-none">
//                         <div className="min-h-6 w-fit relative">
//                             <AnimatePresence mode="wait">
//                                 <motion.span
//                                     key={messages[currentIndex]}
//                                     initial={{ opacity: 0 }}
//                                     animate={{ opacity: 1 }}
//                                     exit={{ opacity: 0 }}
//                                     transition={{ duration: 0.6, ease: "easeOut" }}
//                                     className="text-white text-sm sm:text-base font-medium tracking-wide typing relative"
//                                 >
//                                     {messages[currentIndex]}
//                                 </motion.span>
//                             </AnimatePresence>
//                         </div>
//                     </div>
//                 </motion.div>
//             )}
//         </AnimatePresence>
//     );
// }

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useGlobalStore } from "@/zustand/stores/loaderStore";

const defaultMessages = [
    "Brewing some code...",
    "Making a coffee ☕",
    "Connecting to Stripe...",
    "Spinning up something cool...",
    "Almost there..."
];

interface CustomBoxesLoaderProps {
    color?: string;
    size?: string;
}

// Custom boxes loader using framer-motion
const CustomBoxesLoader = ({ color = "#6366F1", size = "128px" }: CustomBoxesLoaderProps) => {
    return (
        <div className="flex items-center justify-center gap-2">
            {[0, 1, 2, 3].map((index) => (
                <motion.div
                    key={index}
                    initial={{ y: 0 }}
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        delay: index * 0.2,
                        ease: "easeInOut",
                    }}
                    style={{
                        width: size,
                        height: size,
                        maxWidth: "25%",
                        aspectRatio: "1",
                        backgroundColor: color,
                        borderRadius: "8px",
                    }}
                />
            ))}
        </div>
    );
};

export default function Loader(): JSX.Element | null {
    const { show, message } = useGlobalStore();
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!show) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % defaultMessages.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [show]);

    useEffect(() => {
        document.body.style.overflow = show ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [show]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <CustomBoxesLoader
                        color="#6366F1"
                        size="60px"
                    />

                    <div className="fixed bottom-8 left-0 w-full flex justify-center pointer-events-none">
                        <div className="min-h-6 w-fit relative">
                            <motion.span
                                key={message ?? defaultMessages[currentIndex]}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="text-white text-sm sm:text-base font-medium tracking-wide animate-pulse"
                            >
                                {message ?? defaultMessages[currentIndex]}
                            </motion.span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}