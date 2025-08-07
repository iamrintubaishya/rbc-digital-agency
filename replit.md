# RBC Digital Agency - Business Website

## Overview

This is a marketing website for RBC Digital Agency, a digital marketing company that specializes in helping local service businesses grow through their 5-part Digital Growth Playbook. The website showcases their services including social media content creation, ad marketing, AI automation, landing pages, and analytics across multiple industry verticals.

The application is built as a full-stack web application with a React frontend and Express backend, featuring contact forms, booking modals, and a chat interface for lead generation.

## User Preferences

Preferred communication style: Simple, everyday language.
Deployment preference: Vercel platform for production hosting.
Code change policy: Always ask for permission before making code changes.

## Recent Changes (August 2025)

✅ **Sanity CMS Integration**: Added professional blog management interface connecting to existing Neon database
✅ **Blog Admin Panel**: Created custom admin.html interface for editing blog posts with beautiful UI
✅ **Replit Agent Migration Completed**: Successfully migrated from Replit Agent to standard Replit environment with full PostgreSQL integration
✅ **Production Database Connected**: Neon database properly configured with blog posts and persistent storage
✅ **Article Display Bug Fixed**: Resolved "Article Not Found" issue - all 10 blog articles now working perfectly with "read full article" functionality
✅ **HubSpot CRM Integration**: Added contact synchronization for booking system
✅ **Local Environment Fixed**: Enhanced storage fallback system ensures consistent blog content delivery
✅ **Database Population Fixed**: Populated production database with blog posts and proper Unsplash images
⚠️ **Production Database Issue**: Vercel deployment still missing articles - auto-sync mechanism implemented but not yet working on production
✅ **Database Sync Complete**: Local environment properly synchronized with production database content
✅ **Article Navigation Working**: Blog post links now navigate correctly to individual articles with full content display
✅ **HubSpot CRM Integration**: Added contact synchronization for booking system
✅ **Blog Management System**: Complete blog functionality with frontend components using local storage
✅ **Database Setup**: PostgreSQL configured with all required tables and relationships
✅ **API Development**: RESTful endpoints for contacts, bookings, and blog posts
✅ **Frontend Components**: BlogSection and BlogPage components with responsive design
✅ **Blog Content**: 11 comprehensive blog posts covering digital marketing topics stored locally
✅ **Smart Storage System**: Application works with PostgreSQL (when available) or in-memory storage for demos
✅ **Clean Architecture**: Removed external CMS dependencies for simpler, more reliable deployment
✅ **Admin Interface Removed**: Eliminated complex admin panel in favor of direct database management
✅ **Vercel Database Setup**: Created comprehensive Neon database setup guide for production deployment
✅ **Database Connection Fixed**: Configured production to use unified Neon database for all data storage
✅ **Contact Forms Working**: Successfully storing contact and booking data in production Neon database
✅ **Blog Posts Limited**: Homepage now shows exactly 9 blog posts as requested
✅ **Intelligent Image Fallback**: Added smart fallback system - if database posts lack proper images, system automatically uses MemStorage with Unsplash URLs
✅ **PATCH Endpoints Added**: Created blog post update endpoints for both local and Vercel environments

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom dark theme variables and CSS custom properties
- **State Management**: TanStack Query (React Query) for server state and API calls
- **Routing**: Wouter for lightweight client-side routing
- **Layout**: Single-page application with vertical scrolling sections and fixed top navigation bar

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error middleware with structured error responses
- **Development**: Hot module replacement via Vite integration in development mode

### Data Storage Solutions
- **Database**: PostgreSQL via Neon Database (serverless)
- **ORM**: Drizzle ORM with type-safe queries and schema management
- **Schema Management**: Drizzle Kit for migrations and schema definitions
- **Smart Fallback**: Automatically uses DatabaseStorage with DATABASE_URL, falls back to MemStorage for demos
- **Connection**: Neon serverless PostgreSQL with connection pooling

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Contacts Table**: Lead capture with business information and challenges
- **Bookings Table**: Appointment scheduling with preferred dates and HubSpot contact ID integration
- **Blog Posts Table**: Content management with local database storage for blog functionality
- **Data Validation**: Zod schemas for runtime type checking and API validation

### Form Management
- **Contact Forms**: Multi-field lead capture with business type selection
- **Booking System**: Modal-based appointment scheduling
- **Validation**: Client and server-side validation using Zod schemas
- **User Feedback**: Toast notifications for form submission status

### UI/UX Design Patterns
- **Design System**: Consistent component library with shadcn/ui
- **Theme**: Dark theme with blue/green accent colors
- **Layout**: Vertical scrolling sections with smooth scroll behavior
- **Navigation**: Fixed top navigation bar with responsive mobile menu
- **Responsive**: Mobile-first design with responsive breakpoints
- **Animations**: CSS transitions and hover effects for interactive elements

## External Dependencies

### Database & ORM
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database queries and schema management
- **Drizzle Kit**: Database migration and schema generation tools

### CRM & Content Management
- **HubSpot CRM**: Customer relationship management with automated contact creation
- **Local Blog System**: Database-driven blog management with full CRUD operations
- **Date-fns**: Date formatting and manipulation for blog post timestamps

### UI Component Libraries
- **Radix UI**: Headless component primitives for accessibility
- **shadcn/ui**: Pre-built component system built on Radix
- **Lucide React**: Icon library for consistent iconography
- **Tailwind CSS**: Utility-first CSS framework

### Form & Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Runtime schema validation for TypeScript
- **Hookform Resolvers**: Integration between React Hook Form and Zod

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Static type checking and improved developer experience
- **ESBuild**: Fast JavaScript bundler for production builds
- **PostCSS**: CSS processing with Tailwind and Autoprefixer

### Production Dependencies
- **TanStack Query**: Server state management and caching
- **Wouter**: Lightweight client-side routing
- **Class Variance Authority**: Utility for managing component variants
- **Date-fns**: Date manipulation and formatting utilities