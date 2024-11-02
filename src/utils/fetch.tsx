import mockJson from '../data/mock.json';

export const fetchTweet = async (pageParam = 1, perPage = 10) => {
    try {

        if (!Array.isArray(mockJson)) {
            throw new Error('Invalid data format: Expected an array');
        }

        const startIndex = (pageParam - 1) * perPage;
        const endIndex = startIndex + perPage;

        const paginatedData = mockJson.slice(startIndex, endIndex);
        const lastPage = Math.ceil(mockJson.length / perPage);
        const totalTweet = mockJson.length;

        const sortedByDate = [...mockJson].sort((a, b) => {
            try {
                const dateA = a?.contentDocument?.created_at;
                const dateB = b?.contentDocument?.created_at;

                if (!dateA || !dateB) {
                    return 0;
                }

                return new Date(dateB).getTime() - new Date(dateA).getTime();
            } catch (error) {
                console.error('Error sorting dates:', error);
                return 0;
            }
        });

        const lastTweetDate = sortedByDate[0]?.contentDocument?.created_at || "No date available";

        const uniqueTokens = new Set(
            mockJson
                .filter(entry => entry?.tokenInfo?.cmc_info?.[0]?.name)
                .map(entry => entry.tokenInfo.cmc_info[0].name)
        );

        return {
            success: true,
            data: paginatedData,
            nextPage: endIndex < mockJson.length ? pageParam + 1 : null,
            currentPage: pageParam,
            lastPage,
            totalCoins: uniqueTokens.size,
            lastTweetDate,
            totalTweet,
            error: null
        };

    } catch (error) {
        console.error('Error in fetchTweet:', error);

        return {
            success: false,
            data: [],
            nextPage: null,
            currentPage: pageParam,
            lastPage: 0,
            totalCoins: 0,
            lastTweetDate: "Error fetching date",
            totalTweet: 0,
            error: error instanceof Error ? error.message : 'An unknown error occurred'
        };
    }
};