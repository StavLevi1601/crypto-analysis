export type ContentAnalysis = {
    summary: string;
    detailedInsights: string;
};

export type MarketSignals = {
    type: string;
    confidenceLevel: string;
};

export type RecommendedAction = {
    action: string;
    urgency: string;
};

export type AIDetails = {
    contentAnalysis: ContentAnalysis;
    title: string;
    riskFactor: string;
    marketSignals: MarketSignals;
    recommendedAction: RecommendedAction;
};

export type ProviderDetails = {
    screen_name: string;
};

export type ContentDocument = {
    name?: string;
    createdAt?: string;
    description?: string;
    screen_name?: string;
};

export type Tweet = {
    contentDocument?: ContentDocument;
    providerDetails?: ProviderDetails;
    data?: {
        contentAnalysis?: ContentAnalysis;
        title?: string;
        riskFactor?: string;
        marketSignals?: MarketSignals;
        recommendedAction?: RecommendedAction;
    };
};

export type TweetData = {
    data: Tweet[];
    currentPage: number;
    lastPage: number;
};

export type AIDetailsComponentProps = {
    aiDetails: AIDetails;
};

export type TweetTableProps = {
    data: Array<{
        key: number;
        tokenName: string;
        tweetDate: string;
        tweet: string;
        username: string;
        aiDetails: AIDetails;
    }>;
};
