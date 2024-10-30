import { useState, useEffect } from 'react';

export const usePagination = <T>(
    fetchFunction: (page: number, perPage: number) => Promise<{ data: T[], lastPage: number }>,
    initialPage = 1,
    perPage = 10
) => {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [data, setData] = useState<T[]>([]);
    const [lastPage, setLastPage] = useState(1);

    useEffect(() => {
        const loadPage = async () => {
            const result = await fetchFunction(currentPage, perPage);
            setData(result.data);
            setLastPage(result.lastPage);
        };

        loadPage();
    }, [currentPage, perPage, fetchFunction]);

    const nextPage = currentPage < lastPage ? currentPage + 1 : null;

    return {
        data,
        currentPage,
        nextPage,
        lastPage,
        goToPage: setCurrentPage,
    };
};
