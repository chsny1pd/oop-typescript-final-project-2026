# 🗂️ Data Model Documentation

> **Project:** Blog API  
> **Version:** 1.0.0  
> **Framework:** NestJS · **Language:** TypeScript  
> **Storage:** In-memory (mock database arrays)

---

## 📑 Table of Contents

- [Overview](#overview)
- [Entity Relationship Diagram](#entity-relationship-diagram)
- [Models](#models)
  - [User](#-user)
  - [Post](#-post)
  - [Comment](#-comment)
- [Enumerations](#enumerations)
- [DTOs (Data Transfer Objects)](#dtos-data-transfer-objects)
  - [Auth DTOs](#auth-dtos)
  - [User DTOs](#user-dtos)
  - [Post DTOs](#post-dtos)
  - [Comment DTOs](#comment-dtos)
- [Relationships](#relationships)
- [Field Conventions](#field-conventions)

---

## Overview

This document describes every data model used in the Blog API. The project uses **TypeScript interfaces** to define the shape of all entities, and **class-validator DTOs** to enforce input validation at the API boundary.

All data is stored in-memory using private arrays within each service. There is no external database — IDs are generated using `Date.now().toString()`.

---

## Entity Relationship Diagram

```
┌─────────────────┐         ┌──────────────────────┐
│      User       │         │         Post         │
├─────────────────┤         ├──────────────────────┤
│ id (PK)         │         │ id (PK)              │
│ username        │         │ title                │
│ password        │         │ content              │
│ createdAt       │         │ status (enum)        │
└─────────────────┘         │ createdAt            │
         │                  └──────────────────────┘
         │                           │
         │                ┌──────────┘
         │                │
         │    ┌──────────────────┐
         │    │     Comment      │
         │    ├──────────────────┤
         └───►│ postId (FK)      │
              │ id (PK)          │
              │ message          │
              │ author           │
              │ createdAt        │
              └──────────────────┘
```

> **Note:** Relationships are enforced at the service layer. `PostsService.findOne()` is called before creating a `Comment` to ensure referential integrity. `Comment.author` is validated against `UsersService` to ensure only registered users can comment.

---

## Models

---

### 👤 User

**File:** `src/modules/users/interfaces/user.interface.ts`  
**Used by:** `UsersService`, `AuthService`, `CommentsService`

Represents a registered account on the platform.

```typescript
export interface User {
  id:        string;   // Auto-generated timestamp ID
  username:  string;   // Unique display name
  password:  string;   // Plain-text password (in-memory only)
  createdAt: string;   // ISO 8601 timestamp string
}
```

#### Field Reference

| Field       | Type     | Required | Unique | Description                                         |
|-------------|----------|----------|--------|-----------------------------------------------------|
| `id`        | `string` | ✅       | ✅     | Generated via `Date.now().toString()`               |
| `username`  | `string` | ✅       | ✅     | Used for login and display; checked for duplicates in `AuthService` |
| `password`  | `string` | ✅       | ❌     | Stored as plain text; **never exposed in responses** |
| `createdAt` | `string` | ✅       | ❌     | Set at creation time via `new Date().toISOString()` |

#### Notes

- `password` is always stripped from API responses using `UserResponseDto` (see [DTOs](#user-dtos)).
- Username uniqueness is only checked during `/auth/register`. Direct `POST /users` does **not** enforce uniqueness.
- `username` is used by `CommentsService` to verify the `author` field before a comment is created.

---

### 📝 Post

**File:** `src/modules/posts/interfaces/post.interface.ts`  
**Used by:** `PostsService`, `CommentsService`

The central entity of the platform. Posts can be in `draft` or `published` state.

```typescript
export interface Post {
  id:        string;      // Auto-generated timestamp ID
  title:     string;      // Post heading
  content:   string;      // Post body text
  status:    PostStatus;  // "draft" | "published"
  createdAt: string;      // Thai-locale formatted date string
}
```

#### Field Reference

| Field       | Type         | Required | Default | Description                                             |
|-------------|--------------|----------|---------|---------------------------------------------------------|
| `id`        | `string`     | ✅       | auto    | Generated via `Date.now().toString()`                   |
| `title`     | `string`     | ✅       | —       | Post title; non-empty string                            |
| `content`   | `string`     | ✅       | —       | Main body of the post                                   |
| `status`    | `PostStatus` | ✅       | —       | Must be `"draft"` or `"published"` (see [Enumerations](#enumerations)) |
| `createdAt` | `string`     | ✅       | auto    | Formatted using Thai locale via `formatDate()` utility  |

#### Notes

- `createdAt` is formatted as a Thai-locale date string (e.g., `"5 เมษายน 2567"`) using `Intl.DateTimeFormat` with `'th-TH'` locale.

---

### 💬 Comment

**File:** `src/modules/comments/interfaces/comment.interface.ts`  
**Used by:** `CommentsService`

Represents a user comment attached to a specific post. Only registered users (validated via `author` username) are permitted to create comments.

```typescript
export interface Comment {
  id:        string;  // Auto-generated timestamp ID
  postId:    string;  // Foreign key → Post.id
  message:   string;  // Comment text content
  author:    string;  // Registered username of the commenter
  createdAt: string;  // Thai-locale formatted date string
}
```

#### Field Reference

| Field       | Type     | Required | Description                                                          |
|-------------|----------|----------|----------------------------------------------------------------------|
| `id`        | `string` | ✅       | Generated via `Date.now().toString()`                                |
| `postId`    | `string` | ✅       | References a `Post.id`; validated before creation                    |
| `message`   | `string` | ✅       | The comment body; non-empty string                                   |
| `author`    | `string` | ✅       | Must match an existing `User.username`; validated via `UsersService` |
| `createdAt` | `string` | ✅       | Formatted using Thai locale via `formatDate()` utility               |

#### Notes

- `postId` is validated by calling `PostsService.findOne()` before a comment is created. If the post does not exist, a `404 Not Found` is thrown.
- `author` is validated by calling `UsersService.findByUsername()` before a comment is created. If the username is not registered, a `401 Unauthorized` is thrown.

---

## Enumerations

### `PostStatus`

**File:** `src/modules/posts/interfaces/post.interface.ts`

Defines the valid publication states for a post.

```typescript
export enum PostStatus {
  DRAFT     = 'draft',
  PUBLISHED = 'published',
}
```

| Value       | String        | Description                            |
|-------------|---------------|----------------------------------------|
| `DRAFT`     | `"draft"`     | Post is saved but not publicly visible |
| `PUBLISHED` | `"published"` | Post is live and accessible            |

> Enforced at the API boundary via `@IsEnum(PostStatus)` in `CreatePostDto` and `UpdatePostDto`.

---

## DTOs (Data Transfer Objects)

DTOs define the shape of data accepted by API endpoints. All DTOs use `class-validator` decorators, enforced globally by `ValidationPipe`.

---

### Auth DTOs

#### `RegisterDto`
**File:** `src/modules/auth/dto/register.dto.ts`

```typescript
export class RegisterDto {
  @IsString() @IsNotEmpty()
  username: string;

  @IsString() @IsNotEmpty()
  password: string;
}
```

| Field      | Validators                 | Description       |
|------------|----------------------------|-------------------|
| `username` | `@IsString`, `@IsNotEmpty` | Required username |
| `password` | `@IsString`, `@IsNotEmpty` | Required password |

---

#### `LoginDto`
**File:** `src/modules/auth/dto/login.dto.ts`

```typescript
export class LoginDto {
  @IsString() @IsNotEmpty()
  username: string;

  @IsString() @IsNotEmpty()
  password: string;
}
```

| Field      | Validators                 | Description       |
|------------|----------------------------|-------------------|
| `username` | `@IsString`, `@IsNotEmpty` | Required username |
| `password` | `@IsString`, `@IsNotEmpty` | Required password |

---

### User DTOs

#### `CreateUserDto`
**File:** `src/modules/users/dto/create-user.dto.ts`

```typescript
export class CreateUserDto {
  @IsString() @IsNotEmpty()
  username: string;

  @IsString() @IsNotEmpty()
  password: string;
}
```

| Field      | Validators                 | Description |
|------------|----------------------------|-------------|
| `username` | `@IsString`, `@IsNotEmpty` | Required    |
| `password` | `@IsString`, `@IsNotEmpty` | Required    |

---

#### `UpdateUserDto`
**File:** `src/modules/users/dto/update-user.dto.ts`

```typescript
export class UpdateUserDto {
  @IsString() @IsNotEmpty()
  username?: string;

  @IsString() @IsNotEmpty()
  password?: string;
}
```

| Field      | Validators                 | Optional | Description                             |
|------------|----------------------------|----------|-----------------------------------------|
| `username` | `@IsString`, `@IsNotEmpty` | ✅       | If provided, must be a non-empty string |
| `password` | `@IsString`, `@IsNotEmpty` | ✅       | If provided, must be a non-empty string |

---

#### `UserResponseDto`
**File:** `src/modules/users/dto/user-response.dto.ts`

Used to strip `password` from all outgoing user responses.

```typescript
export class UserResponseDto {
  id:        string;
  username:  string;
  createdAt: string;
}
```

| Field       | Type     | Description                |
|-------------|----------|----------------------------|
| `id`        | `string` | User ID                    |
| `username`  | `string` | Username                   |
| `createdAt` | `string` | Account creation timestamp |

> ⚠️ `password` is intentionally excluded from this DTO and is never sent in API responses.

---

### Post DTOs

#### `CreatePostDto`
**File:** `src/modules/posts/dto/post.dto.ts`

```typescript
export class CreatePostDto {
  @IsString() @IsNotEmpty()
  title: string;

  @IsString() @IsNotEmpty()
  content: string;

  @IsEnum(PostStatus)
  status: PostStatus;
}
```

| Field     | Validators                 | Description                        |
|-----------|----------------------------|------------------------------------|
| `title`   | `@IsString`, `@IsNotEmpty` | Required post title                |
| `content` | `@IsString`, `@IsNotEmpty` | Required post body                 |
| `status`  | `@IsEnum(PostStatus)`      | Must be `"draft"` or `"published"` |

---

#### `UpdatePostDto`
**File:** `src/modules/posts/dto/post.dto.ts`

```typescript
export class UpdatePostDto {
  @IsString() @IsOptional()
  title?: string;

  @IsString() @IsOptional()
  content?: string;

  @IsEnum(PostStatus) @IsOptional()
  status?: PostStatus;
}
```

| Field     | Validators                           | Optional | Description             |
|-----------|--------------------------------------|----------|-------------------------|
| `title`   | `@IsString`, `@IsOptional`           | ✅       | New title if updating   |
| `content` | `@IsString`, `@IsOptional`           | ✅       | New content if updating |
| `status`  | `@IsEnum(PostStatus)`, `@IsOptional` | ✅       | New status if updating  |

---

### Comment DTOs

#### `CreateCommentDto`
**File:** `src/modules/comments/dto/comment.dto.ts`

```typescript
export class CreateCommentDto {
  @IsString() @IsNotEmpty()
  postId: string;

  @IsString() @IsNotEmpty()
  message: string;

  @IsString() @IsNotEmpty()
  author: string;
}
```

| Field     | Validators                 | Description                             |
|-----------|----------------------------|-----------------------------------------|
| `postId`  | `@IsString`, `@IsNotEmpty` | ID of the post to comment on            |
| `message` | `@IsString`, `@IsNotEmpty` | Comment body text                       |
| `author`  | `@IsString`, `@IsNotEmpty` | Must match a registered `User.username` |

---

#### `UpdateCommentDto`
**File:** `src/modules/comments/dto/comment.dto.ts`

```typescript
export class UpdateCommentDto {
  @IsString() @IsOptional()
  message?: string;

  @IsString() @IsOptional()
  author?: string;
}
```

| Field     | Validators                 | Optional | Description                      |
|-----------|----------------------------|----------|----------------------------------|
| `message` | `@IsString`, `@IsOptional` | ✅       | Updated comment text if provided |
| `author`  | `@IsString`, `@IsOptional` | ✅       | Updated author name if provided  |

---

## Relationships

| Relationship       | Type        | Enforcement                                                                                          |
|--------------------|-------------|------------------------------------------------------------------------------------------------------|
| `Comment` → `Post` | Many-to-One | `PostsService.findOne(postId)` called before comment creation; throws `404` if post not found        |
| `Comment` → `User` | Many-to-One | `UsersService.findByUsername(author)` called before comment creation; throws `401` if not registered |

---

## Field Conventions

| Convention         | Description                                                                                         |
|--------------------|-----------------------------------------------------------------------------------------------------|
| **ID generation**  | All `id` fields are generated with `Date.now().toString()` — millisecond timestamp as string        |
| **Date format**    | `Post.createdAt` and `Comment.createdAt` use Thai locale (`th-TH`) via `Intl.DateTimeFormat` — e.g. `"5 เมษายน 2567"` |
| **User dates**     | `User.createdAt` uses raw ISO 8601 format — e.g. `"2024-04-05T10:00:00.000Z"`                      |
| **Optional fields**| Marked with `?` in TypeScript and `@IsOptional()` in DTOs                                          |
| **Whitelist mode** | `ValidationPipe` is set to `whitelist: true` — any extra fields sent in requests are automatically stripped |

---

<div align="center">
  <sub>Blog API v1.0.0 · Data Model Documentation</sub>
</div>
