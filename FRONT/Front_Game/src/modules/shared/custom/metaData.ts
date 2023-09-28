export class metaData {
    countTotal: number | null;
    currentPage: number | null;
    totalPages: number | null;
    pageSize: number | null;
    totalCount: number | null;
    hasPreviousPage: boolean | null;
    hasNextPage: boolean | null;
    previousPageUrl: string | null;
    nextPageUrl: string | null;
    data: any;
    constructor() {
        this.countTotal = null;
        this.currentPage = null;
        this.totalPages = null;
        this.pageSize = null;
        this.totalCount = null;
        this.hasPreviousPage = null;
        this.hasNextPage = null;
        this.previousPageUrl = null;
        this.nextPageUrl = null;
    }
}