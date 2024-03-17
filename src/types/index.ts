export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
  liked: boolean;
};

export type Picture = {
  id: number;
  albumId: number;
  title: string;
  thumbnailUrl: string;
  url: string;
  liked: boolean;
};
