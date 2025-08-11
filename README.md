Full-stack app for managing sports and gaming tag categories

Supports nested metadata and hierarchical subcategories

Create, view, edit, delete categories with confirmation dialogs

Real-time search by name and filters by status/group

Combine multiple filters for precise results

Built entirely in TypeScript with shared schemas for frontend & backend

Zod for type-safe form validation

React Query for data caching and sync

Responsive Tailwind CSS design with Radix UI accessibility

Loading states, error handling, and toast notifications

Frontend: React + Vite + Tailwind + React Query

Backend: Express + TypeScript

Storage: In-memory (ready for PostgreSQL + Drizzle ORM)

API Endpoints:

    1. GET /api/tag-categories – List categories

    2. POST /api/tag-categories – Create new category

    3. PUT /api/tag-categories/:id – Update category

    4. DELETE /api/tag-categories/:id – Delete category

Quick Start:
    git clone <repo>
    npm install
    npm run dev