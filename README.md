# RAJ AI - AI-Powered App Builder

Transform your ideas into working applications instantly. Describe your app in plain English and watch it come to life with AI-powered code generation.

## Getting Started

### Prerequisites

- Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Step 1: Clone the repository
git clone https://github.com/rajshah9305/auggie-code-lab.git

# Step 2: Navigate to the project directory
cd auggie-code-lab

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Technologies Used

This project is built with:

- **Vite**: Next Generation Frontend Tooling
- **TypeScript**: Strongly typed programming language that builds on JavaScript
- **React**: A JavaScript library for building user interfaces
- **shadcn-ui**: Reusable components built using Radix UI and Tailwind CSS
- **Tailwind CSS**: A utility-first CSS framework
- **Supabase**: Open source Firebase alternative

## Deployment

This project is configured for deployment on **Vercel**. Simply connect your GitHub repository to Vercel and it will automatically deploy your application.

## Configuration

To use the AI generation features, you need to set the `GROQ_API_KEY` in your Supabase project's Edge Functions secrets:

```sh
supabase secrets set GROQ_API_KEY=your_groq_api_key
```

The project is configured to use the `openai/gpt-oss-120b` model via Groq.

## Features

- **Instant Generation**: Build apps in seconds from natural language descriptions.
- **Full Code Access**: Get complete React & TypeScript code.
- **Live Preview**: See your changes in real-time.
- **Backend Integration**: Connected with Supabase for backend functionality.
