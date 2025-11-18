export interface IBoard {
  _id: string;
  title: string;
  slug: string;
  description: string;
  columnOrderIds: string[];
  createdAt: Date;
  updatedAt: Date | null;
  _destroy: boolean;
}

export type IBoardValidate = Omit<IBoard, '_id'>;

export type CreateBoardDto = Pick<IBoard, 'title' | 'description'>;
