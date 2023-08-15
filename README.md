# Social Media API

Welcome to the Social Media API design project! This project implements a backend API for a social media platform using Node.js and MongoDB.

## Framework Choice

For the backend development of the Social Media API project, we chose to use the following technologies:

- **Node.js**: A versatile and efficient JavaScript runtime, ideal for building scalable network applications.
- **Express.js**: A minimalist web framework for Node.js, allowing us to create APIs quickly and efficiently.
- **MongoDB**: A NoSQL database that offers flexibility and scalability for storing various types of data.
- **JSON Web Tokens (JWT)**: Used for user authentication and securing API endpoints.

## Database Schema

The MongoDB database schema for the project includes the following collections:

- **Users**: Stores user information, including names, email addresses, passwords, followers, and followings.
- **Posts**: Contains post details, such as titles, descriptions, creation times, likes, and comments.
- **Comments**: Contains comment details, such as text, creator, creation times.

Please refer to the schema details in the provided `User.js`, `Comment.js` and `Post.js` files.

## Instructions to Run

To run the project on your local machine, follow these steps:

1. Make sure you have Node.js and MongoDB installed.

2. Clone the repository:

   ```bash
   git clone https://github.com/rakesh-kumar-18/social-media-API.git
   cd social-media-API
   ```
   
3. Install dependencies: `npm install`
   
3. Create a `.env` file and update the environment variables with your configuration.

   Your `.env` file should look like below:
   ```
   MONGODB_URI = YOUR_MONGODB_URI
   JWT_SECRET = YOUR_SECRET_KEY
   ```

5. Start the server: `npm start`
   
6. The server will be running at http://localhost:3000.

### Instructions to run your project using Docker:

1. Install Docker:
   If you haven't already, make sure you have Docker installed on your machine. You can download and install Docker Desktop from the official Docker website.

2. Clone the Repository:
   Open your terminal and navigate to the directory where you want to clone the project. Then run:

   ```bash
   git clone https://github.com/rakesh-kumar-18/social-media-API.git
   cd social-media-API
   ```

4. Create .env File:
   Create a `.env` file and update the environment variables with your configuration.

5. Build the Docker Image:
   In the project directory, open a terminal and run the following command to build the Docker image:

   ```
   docker build -t social-media-api .
   ```
   
7. Run the Docker Container:
   After the image is built, you can run the Docker container using the following command:

   ```
   docker run -p 3000:3000 --env-file .env social-media-api
   ```
   
   Replace `.env` with the actual path to your .env file if it's not in the same directory.

6. Access the API:
   Your API should now be accessible at http://localhost:3000. You can test the API endpoints using a tool like Postman or any web browser.

## Note:

   After getting the token for authentication remember to add the token to the authorization key as key-value pair in the header section.
