export interface IPosts {
  userId: number | string;
  id: number | string;
  title: string;
  body: string;
}

export type IRequiredPost = Pick<IPosts, "id" | "title" | "body">;

export type ICreatePost = Pick<IPosts, "title" | "body">;
