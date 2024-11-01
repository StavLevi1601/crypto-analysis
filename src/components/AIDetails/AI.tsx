// AIDetailsComponent.tsx
import React, { useState } from 'react';
import { AIDetails } from "@/types";
import style from "./style.module.scss"
import Modal from '../Modal/Modal';

type AIDetailsComponentProps = {
    aiDetails: AIDetails;
};

const AIDetailsComponent: React.FC<AIDetailsComponentProps> = ({ aiDetails }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <button onClick={showModal} className={style.openButton}>
                Show Content
            </button>
            <Modal
                title="Detailed AI Analysis"
                open={isModalOpen}
                onClose={handleClose}
            >
                <div className={style.modalContent}>
                    <div className={style.section}>
                        <h4>Content Analysis:</h4>
                        <p><strong>Summary:</strong> {aiDetails.contentAnalysis.summary}</p>
                        <p><strong>Detailed Insights:</strong> {aiDetails.contentAnalysis.detailedInsights}</p>
                    </div>
                    <div className={style.section}>
                        <h4>General Information:</h4>
                        <p><strong>Title:</strong> {aiDetails.title}</p>
                        <p><strong>Risk Factor:</strong> {aiDetails.riskFactor}</p>
                    </div>
                    <div className={style.section}>
                        <h4>Market Signals:</h4>
                        <p><strong>Type:</strong> {aiDetails.marketSignals.type}</p>
                        <p><strong>Confidence Level:</strong> {aiDetails.marketSignals.confidenceLevel}</p>
                    </div>
                    <div className={style.section}>
                        <h4>Recommended Action:</h4>
                        <p>{aiDetails.recommendedAction.action}</p>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default AIDetailsComponent;
