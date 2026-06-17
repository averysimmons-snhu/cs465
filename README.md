Travlr Getaways Full Stack Web Application

Project Overview

Travlr Getaways is a full stack travel booking web application built with the MEAN stack. The project includes a public customer-facing website and an admin single-page application. The customer-facing side allows users to view travel information, while the admin side allows authorized users to manage trip packages through secure login authentication.

This project uses MongoDB, Express, Angular, and Node.js. Express handles the server and public website routes. MongoDB stores trip and user data. Angular provides the admin SPA with reusable components for viewing, adding, editing, and deleting trip data. JSON Web Tokens are used to help secure admin features.

Architecture

In this project, I used different types of frontend development. The customer-facing side started as static HTML, CSS, and JavaScript. This made the basic website easy to view in the browser, but it was not very flexible. Later, I moved the static HTML into Express and Handlebars templates. This allowed the server to render pages dynamically and reuse shared layout sections like headers and footers.

The Angular SPA was different because it runs more of the application logic in the browser. Angular uses components, services, models, and routing to organize the admin side of the application. Compared to the Express HTML pages, the SPA feels more interactive because it can update parts of the page without loading a new page every time.

The backend used MongoDB because the project needed a flexible NoSQL database to store trip data in a JSON-like format. MongoDB works well with Node.js and Express because the data structure is close to the way JavaScript handles objects. This made it easier to store and retrieve trip records with fields such as code, name, length, start date, resort, price, image, and description.

Functionality

JSON is different from JavaScript because JavaScript is a programming language, while JSON is a data format. JSON stores data in a simple text structure using key-value pairs. In this project, JSON helped connect the frontend and backend because the API sent trip data from MongoDB to the Angular SPA in JSON format. The frontend could then read that data and display it in trip cards.

There were several points where I refactored code to improve functionality and efficiency. First, I moved static HTML pages into Handlebars templates so repeated code could be reduced. Then I separated routes, controllers, and views using the MVC pattern. Later, I moved database and API logic into the app_api folder to separate the API from the customer-facing website. In Angular, I refactored the trip display into reusable components such as the trip listing and trip card components.

Reusable UI components were helpful because they made the application easier to maintain. Instead of rewriting the same trip card layout multiple times, one component could be reused for each trip. This keeps the code cleaner and makes future changes easier.

Testing

Testing was an important part of the full stack process. I tested API endpoints with Postman to make sure the server returned the correct data. A GET request was used to retrieve all trips or one specific trip. A POST request was used to add new trip data. A PUT request was used to update an existing trip. A DELETE request was used to remove a trip.

Endpoints are the URLs that allow the frontend and backend to communicate. For example, /api/trips returns all trips, while /api/trips/:tripCode returns one trip based on its trip code. These endpoints connect the Angular SPA to the Express backend and MongoDB database.

Security made testing more complicated because protected routes required authentication. Before testing protected POST, PUT, or DELETE requests, I had to register or log in a user and receive a valid JSON Web Token. That token then had to be included in the request header. This extra step helps protect the admin features, but it also means testing must check both successful and failed authentication attempts.

Reflection

This course helped me better understand how the different parts of a full stack application work together. Before this project, I had some experience with HTML and JavaScript, but this course helped me see how frontend, backend, database, API, and security pieces connect in one complete application.

I developed stronger skills with Node.js, Express, MongoDB, Mongoose, Angular, RESTful APIs, MVC routing, and JWT authentication. I also gained more experience using GitHub, Postman, MongoDB Compass, and the command line. These skills are useful because many software development jobs require the ability to understand and work across multiple parts of an application.

This project also helped me improve my troubleshooting skills. I had to work through setup problems, dependency issues, database connection errors, API errors, and security token problems. Those challenges helped me better understand how important testing and debugging are in full stack development.

Overall, this course helped me become more confident in building and explaining a full stack web application. I can now better describe how a modern web application is structured and how frameworks can be used to build more organized and maintainable software.
