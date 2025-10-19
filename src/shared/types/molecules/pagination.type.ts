export interface IPaginationProps {
    onNext: () => void;
    onPrevious: () => void;
    pagination: {
        totalItems: number;
        itemCount: number;
        itemsPerPage: number;
        totalPages: number;
        currentPage: number;
    };
}