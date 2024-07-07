# README - Webmefy Coding Test
This project is based on the Webmefy coding test provided at [Webmefy Coding Test Instructions][link-id].

[link-id]:https://technical-test.webmefy.io/webmefy/instructions

## Project Overview
This project consists of two main components:
- API
- Client

### API
The API folder contains the server-side code required to handle data retrieval for the client application.

### Client
The Client folder contains the static website that utilizes HTML, CSS, and Vanilla JavaScript to display information fetched from the API.

## Getting Started
To run the project locally, follow these steps:

### API Setup

Navigate to the api folder.
Run npm install to install dependencies.
Start the API server using npm run start.
Client Setup:

Ensure the API server is running.
Navigate to the client folder.
Open index.html in your preferred web browser to view the web interface.
Implementation Details
The project implements the following tasks as per the coding test instructions:

### API Endpoint Details

- **Route**: /webmefy/data
- **Method**: GET
- **Token Header**: X-Webmefy-Token
- **Token Value**: V2VibWVmeXN1cGVyc2VjcmV0ZW50cnlsZXZlbHRva2Vu
- **Hint**: The token value might require decoding, potentially using base64.

### Client Side:

- Implements a simple UI to display information from the API endpoint.
- Displays order name, customer contact information, shipping address, and purchased items (including price, title, and image).
- The client side is built using only HTML, CSS, and Vanilla JavaScript.
- Focus is on simplicity and a clean layout, without unnecessary animations or complexity.

## Contact
For any inquiries or issues related to this project, please contact with me at pablokollm@gmail.com
