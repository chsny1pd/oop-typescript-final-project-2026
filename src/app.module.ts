// import { Module } from '@nestjs/common';

// @Module({
//   imports: [],
//   controllers: [],
//   providers: [],
// })
// export class AppModule {}
import { Module } from '@nestjs/common';
import { PostsController } from './modules/posts/posts.controller';
import { PostsService } from './modules/posts/posts.service';
import { CommentsController } from './modules/comments/comments.controller';
import { CommentsService } from './modules/comments/comments.service';

@Module({
  controllers: [PostsController, CommentsController],
  providers: [PostsService, CommentsService],
})
export class AppModule {}