import React, { useState, useEffect } from 'react';

const Typewriter = ({ textArray }) => {
    const [currentText, setCurrentText] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const typingSpeed = isDeleting ? 50 : 100;
        const currentFullText = textArray[textIndex];
        const timer = setTimeout(() => {
            if (!isDeleting && currentText.length < currentFullText.length) {
                setCurrentText(currentFullText.substring(0, currentText.length + 1));
            } else if (isDeleting && currentText.length > 0) {
                setCurrentText(currentFullText.substring(0, currentText.length - 1));
            } else if (!isDeleting && currentText.length === currentFullText.length) {
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && currentText.length === 0) {
                setIsDeleting(false);
                setTextIndex((prev) => (prev + 1) % textArray.length);
            }
        }, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, textIndex, textArray]);

    return (
        <span className="font-mono font-light tracking-[0.4em] uppercase text-sm md:text-lg text-sky-200">
            {currentText}
            <span className="animate-pulse bg-sky-400 w-2 h-5 inline-block ml-1 align-middle"></span>
        </span>
    );
};

export default Typewriter;