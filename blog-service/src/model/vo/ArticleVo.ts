export default interface ArticleVo {
    id?: number;
    title: string;
    banner: string;
    content?: string;
    like: number;
    pageView: number;
    originType: number;
    originUrl?: string;
    originName?: string;
    createTime?: string;
    updateTime?: string;
    categoryId?: number;
    categoryName?: string;
    next?: number;
    prev?: number;
}