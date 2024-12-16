# Dashboard using React with Next.js, TypeScript, and Tailwind CSS

**LIVE DEMO**: https://technical-test-as.vercel.app/

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Routes](#routes)
- [Additional Features](#additional-features)
- [Performance Optimization](#performance-optimization)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contact](#contact)

## Project Overview

This project is a web application built with **React**, **Next.js**, **TypeScript**, and **Tailwind CSS**. It demonstrates key functionalities including secure authentication, dynamic dashboard generation, efficient data handling, and performance optimizations. The application is designed with scalability and maintainability in mind, incorporating best practices in modern web development.

# Features

- **Authentication:** Secure user authentication using NextAuth.js.
- **UI Components:** A robust UI Kit with reusable components and a theme system supporting Light and Dark modes.
- **Dashboard:** Interactive dashboard featuring multiple graphs and data visualization using Chart.js.
- **Data Handling:** Efficient management and display of large data sets with pagination and filtering.
- **Performance Optimization:** Leveraging Next.js 14 features for server-side rendering and server components to enhance performance.
- **Testing:** Comprehensive unit testing with Jest and React Testing Library.
- **Responsive Design:** Mobile-first design.

## Tech Stack

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS
- **Authentication:** NextAuth.js
- **Data Visualization:** Chart.js
- **Testing:** Jest, React Testing Library
- **Backend:** Next.js API Routes, Prisma ORM
- **Deployment:** Vercel

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **npm** or **yarn**
- **Git**

### Installation

1. **Clone the repository:**

   ```bash
     git clone https://github.com/AGasco/technical-test-as.git
   ```
2. **Navigate to the project directory:**
   
   ```bash
    cd technical-test-as
   ```

3. **Install dependencies:**

    Using npm:
     ```bash
      npm install
     ```

    Or using yarn:
     ```bash
      yarn install
     ```

### Running the Application

To start the development server, run:
  ```bash
  npm run dev
  ```
Or with yarn:
  ```bash
  yarn dev
  ```

The application will be available at http://localhost:3000

## Project Structure

```bash
technical-test-as/
├── .env
├── .env.local
├── .gitignore
├── .next/
├── app/
├── components/
├── config/
├── consts/
├── contexts/
├── data/
├── hooks/
├── jest.config.js
├── jest.setup.ts
├── lib/
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── postcss.config.js
├── prisma/
├── public/
├── README.md
├── services/
├── tailwind.config.js
├── tsconfig.json
├── types/
├── utils/
```
- app/: Contains the app router with different pages and components.
- components/: Reusable UI components.
- config/: Configuration files.
- consts/: Constants that are used throughout the appplication.
- contexts/: React context providers.
- data/: Mock data and data handling utilities.
- hooks/: Custom React hooks.
- lib/: Library utilities, including Prisma setup.
- prisma/: Prisma schema and migration files.
- public/: Static assets like images.
- services/: API service configurations.
- types/: TypeScript type definitions.
- utils/: Utility functions.

## API Endpoints

### Authentication
- Register a new user:
  ```bash
  POST /api/register
  ```
- Login an existing user:

  ```bash
  POST /api/login
  ```

-  NextAuth.js related endpoints for handling authentication:

  ```bash
    /api/auth
  ```

### Data Management
-  Fetch incidents data to render in the table:

  ```bash
  GET /api/data
  ```

- Fetch incident stats to build the graphs:

  ```bash
  GET /api/incident-stats
  ```

## Routes

  ```bash
  '/'
  ```
**HomePage - Public**: Dynamic content based on user's authentication status.

  ```bash
  '/register'
  ```
**RegisterPage - Public**: Form to register using credentials or sign in using socials.

 ```bash
  '/login'
 ```
**LoginPage - Public**: Form to log in using credentials or sign in using socials.

  ```bash
  '/dashboard'
  ```
**DashboardPage - Protected**: Contains two tabs:
- *OverviewTab*: Displays 4 graphs with different relevant data for the 1000 records
- *IncidentsTab*: Displays a paginated table with the 1000 records as well as filters form for querying different properties.


## Additional Features

1. **Theme System**: Supports Light and Dark modes, allowing users to switch themes.
2. **Data Visualization**: Utilizes Chart.js for creating interactive and responsive graphs.
3. **Responsive Design**: Ensures optimal user experience across various devices and screen sizes.
4. **UI Kit**: A collection of reusable and customizable UI components to maintain design consistency.


## Performance Optimization

- SSR: Enhances performance and SEO by pre-rendering pages on the server
- Server Components: Uses Next.js server components to reduce client bundle size.

## Testing

- Unit tests: Jest and React testing library were used.
- Tests designed for: Login, Register, DashboardContent, OverviewTab, ChartWrapper, IncidentsTab, IncidentsList, DashboardFilters

## Deployment

The application is deployed on Vercel and can be accessed via the following link: 

  https://technical-test-as.vercel.app/

*To deploy your own instance*:

1. Fork the repository on GitHub.
2. Connect the repository to Vercel.
3. Set up environment variables in Vercel as per your .env.local file.
4. Deploy.

## Contact

For any questions or feedback, please do not hesitate to contact me via antoniofgasco@gmail.com
