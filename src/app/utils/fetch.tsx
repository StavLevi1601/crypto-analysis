import mockJson from '../../mock/mock.json';

export const fetchTweet = async (pageParam = 1, perPage = 10) => {

    const startIndex = (pageParam - 1) * perPage;
    const endIndex = startIndex + perPage;


    const paginatedData = mockJson.slice(startIndex, endIndex);


    const lastPage = Math.ceil(mockJson.length / perPage);

    return {
        data: paginatedData,
        nextPage: endIndex < mockJson.length ? pageParam + 1 : null,
        currentPage: pageParam,
        lastPage,
    };
};
