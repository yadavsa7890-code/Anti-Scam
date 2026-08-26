# AntiScam Backend

This is the backend server for the AntiScam application.

It handles communication between the React frontend and the AI chatbot API.

## Technologies Used

- Node.js
- Express.js
- CORS
- dotenv
- OpenRouter API

## Installation

Install the required packages:

npm install

## Environment Setup

Create a file named:

.env

Inside the `.env` file, add:

OPENROUTER_API_KEY=your_api_key_here

Do not share or upload your API key publicly.

## Start the Backend

Run:

npm start

The backend server will run on:

http://localhost:5000

## AI Chat Endpoint

The frontend sends chatbot messages to:

POST /api/chat