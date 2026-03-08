# 📘 Blog API — Specification

> **Version:** 1.0.0  
> **Base URL:** `http://localhost:3000`  
> **Interactive Docs (Swagger UI):** `http://localhost:3000/api`  
> **Framework:** NestJS · **Language:** TypeScript

---

## 📑 Table of Contents

- [Overview](#overview)
- [Global Response Format](#global-response-format)
- [Error Handling](#error-handling)
- [Modules](#modules)
  - [🔐 Auth](#-auth)
  - [👤 Users](#-users)
  - [📝 Posts](#-posts)
  - [💬 Comments](#-comments)
- [Data Models](#data-models)
- [Validation Rules](#validation-rules)

---

## Overview

This API powers a blog platform supporting user authentication, post management and comments. All responses follow a unified envelope format. Validation is enforced globally via NestJS `ValidationPipe`.

---

## Global Response Format

Every successful response is wrapped by `ResponseInterceptor`:

```json
{
  "success": true,
  "data": { }
}
```

Every failed response is handled by `HttpExceptionFilter`:

```json
{
  "success": false,
  "message": "Error detail or object",
  "path": "/request/path"
}
```

---

## Error Handling

| HTTP Status | Meaning                        | When it occurs                              |
|-------------|--------------------------------|---------------------------------------------|
| `400`       | Bad Request                    | Missing required fields / validation failed |
| `401`       | Unauthorized                   | Invalid credentials on login                |
| `404`       | Not Found                      | Resource with given ID does not exist       |
| `409`       | Conflict                       | Username already taken on register          |
| `500`       | Internal Server Error          | Unexpected server-side failure              |

---

## Modules

---

### 🔐 Auth

**Base path:** `/auth`  
Handles registration and login. Delegates user storage to `UsersService`.

---

#### `POST /auth/register`

Register a new user account.

**Request Body**

```json
{
  "username": "john_doe",
  "password": "secret123"
}
```

| Field      | Type     | Required | Description        |
|------------|----------|----------|--------------------|
| `username` | `string` | ✅ Yes   | Desired username   |
| `password` | `string` | ✅ Yes   | Account password   |

**Response `201 Created`**

```json
{
  "success": true,
  "data": {
    "success": true,
    "message": "Register success",
    "user": {
      "id": "1712345678901",
      "username": "john_doe"
    }
  }
}
```

**Error Responses**

| Status | Condition                   |
|--------|-----------------------------|
| `400`  | Missing / invalid fields    |
| `409`  | Username already exists     |

---

#### `POST /auth/login`

Authenticate and log in with existing credentials.

**Request Body**

```json
{
  "username": "john_doe",
  "password": "secret123"
}
```

| Field      | Type     | Required | Description      |
|------------|----------|----------|------------------|
| `username` | `string` | ✅ Yes   | Registered username |
| `password` | `string` | ✅ Yes   | Account password |

**Response `200 OK`**

```json
{
  "success": true,
  "data": {
    "success": true,
    "message": "Login success",
    "user": {
      "id": "1712345678901",
      "username": "john_doe"
    }
  }
}
```

**Error Responses**

| Status | Condition                          |
|--------|------------------------------------|
| `400`  | Missing / invalid fields           |
| `401`  | Username or password is incorrect  |

---

### 👤 Users

**Base path:** `/users`  
Full CRUD for user management. Password is excluded from all responses.

---

#### `GET /users`

Retrieve all registered users.

**Response `200 OK`**

```json
{
  "success": true,
  "data": [
    {
      "id": "1712345678901",
      "username": "john_doe",
      "createdAt": "2024-04-05T10:00:00.000Z"
    }
  ]
}
```

---

#### `GET /users/:id`

Retrieve a single user by ID.

**Path Parameters**

| Parameter | Type     | Description     |
|-----------|----------|-----------------|
| `id`      | `string` | Target user ID  |

**Response `200 OK`**

```json
{
  "success": true,
  "data": {
    "id": "1712345678901",
    "username": "john_doe",
    "createdAt": "2024-04-05T10:00:00.000Z"
  }
}
```

**Error Responses**

| Status | Condition           |
|--------|---------------------|
| `404`  | User not found      |

---

#### `POST /users`

Create a new user directly (bypasses duplicate check — use `/auth/register` for safe registration).

**Request Body**

```json
{
  "username": "jane_doe",
  "password": "mypassword"
}
```

| Field      | Type     | Required | Description      |
|------------|----------|----------|------------------|
| `username` | `string` | ✅ Yes   | Username         |
| `password` | `string` | ✅ Yes   | Plain password   |

**Response `201 Created`**

```json
{
  "success": true,
  "data": {
    "id": "1712345699000",
    "username": "jane_doe",
    "password": "mypassword",
    "createdAt": "2024-04-05T10:05:00.000Z"
  }
}
```

---

#### `PATCH /users/:id`

Update username and/or password for a user.

**Path Parameters**

| Parameter | Type     | Description     |
|-----------|----------|-----------------|
| `id`      | `string` | Target user ID  |

**Request Body** *(all fields optional)*

```json
{
  "username": "new_username",
  "password": "new_password"
}
```

**Response `200 OK`**

```json
{
  "success": true,
  "data": {
    "id": "1712345678901",
    "username": "new_username",
    "createdAt": "2024-04-05T10:00:00.000Z"
  }
}
```

**Error Responses**

| Status | Condition      |
|--------|----------------|
| `404`  | User not found |

---

#### `DELETE /users/:id`

Permanently remove a user.

**Path Parameters**

| Parameter | Type     | Description     |
|-----------|----------|-----------------|
| `id`      | `string` | Target user ID  |

**Response `200 OK`**

```json
{
  "success": true,
  "data": {
    "message": "User deleted"
  }
}
```

**Error Responses**

| Status | Condition      |
|--------|----------------|
| `404`  | User not found |

---

### 📝 Posts

**Base path:** `/posts`  
Manage blog posts with status lifecycle (`draft` → `published`).

---

#### `GET /posts`

Retrieve all posts.

**Response `200 OK`**

```json
{
  "success": true,
  "data": [
    {
      "id": "1712345678000",
      "title": "My First Post",
      "content": "Hello world!",
      "status": "published",
      "createdAt": "5 เมษายน 2567"
    }
  ]
}
```

---

#### `GET /posts/:id`

Retrieve a single post by ID.

**Path Parameters**

| Parameter | Type     | Description    |
|-----------|----------|----------------|
| `id`      | `string` | Target post ID |

**Response `200 OK`**

```json
{
  "success": true,
  "data": {
    "id": "1712345678000",
    "title": "My First Post",
    "content": "Hello world!",
    "status": "published",
    "createdAt": "5 เมษายน 2567"
  }
}
```

**Error Responses**

| Status | Condition      |
|--------|----------------|
| `404`  | Post not found |

---

#### `POST /posts`

Create a new post.

**Request Body**

```json
{
  "title": "My First Post",
  "content": "This is the content of my first post.",
  "status": "draft"
}
```

| Field     | Type                       | Required | Description                      |
|-----------|----------------------------|----------|----------------------------------|
| `title`   | `string`                   | ✅ Yes   | Post title                       |
| `content` | `string`                   | ✅ Yes   | Post body content                |
| `status`  | `"draft"` \| `"published"` | ✅ Yes   | Publication status of the post   |

**Response `201 Created`**

```json
{
  "success": true,
  "data": {
    "id": "1712345678000",
    "title": "My First Post",
    "content": "This is the content of my first post.",
    "status": "draft",
    "createdAt": "5 เมษายน 2567"
  }
}
```

**Error Responses**

| Status | Condition                          |
|--------|------------------------------------|
| `400`  | Missing fields / invalid enum value |

---

#### `PATCH /posts/:id`

Update a post's title, content, or status.

**Path Parameters**

| Parameter | Type     | Description    |
|-----------|----------|----------------|
| `id`      | `string` | Target post ID |

**Request Body** *(all fields optional)*

```json
{
  "title": "Updated Title",
  "content": "Updated content here.",
  "status": "published"
}
```

**Response `200 OK`**

```json
{
  "success": true,
  "data": {
    "id": "1712345678000",
    "title": "Updated Title",
    "content": "Updated content here.",
    "status": "published",
    "createdAt": "5 เมษายน 2567"
  }
}
```

**Error Responses**

| Status | Condition      |
|--------|----------------|
| `404`  | Post not found |

---

#### `DELETE /posts/:id`

Permanently delete a post.

**Path Parameters**

| Parameter | Type     | Description    |
|-----------|----------|----------------|
| `id`      | `string` | Target post ID |

**Response `200 OK`**

```json
{
  "success": true,
  "data": null
}
```

**Error Responses**

| Status | Condition      |
|--------|----------------|
| `404`  | Post not found |

---

### 💬 Comments

**Base path:** `/comments`  
Comments are scoped to a post and validated to ensure the target post exists.

---

#### `GET /comments/post/:postId`

Retrieve all comments belonging to a specific post.

**Path Parameters**

| Parameter | Type     | Description        |
|-----------|----------|--------------------|
| `postId`  | `string` | Target post ID     |

**Response `200 OK`**

```json
{
  "success": true,
  "data": [
    {
      "id": "1712345679000",
      "postId": "1712345678000",
      "message": "Great post!",
      "author": "jane_doe",
      "createdAt": "5 เมษายน 2567"
    }
  ]
}
```

---

#### `POST /comments`

Add a new comment to a post.

**Request Body**

```json
{
  "postId": "1712345678000",
  "message": "Great post!",
  "author": "jane_doe"
}
```

| Field     | Type     | Required | Description                       |
|-----------|----------|----------|-----------------------------------|
| `postId`  | `string` | ✅ Yes   | ID of the post to comment on      |
| `message` | `string` | ✅ Yes   | Comment content                   |
| `author`  | `string` | ✅ Yes   | Display name of the commenter     |

**Response `201 Created`**

```json
{
  "success": true,
  "data": {
    "id": "1712345679000",
    "postId": "1712345678000",
    "message": "Great post!",
    "author": "jane_doe",
    "createdAt": "5 เมษายน 2567"
  }
}
```

**Error Responses**

| Status | Condition                    |
|--------|------------------------------|
| `400`  | Missing / invalid fields     |
| `404`  | Post not found               |
| `500`  | Failed to save comment       |

---

#### `PATCH /comments/:id`

Edit an existing comment's message or author.

**Path Parameters**

| Parameter | Type     | Description       |
|-----------|----------|-------------------|
| `id`      | `string` | Target comment ID |

**Request Body** *(all fields optional)*

```json
{
  "message": "Updated message",
  "author": "updated_author"
}
```

**Response `200 OK`**

```json
{
  "success": true,
  "data": {
    "id": "1712345679000",
    "postId": "1712345678000",
    "message": "Updated message",
    "author": "updated_author",
    "createdAt": "5 เมษายน 2567"
  }
}
```

**Error Responses**

| Status | Condition         |
|--------|-------------------|
| `404`  | Comment not found |

---

#### `DELETE /comments/:id`

Remove a comment permanently.

**Path Parameters**

| Parameter | Type     | Description       |
|-----------|----------|-------------------|
| `id`      | `string` | Target comment ID |

**Response `200 OK`**

```json
{
  "success": true,
  "data": null
}
```

**Error Responses**

| Status | Condition         |
|--------|-------------------|
| `404`  | Comment not found |

---

## Data Models

### `User`

| Field       | Type     | Description                    |
|-------------|----------|--------------------------------|
| `id`        | `string` | Auto-generated timestamp ID    |
| `username`  | `string` | Unique username                |
| `password`  | `string` | Plain-text password *(stored in-memory)* |
| `createdAt` | `string` | ISO timestamp of creation      |

> ⚠️ **Note:** `password` is excluded from all API responses via `UserResponseDto`.

---

### `Post`

| Field       | Type                       | Description                      |
|-------------|----------------------------|----------------------------------|
| `id`        | `string`                   | Auto-generated timestamp ID      |
| `title`     | `string`                   | Post title                       |
| `content`   | `string`                   | Post body                        |
| `status`    | `"draft"` \| `"published"` | Publication status               |
| `createdAt` | `string`                   | Thai-locale formatted date string |

---

### `Comment`

| Field       | Type     | Description                       |
|-------------|----------|-----------------------------------|
| `id`        | `string` | Auto-generated timestamp ID       |
| `postId`    | `string` | ID of the associated post         |
| `message`   | `string` | Comment text                      |
| `author`    | `string` | Author display name               |
| `createdAt` | `string` | Thai-locale formatted date string |

---

## Validation Rules

All incoming request bodies are validated using `class-validator`. The `ValidationPipe` is configured globally with:

- `whitelist: true` — strips any properties not defined in the DTO
- `transform: true` — auto-transforms payloads to DTO class instances

| Rule           | Decorator           | Behaviour                                  |
|----------------|---------------------|--------------------------------------------|
| Required field | `@IsNotEmpty()`     | Rejects empty strings and `null`           |
| String type    | `@IsString()`       | Rejects non-string values                  |
| Enum value     | `@IsEnum(PostStatus)` | Only `"draft"` or `"published"` accepted |
| Optional field | `@IsOptional()`     | Field may be omitted entirely              |

---

## Quick Reference

| Method   | Endpoint                    | Description                      |
|----------|-----------------------------|----------------------------------|
| `POST`   | `/auth/register`            | Register a new user              |
| `POST`   | `/auth/login`               | Log in                           |
| `GET`    | `/users`                    | List all users                   |
| `GET`    | `/users/:id`                | Get user by ID                   |
| `POST`   | `/users`                    | Create user                      |
| `PATCH`  | `/users/:id`                | Update user                      |
| `DELETE` | `/users/:id`                | Delete user                      |
| `GET`    | `/posts`                    | List all posts                   |
| `GET`    | `/posts/:id`                | Get post by ID                   |
| `POST`   | `/posts`                    | Create post                      |
| `PATCH`  | `/posts/:id`                | Update post                      |
| `DELETE` | `/posts/:id`                | Delete post                      |
| `GET`    | `/comments/post/:postId`    | Get comments for a post          |
| `POST`   | `/comments`                 | Create comment                   |
| `PATCH`  | `/comments/:id`             | Update comment                   |
| `DELETE` | `/comments/:id`             | Delete comment                   |

---

<div align="center">
  <sub>Generated from NestJS source · Blog API v1.0.0</sub>
</div>
