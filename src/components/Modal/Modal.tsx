'use client'
import React, { useState, useEffect } from 'react';
import style from "./style.module.scss";

type ModalProps = {
    title: string;
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export default function Modal({ title, open, onClose, children }: ModalProps) {
    const [isVisible, setIsVisible] = useState(open);

    useEffect(() => {
        if (open) {
            setIsVisible(true);
        }
    }, [open]);

    const handleAnimationEnd = () => {
        if (!open) {
            setIsVisible(false);
            onClose();
        }
    };

    if (!isVisible && !open) return null;

    return (
        <>
            <div
                className={`${style.modalOverlay} ${open ? style.fadeIn : style.fadeOut}`}
                onClick={onClose}
                onAnimationEnd={handleAnimationEnd}
            >
                <div
                    className={`${style.modal} ${open ? style.modalOpen : style.modalClose}`}
                    onAnimationEnd={handleAnimationEnd}
                >
                    <div className={style.modalContent}>
                        <h2>{title}</h2>
                        {children}
                        <button onClick={onClose} className={style.closeButton}>Close</button>
                    </div>
                </div>
            </div>
        </>
    );
}
