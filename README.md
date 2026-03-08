# 📝 Blog API

A RESTful API for a blog platform built with **NestJS** and **TypeScript**.  
Supports user authentication, post management, and a comment system — with clean structured responses and full Swagger documentation.

---

## 📑 Table of Contents

- [Project Overview](#-project-overview)
- [Technology Stack](#-technology-stack)
- [Installation & Setup](#-installation--setup)
- [Project Structure](#-project-structure)
- [Documentation](#-documentation)

---

## 🌐 Project Overview

Blog API is a backend REST API that provides the following core features:

| Feature | Description |
|---|---|
| 🔐 **Authentication** | Register and login with username/password |
| 👤 **User Management** | Full CRUD for user accounts |
| 📝 **Post Management** | Create, read, update, and delete blog posts with `draft` / `published` status |
| 💬 **Comments** | Registered users can comment on posts; only valid usernames are accepted |

**Key behaviours:**
- All responses follow a unified envelope format `{ success, data }`
- All errors are caught globally and return a consistent `{ success, message, path }` format
- Input validation is enforced on every endpoint via `class-validator`
- Data is stored **in-memory** — no external database required

---

## 🛠 Technology Stack

| Layer | Technology |
|---|---|
| **Runtime** | Node.js |
| **Language** | TypeScript |
| **Framework** | NestJS |
| **Validation** | class-validator · class-transformer |
| **API Docs** | Swagger (via `@nestjs/swagger`) |
| **Storage** | In-memory (mock arrays — no database) |

---

## ⚙️ Installation & Setup

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### 1. Clone the repository

```bash
git clone https://github.com/your-username/blog-api.git
cd blog-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run start:dev
```

The server will start at:

```
http://localhost:3000
```

### 4. Open Swagger UI

Once the server is running, open your browser and navigate to:

```
http://localhost:3000/api
```

You'll see the full interactive API documentation where you can test every endpoint directly.

### Other useful commands

```bash
# Build for production
npm run build

# Run in production mode
npm run start:prod

# Run tests
npm run test
```

> ⚠️ **Note:** All data is stored in-memory. Restarting the server will reset all data.

---

## 📁 Project Structure

```
├── src/
│   ├── app.module.ts                        # Root module
│   ├── main.ts                              # App entry point
│   │
│   ├── config/
│   │     └── swagger.config.ts              # Swagger setup
│   │
│   ├── common/
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts     # Global error handler
│   │   ├── interceptors/
│   │   │   └── response.interceptor.ts      # Global response formatter
│   │   ├── interfaces/
│   │   │   └── api-response.interface.ts    # ApiResponse<T> type
│   │   └── utils/
│   │       └── date.util.ts                 # Thai-locale date formatter
│   │
│   └── modules/
│         ├── auth/
│         │    ├── auth.module.ts
│         │    ├── auth.controller.ts        # POST /auth/register, /auth/login
│         │    ├── auth.service.ts
│         │    └── dto/
│         │         ├── register.dto.ts
│         │         └── login.dto.ts
│         │
│         ├── users/
│         │    ├── users.module.ts
│         │    ├── users.controller.ts       # GET|POST|PATCH|DELETE /users
│         │    ├── users.service.ts
│         │    ├── interfaces/
│         │    │    └── user.interface.ts
│         │    └── dto/
│         │         ├── create-user.dto.ts
│         │         ├── update-user.dto.ts
│         │         └── user-response.dto.ts
│         │
│         ├── posts/
│         │    ├── posts.module.ts
│         │    ├── posts.controller.ts       # GET|POST|PUT|PATCH|DELETE /posts
│         │    ├── posts.service.ts
│         │    ├── interfaces/
│         │    │    └── post.interface.ts
│         │    └── dto/
│         │         └── post.dto.ts
│         │
│         └── comments/
│              ├── comments.module.ts
│              ├── comments.controller.ts    # GET|POST|PUT|PATCH|DELETE /comments
│              ├── comments.service.ts
│              ├── interfaces/
│              │    └── comment.interface.ts
│              └── dto/
│                   └── comment.dto.ts
│
├── docs/
│   ├── api-specification.md
│   ├── data-model.md
│   └── uml-diagram.png
│
├── subjects/
│   ├── requirement.md
│   ├── submission.md
│   ├── evaluation.md
│   └── models.md
│
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📚 Documentation

Detailed documentation is available in the [`docs/`](./docs) folder:

| Document | Description |
|---|---|
| 📘 [API Specification](./docs/api-specification.md) | Every endpoint — method, path, request body, response examples, and error codes |
| 🗂️ [Data Model](./docs/data-model.md) | All entities, DTOs, enums, relationships, and field conventions |
| 🧩 [UML Diagram](./docs/uml-diagram.png) | Full UML diagram covering modules, services, controllers, and entities |

> Interactive API docs are also available at `http://localhost:3000/api` when the server is running.

---

## 📬 API Quick Reference

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/auth/register` | Register a new user |
| `POST` | `/auth/login` | Log in |
| `GET` | `/users` | List all users |
| `GET` | `/users/:id` | Get user by ID |
| `POST` | `/users` | Create user |
| `PATCH` | `/users/:id` | Update user |
| `DELETE` | `/users/:id` | Delete user |
| `GET` | `/posts` | List all posts |
| `GET` | `/posts/:id` | Get post by ID |
| `POST` | `/posts` | Create post |
| `PUT` | `/posts/:id` | Replace post |
| `PATCH` | `/posts/:id` | Update post |
| `DELETE` | `/posts/:id` | Delete post |
| `GET` | `/comments/post/:postId` | Get comments for a post |
| `POST` | `/comments` | Create comment *(registered users only)* |
| `PUT` | `/comments/:id` | Replace comment |
| `PATCH` | `/comments/:id` | Update comment |
| `DELETE` | `/comments/:id` | Delete comment |

---

<div align="center">
  <sub>Blog API v1.0.0 · Built with NestJS & TypeScript</sub>
</div>