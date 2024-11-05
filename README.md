News Explorer API

This is the backend API for the News Explorer application. The API provides endpoints for managing user accounts and saved news articles. It is built with Node.js and Express, with MongoDB as the database. Celebrate/Joi is used for request validation, Winston for logging, and Helmet for enhanced security. The API is deployed on Google Cloud with domain support and SSL encryption provided by Certbot.

Table of Contents

	•	Project Setup
	•	Endpoints
	•	Technologies Used
	•	Environment Variables
	•	Security
	•	Deployment

Project Setup

	1.	Clone the repository:
      git clone https://github.com/yourusername/newsexplorer-backend.git
      cd newsexplorer-backend

  2.	Install dependencies:
      npm install

  3.	Environment Setup:
      Create a .env file in the project root directory and specify your environment variables as follows:
      MONGO_URI=your_mongodb_uri
      JWT_SECRET=your_jwt_secret
      PORT=3001

  4.	Run the server in development mode:
      npm run dev

  Endpoints
      •	POST /signup: Create a new user account.
      •	POST /signin: Authenticate a user and generate a JWT token.
      •	GET /users/me: Retrieve user information.
      •	POST /articles: Save a new article.
      •	GET /articles: Retrieve saved articles.
      •	DELETE /articles/:articleId: Delete a saved article.

    Each endpoint requires specific data and authorization; refer to the API documentation for more details.

  Technologies Used

	•	Node.js - JavaScript runtime for server-side development.
	•	Express - Web framework for building APIs.
	•	MongoDB - Database for storing user data and saved articles.
	•	Celebrate/Joi - Schema validation for incoming requests.
	•	Winston - Logging for tracking application events.
	•	Helmet - Security enhancements for HTTP headers.
  
  Environment Variables

	•	MONGO_URI: MongoDB URI for connecting to the database.
	•	JWT_SECRET: Secret key for signing JWT tokens.
	•	PORT: Port number on which the server runs.

Security

	•	Helmet is configured to set secure HTTP headers.
	•	Certbot is used for SSL/TLS encryption, ensuring secure HTTPS connections.
	•	JWT Authentication secures endpoints for registered users only.
	•	Celebrate/Joi Validation protects endpoints by validating incoming data structures.
	•	Rate Limiting: The server limits the number of requests per IP address over a given time.

Deployment

This API is deployed on Google Cloud and can be accessed through the following domains:

	•	Main Domain: newsexplorer.hackquest.com
	•	API Subdomain: api.newsexplorer.hackquest.com

SSL encryption for secure connections is provided by Certbot.

License

This project is licensed under the MIT License.
