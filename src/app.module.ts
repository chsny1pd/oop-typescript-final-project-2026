import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { CommentsModule } from './modules/comments/comments.module';
import { LikesModule } from './modules/likes/likes.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
    LikesModule,
  ],
})
export class AppModule {}