export type Reaction = {
  type: string;
  count: number;
};

export interface MenfessType {
  id: string;
  to: string;
  from: string;
  message: string;
  images: string[];
  createdAt: string;
  reactions: Reaction[];
  _count: {
    comments: number;
  };
}
