export interface Comment {
  id: string;
  postId: string; // เชื่อมกับ Post
  message: string;
  author: string;
  createdAt: Date;
}

// export interface Comment {
//   id: string;
//   postId: string;
//   author: string;
//   content: string;
//   createdAt: Date;
// }