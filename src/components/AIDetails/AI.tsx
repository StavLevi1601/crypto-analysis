// AIDetailsComponent.tsx
import React from 'react';
import { AIDetails } from "@/types";

type AIDetailsComponentProps = {
    aiDetails: AIDetails;
};

const AIDetailsComponent = ({ aiDetails }: AIDetailsComponentProps) => (
    <div>
        <p><strong>Content Analysis:</strong> </p>
        <p>summary: {aiDetails.contentAnalysis.summary}</p>
        <p>Detailed Insights: {aiDetails.contentAnalysis.detailedInsights}</p>
        <p><strong>Title:</strong> {aiDetails.title}</p>
        <p><strong>Risk Factor:</strong> {aiDetails.riskFactor}</p>
        <p><strong>Market Signals:</strong></p>
        <p>type: {aiDetails.marketSignals.type}</p>
        <p>Confidence Level: {aiDetails.marketSignals.confidenceLevel}</p>
        <p><strong>Recommended Action:</strong> {aiDetails.recommendedAction.action}</p>
    </div>
);

export default AIDetailsComponent;
