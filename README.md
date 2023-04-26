# NestJS-Chat-API

A simple chat application API built using the NestJS framework.

### Overview:

This is a simple chat application API developed using NestJS framework. It allows users to create chat rooms, add users to the room, and send/receive messages within the room.

### Architecture:

The API is designed using a modular architecture where each module has its own controllers, services, and DTOs. The ChatModule is the main module that contains ChatController, ChatService, and Chat DTOs. The RedirectController is implemented in ChatModule. RedirectController is used to make sure that when a user accesses the root route (/) of the application, the redirectToChat() method is executed, which redirects the user to the /chat route.

We use an in-memory database for this API. The database is represented as a Map object that holds the Room instances created by the API. The Rooms Map holds the rooms by their name and each room has a name, a list of users, and a list of messages.
An in-memory database is only appropriate if the API does not require the data to persist across different executions and we implemented it as such for demonstration purpose only. If the data needs to persist across different executions, a database such as MongoDB, MySQL, or PostgreSQL should be used instead.

In the createRoom() and addUserToRoom() methods of the ChatService class, a Set is used to store users in a room. Using a Set ensures that each user is only added to a room once, preventing duplicates. This is important in a chat application because we don't want multiple instances of the same user in a room, which could lead to confusion and errors.
The users Set gets converted to an array in the getRooms() method, right before returning the list of rooms. This is done to convert the Set into an array, which can be easily serialized to JSON and sent over the network to the client. (When returning the list of rooms to the client, the Set must be converted to an array, as Sets are not directly serializable to JSON. The Array.from() method is used to create a new array from the Set, which can then be returned to the client as JSON.)

### Endpoints:

- GET `/chat` : This endpoint returns a welcome message as a string when the API is accessed.
- GET `/chat/room` : This endpoint returns an array of all the chat rooms available.
- POST `/chat/room` : This endpoint allows users to create a new chat room. The request body should contain the name of the room.
- POST `/chat/room/:roomName/user` : This endpoint allows users to add a user to a chat room. The request body should contain the details of the user being added.
- POST `/chat/room/:roomName/message` : This endpoint allows users to send a message to a chat room. The request body should contain the message details.
- GET `/chat/room/:roomName/messages` : This endpoint returns an array of latest messages of the chat room. The query parameter 'limit' can be used to specify the maximum number of messages to be returned.

### DTOs:

- User DTO : Contains the name of the user.
- Message DTO : Contains the author name, message text, and timestamp of the message.
- Room DTO : Contains the name of the room, a set or an array of users, and an array of messages.

### Swagger:

Swagger is implemented in the API to provide documentation for the endpoints. SwaggerModule is imported in the ChatModule and DocumentBuilder is used to build the swagger documentation.

### Errors:

Errors are handled in the ChatService and a corresponding error message is returned. If a room is not found, the API returns a 'Room not found' error. If the author name in the message is not found in the room, the API returns an 'Author not found in room' error.

### Testing:

The tests were implemented using Jest and the NestJS testing utilities, which allow us to instantiate and test our application in an isolated environment.

The ChatController and ChatService were tested by mocking the dependencies and verifying the behavior of the methods. We tested the following scenarios:

- createRoom: tests if the method creates a new room with the provided name and returns it.
- addUserToRoom: tests if the method adds a user to an existing room, and if it throws an error when the room does not exist or the user is already in the room.
- sendMessage: tests if the method adds a new message to a room's message list, and if it throws an error when the room does not exist or the author is not in the room.
- getLatestMessages: tests if the method returns the correct number of messages from a room, and if it throws an error when the room does not exist.

#### e2e

This code uses the NestJS testing utilities and Supertest library for end-to-end testing of the ChatController.

- The createTestingModule method is used to create a module fixture for the ChatModule, which is then compiled. The resulting module fixture is used to create a Nest application instance.
- The init method is called on the Nest application instance to start the application before running the tests.
- The getHttpServer method is used to obtain the HTTP server instance created by NestJS, which is then passed to the request function from Supertest.
- The close method is called on the Nest application instance to stop the application after running the tests.
- The describe function is used to group related tests together. In this case, all tests related to the `/chat` endpoint are grouped together.
- The it function is used to define an individual test case. In this case, a GET request is sent to the `/` endpoint and the response is expected to have a 302 status code and a Location header that redirects to the `/chat` endpoint.
- The end method is called on the Supertest request object to send the request and handle the response. If an error occurs during the request, the done callback is called with the error. Otherwise, the done callback is called without any arguments to indicate that the test has passed.

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
