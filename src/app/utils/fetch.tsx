import mockJson from '../../data/mock.json';

export const fetchTweet = async (pageParam = 1, perPage = 10) => {
    const startIndex = (pageParam - 1) * perPage;
    const endIndex = startIndex + perPage;

    const paginatedData = mockJson.slice(startIndex, endIndex);
    const lastPage = Math.ceil(mockJson.length / perPage);

    const totalTweet = mockJson.length;

    const sortedByDate = mockJson.sort((a, b) => {
        const dateA = new Date(a.contentDocument.createdAt).getTime();
        const dateB = new Date(b.contentDocument.createdAt).getTime();
        return dateB - dateA;
    });

    const lastTweetDate = sortedByDate[0]?.contentDocument?.createdAt || "Unknown Date";

    const uniqueTokens = new Set(mockJson.map(entry => entry.tokenInfo?.cmc_info?.[0]?.name || "Unknown Token"));

    return {
        data: paginatedData,
        nextPage: endIndex < mockJson.length ? pageParam + 1 : null,
        currentPage: pageParam,
        lastPage,
        totalCoins: uniqueTokens.size,
        lastTweetDate,
        totalTweet,
    };
};
