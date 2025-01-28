export interface Page<T> {
    totalElements: number;
    totalPages: number;
    size: number;
    content: T[];
    number: number;
    sort: Sort;
    first: boolean;
    last: boolean;
    numberOfElements: number;
    pageable: Pageable;
    empty: boolean;
}

interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}