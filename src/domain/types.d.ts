export interface IPicture {
    id?: number;
    imageData: string;
    comments: Array<IComment>;
}

export interface IComment {
    id: number;
    text: string;
    creatorName: string;
}
