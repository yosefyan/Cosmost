# SpaceDB

## Overview

This project is a Node.js application that manages users and cards. It includes authentication with various roles (ghost, normal, business, admin), Google API integration for registration/login, user management functionalities such as getting all users, registering, logging in, updating, and deleting users. Additionally, it includes card management functionalities such as getting all cards, getting cards by ID, creating, updating, and deleting cards, as well as liking cards.

## Documenation

```
https://documenter.getpostman.com/view/27611306/2sA2xh3src#ef8176e4-dbe3-4689-a645-8b8c0848e37d
```

## How to Use

1. Make sure you have Node.js installed on your machine.
2. Clone this repository to your local machine.
3. Navigate to the project directory in your terminal.
4. Install dependencies by running npm install.
5. For development mode, start the server by running npm run dev, and for production mode simply do npm start.
6. Access the endpoints provided in the documenation https://documenter.getpostman.com/view/27611306/2sA2xh3src#ef8176e4-dbe3-4689-a645-8b8c0848e37d.

## Dependencies

1. **bcrypt**: Library for hashing passwords securely.
2. **chalk**: Utility for adding color to console output.
3. **compression**: Middleware for compressing HTTP responses.
4. **cors**: Middleware for enabling Cross-Origin Resource Sharing.
5. **cross-env**: Utility for setting environment variables cross-platform.
6. **debug**: Utility for adding debug logging statements.
7. **dotenv**: Library for loading environment variables from a `.env` file.
8. **express**: Web framework for Node.js, used for building web applications and APIs.
9. **express-rate-limit**: Middleware for rate limiting HTTP requests in Express applications.
10. **express-session**: Middleware for managing user sessions in Express applications.
11. **helmet**: Middleware for adding security headers to Express applications.
12. **joi**: Library for data validation, often used in combination with Express for request validation.
13. **jsonwebtoken**: Library for generating and verifying JSON Web Tokens (JWT) for user authentication.
14. **mongoose**: MongoDB object modeling tool for Node.js, used for interacting with MongoDB databases.
15. **morgan**: HTTP request logger middleware for Express applications.
16. **nanoid**: Library for generating unique IDs, particularly useful for creating short IDs.
17. **nodemon**: Utility for automatically restarting Node.js applications when file changes are detected.
18. **passport**: Authentication middleware for Node.js, used for authenticating requests.
19. **passport-google-oauth2**: Passport strategy for authenticating with Google using OAuth 2.0.
    
## License

This project is licensed to Yosef Yanushok.
