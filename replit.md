# Tag Category Management System

## Overview

This is a full-stack Tag Category Management application built with React, TypeScript, Express.js, and PostgreSQL. The system allows users to create, view, edit, and delete tag categories with complex metadata configurations. It features a modern UI built with shadcn/ui components and Tailwind CSS, providing a comprehensive CRUD interface for managing structured data used in gaming/sports analytics contexts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **State Management**: React Query (@tanstack/react-query) for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds
- **Component Structure**: Modular component architecture with reusable UI components stored in `/components/ui/`

### Backend Architecture
- **Runtime**: Node.js with Express.js for REST API server
- **Language**: TypeScript with ES modules for type safety and modern JavaScript features
- **API Design**: RESTful endpoints following standard HTTP conventions (GET, POST, PUT, DELETE)
- **Middleware**: Custom logging middleware for request/response tracking and error handling
- **Development**: Hot module replacement with Vite integration for full-stack development

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Centralized schema definition in `/shared/schema.ts` using Drizzle's schema builder
- **Migrations**: Drizzle Kit for database migrations and schema management
- **Development Storage**: In-memory storage implementation for development/testing purposes
- **Data Types**: Complex JSON fields for metadata configurations and nested data structures

### Authentication and Authorization
- **Current State**: No authentication implemented - this is a basic CRUD application
- **Session Management**: Express session configuration present but not actively used
- **Security**: Basic Express security middleware for production deployment

### Key Design Patterns
- **Shared Types**: Common TypeScript interfaces and schemas shared between frontend and backend via `/shared/` directory
- **Component Composition**: Reusable UI components with consistent props interfaces
- **Form Management**: React Hook Form with Zod validation for type-safe form handling
- **Error Handling**: Centralized error handling with user-friendly toast notifications
- **Responsive Design**: Mobile-first approach with Tailwind CSS responsive utilities

## External Dependencies

### Core Technologies
- **@neondatabase/serverless**: Neon serverless PostgreSQL driver for database connectivity
- **drizzle-orm**: Type-safe ORM with PostgreSQL dialect support
- **@tanstack/react-query**: Server state management and caching library
- **wouter**: Lightweight routing library for React applications
- **vite**: Build tool and development server with React plugin support

### UI and Styling
- **@radix-ui/react-***: Comprehensive set of accessible UI primitives for components
- **tailwindcss**: Utility-first CSS framework for styling
- **class-variance-authority**: Utility for creating type-safe component variants
- **lucide-react**: Modern icon library for consistent iconography

### Development and Tooling
- **tsx**: TypeScript execution environment for Node.js development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-***: Replit-specific plugins for development environment integration
- **postcss**: CSS processing tool with autoprefixer for vendor prefixes

### Form and Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Validation resolvers for React Hook Form
- **zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod for schema validation

### Database and Backend
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **nanoid**: URL-safe unique ID generator for client-side ID generation
- **date-fns**: Modern date utility library for date manipulation and formatting