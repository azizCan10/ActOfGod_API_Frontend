# Act of God API Frontend

## Features

* Admin login
* CRUD location operations

## Technologies
* React
* Bootstrap
* Google Maps

## Getting Started
To get started with this project, you will need to have the following installed on your local machine:

* Node.js

To build and run the project, follow these steps:

* Install the backend first: [Act of God API](https://github.com/ahmettyavzz/ActOfGod_API)
* Clone the repository: `git clone https://github.com/azizCan10/ActOfGod_API_Frontend.git`
* Navigate to the project directory
* Install dependencies: `npm install`
* src/modals/location/CreateLocationModal on line 93 and UpdateLocationModal on line 94;
```js
<LoadScript googleMapsApiKey="YOUR_API_KEY">
```
Put your Google Maps API Key instead of "YOUR_API_KEY"
* Start the application: `npm start`

-> The application will be available at http://localhost:3000