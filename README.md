# Github Trending App
A next.js based web application that lists trending GitHub repositories and enables users to star them
## Features

- **Repositories Listing**: View a list of trending GitHub repositories with details like stars, forks, and description.
- **Starred Repositories**: Keep track of your favorite repositories by starring them.

## What Gets Analyzed


## Tech Stack

**Frontend**
- Next.js with TypeScript
- React Context for state management
- React with hooks
- Tailwind CSS for styling
- Jest + React Testing Library


## Getting Started

### Prerequisites
- Node.js LTS
### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd github-trending
```

2. Build and run the application using node
```bash
npm install
npm run dev
```
### Demo

[https://github-trending-gamma.vercel.app/](https://github-trending-gamma.vercel.app/)



## Testing

Run the test suite:
```bash
# Frontend tests
npm run test
```

## Project Structure

```
├── frontend/src
│           ├── components/     # React components
│           ├── app/            # Next.js pages
│           ├── lib/            # Stores and utility functions
│           ├── context/      # React Context Providers
│           └── __tests__/      # Test files
└── README.md
```

