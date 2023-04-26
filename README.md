# NestJS-Chat-API

This is a simple chat application API built using the NestJS framework.

## API Endpoints

The application runs at `http://localhost:3000`.

- GET `/chat` - Returns a welcome message.
- GET `/chat/room` - Returns a list of available chat rooms.
- POST `/chat/room` - Creates a new chat room with the given name.
- POST `/chat/room/:roomName/user` - Adds a user to the specified chat room.
- POST `/chat/room/:roomName/message` - Sends a message to the specified chat room.
- GET `/chat/room/:roomName/messages` - Returns the latest messages from the specified chat room.

## Swagger UI

The Swagger UI can be accessed at `http://localhost:5000/api` and provides documentation for the API.

## Installation and Usage

To install and run the nestjs-chat-api, you need to have Node.js and npm installed on your machine.

- Tested on Node.js `v16.14.2`

- Clone the repository using the following command:
  `git clone https://github.com/cuttage/nestjs-chat-api.git`

- Change to the project directory:
  `cd nestjs-chat-api`

- Install the dependencies:
  `npm install`

- Start the server:
  `npm run start:dev`

This will start the server in development mode and will watch for any file changes in the src directory.

You can now access the API by navigating to `http://localhost:3000` in your web browser and use a tool like Postman (Desktop) to make HTTP requests to the API.

To run tests, you can use the following commands:

`npm run test`
`npm run test:e2e`
