import { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useQuery } from "react-query";
import TweetTable from "../TweetTable/TweetTable";
import style from "./style.module.scss"
import TotalData from "../TotalData/TotalData";
import Search from "../Search/Search";
import { Tweet } from "@/types";
import { fetchTweet } from "@/utils/fetch";

export default function TweetList() {

    const [currentPage, setCurrentPage] = useState(1);
    const [filterData, setFilterData] = useState<Tweet[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");

    const {
        data: tweetData,
        isLoading: isLoadingTweets,
        refetch,
        error,
    } = useQuery({
        queryFn: () => fetchTweet(currentPage),
        queryKey: ["tweets", currentPage],
    });

    useEffect(() => {
        if (!searchTerm && tweetData) {
            setFilterData(tweetData.data);
        }
    }, [searchTerm, tweetData]);



    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        if (page === tweetData?.lastPage) {
            refetch();
        }
    };


    const handleSearch = (value: string) => {
        setSearchTerm(value);
        if (tweetData) {
            const filtered = tweetData.data.filter((tweet: Tweet) => {
                return (
                    (typeof tweet.tokenInfo?.cmc_info?.[0]?.name === 'string' &&
                        tweet.tokenInfo.cmc_info[0].name.toLowerCase().includes(value.toLowerCase())) ||
                    (typeof tweet.contentDocument?.description === 'string' &&
                        tweet.contentDocument.description.toLowerCase().includes(value.toLowerCase())) ||
                    (typeof tweet.providerDetails?.screen_name === 'string' &&
                        tweet.providerDetails.screen_name.toLowerCase().includes(value.toLowerCase())) ||
                    (typeof tweet.contentDocument?.createdAt === 'string' &&
                        tweet.contentDocument.createdAt.toLowerCase().includes(value.toLowerCase()))
                );
            });

            setFilterData(filtered);
        }
    };

    if (isLoadingTweets) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <div className={style.errorContainer}>
                <h3>Error loading tweets</h3>
                <p>{error instanceof Error ? error.message : 'An unknown error occurred'}</p>
                <button onClick={() => refetch()}>Try Again</button>
            </div>
        );
    }

    return (
        <div className={style.container}>
            <TotalData lastTweetDate={tweetData?.lastTweetDate} totalCoins={tweetData?.totalCoins} totalTweets={tweetData?.totalTweet} />
            <Search onSearchValue={handleSearch} />
            {tweetData ? (
                <div className={style.fullTable}>
                    <TweetTable
                        data={filterData.map((tweet, index: number) => ({
                            key: index,
                            tokenName: tweet.tokenInfo?.cmc_info?.[0]?.name || "Unknown Token",
                            tweetDate: tweet.contentDocument?.createdAt ? new Date(tweet.contentDocument.createdAt).toLocaleDateString() : "Unknown Date",
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
                                    type: tweet.data?.marketSignals?.type || "No type",
                                    confidenceLevel: tweet.data?.marketSignals?.confidenceLevel || "No Confidence Level"
                                },
                                recommendedAction: tweet.data?.recommendedAction || { action: "No action", urgency: "Not defined" }
                            }
                        }))}
                    />


                    <div className={style.myContainer}>
                        <Pagination
                            current={tweetData.currentPage}
                            total={tweetData.lastPage ? tweetData.lastPage * 10 : 0}
                            pageSize={10}
                            onChange={handlePageChange}
                            showTotal={(total, range) =>
                                `${range[0]}-${range[1]} of ${total} items`
                            }
                        />
                    </div>

                </div>
            ) : (
                <div className={style.noDataMessage}>No tweets found</div>
            )}
        </div>
    );
}
