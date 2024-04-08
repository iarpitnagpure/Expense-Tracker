# Expense Tracker App

Expense Tracker App helps you keep track of your daily expenses.

## Tech Stack

### Frontend:
- Next.js
- Redux
- GraphQL Request Library
- Tailwind CSS

### Backend:
- Node.js
- GraphQL
- Apollo Server
- Express
- JWT

### Database:
- MongoDB

# Expense Tracker App Demo

## Add Environment Variables

1. **Backend:**
   - Go to `server` folder and add a `.env` file.
   - Paste the following keys and values:
     ```
     PORT=<port_number>
     CONNECTION_STRING=<database_connection_string>
     TOKEN_KEY=<token_key>
     CLIENT_URL=<client_url>
     ```

2. **Frontend:**
   - Go to `chat-app-frontend` folder and add a `.env` file.
   - Paste the following key and value:
     ```
     NEXT_PUBLIC_API_URL=<api_url>
     ```

Note: If your are configuring localhost then add your localhost URL on CLIENT_URL and NEXT_PUBLIC_API_URL;

## Installation

### Backend
1. Navigate to the `server` folder.
2. Run `npm i` to install dependencies.

### Frontend
1. Navigate to the `client` folder.
2. Run `npm i` to install dependencies.

## Start Chat App

### Backend
1. Navigate to the `server` folder.
2. Run `npm run start`.

### Frontend
1. Navigate to the `client` folder.
2. Run `npm run dev`.

Feel free to customize and extend the application as needed! If you encounter any issues, refer to the documentation of the respective libraries or frameworks used.

References: 
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [GraphQL Request Library](https://www.npmjs.com/package/graphql-request#highlights)
- [Tailwind CSS](https://daisyui.com/)
- [Redux Documentation](https://redux.js.org/)
