import { BoxesLoader } from "react-awesome-loaders";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

type LoaderProps = {
    show: boolean;
};

const messages = [
    "Brewing some code...",
    "Making a coffee ☕",
    "Connecting to Stripe...",
    "Spinning up something cool...",
    "Almost there..."
];

export default function Loader({ show }: LoaderProps): JSX.Element {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!show) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % messages.length);
        }, 4000); // jeda untuk beri waktu typing + out

        return () => clearInterval(interval);
    }, [show]);

    useEffect(() => {
        if (show) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
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
                    {/* Loader box di tengah */}
                    <BoxesLoader
                        boxColor={"#6366F1"}
                        style={{}}
                        desktopSize={"128px"}
                        mobileSize={"80px"}
                    />

                    {/* Teks loading di bagian bawah layar */}
                    <div className="fixed bottom-8 left-0 w-full flex justify-center pointer-events-none">
                        <div className="min-h-6 w-fit relative">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={messages[currentIndex]}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                    className="text-white text-sm sm:text-base font-medium tracking-wide typing relative"
                                >
                                    {messages[currentIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}