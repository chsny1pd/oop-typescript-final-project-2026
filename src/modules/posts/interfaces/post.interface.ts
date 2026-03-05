export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

export interface Post {
  id: string;
  title: string;
  content: string;
  status: PostStatus;
  createdAt: string;
  likes: number;
}