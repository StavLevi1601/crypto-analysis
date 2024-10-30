import styles from "./style.module.scss";
import { useState } from "react";
import { Pagination } from "antd";
import { useQuery } from "react-query";
import { fetchTweet } from "@/app/utils/fetch";
import TweetTable from "../TweetTable/TweetTable";

export default function TweetList() {
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: tweetData,
        isLoading: isLoadingTweets,
        refetch,
    } = useQuery({
        queryFn: () => fetchTweet(currentPage),
        queryKey: ["tweets", currentPage],
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        if (page === tweetData?.lastPage) {
            refetch();
        }
    };

    if (isLoadingTweets) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>

            <hr />

            {tweetData ? (
                <div>
                    <TweetTable
                        data={tweetData.data.map((tweet, index: number) => ({
                            key: index,
                            tokenName: tweet.tokenInfo?.cmc_info?.[0]?.name || "Unknown Token",
                            tweetDate: tweet.contentDocument?.createdAt || "Unknown Date",
                            tweet: tweet.contentDocument?.description || "No description",
                            username: tweet.providerDetails?.screen_name || "Unknown",
                            aiDetails: {
                                contentAnalysis: {
                                    summary: tweet.data?.contentAnalysis?.summary || "No summary",
                                    detailedInsights: tweet.data?.contentAnalysis?.detailedInsights || "No insights",
                                },
                                title: tweet.data?.title || "No title",
                                riskFactor: tweet.data?.riskFactor || "No risk factor",
                                marketSignals: {
                                    type: tweet.data?.marketSignals.type || "No type",
                                    confidenceLevel: tweet.data?.marketSignals.confidenceLevel || "No Confidence Level"
                                },
                                recommendedAction: tweet.data?.recommendedAction || { action: "No action", urgency: "Not defined" }
                            }
                        }))}
                    />


                    <Pagination
                        current={tweetData.currentPage}
                        total={tweetData.lastPage ? tweetData.lastPage * 10 : 0}
                        pageSize={10}
                        onChange={handlePageChange}
                        showTotal={(total, range) =>
                            `${range[0]}-${range[1]} of ${total} items`
                        }
                        style={{ padding: "20px" }}
                    />
                </div>
            ) : (
                <div>No tweets found</div>
            )}
        </div>
    );
}
