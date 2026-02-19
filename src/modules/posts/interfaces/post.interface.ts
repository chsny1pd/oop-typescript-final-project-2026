export enum PostStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}
export interface Post {
  id: string;
  title: string;
  content: string;
  status: PostStatus;
  createdAt: Date;
}

// export interface Post {
//   id: string;
//   title: string;
//   content: string;
//   author: string;
//   createdAt: Date;
//   updatedAt: Date;
// }