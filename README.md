# Swift

Interactive map tool to plan your trips.

Live demo of this application can be found under this [**link**](https://swift-pst0.onrender.com/).

![image](https://user-images.githubusercontent.com/72783924/223802632-42e92b2c-c230-4ece-9659-e468484327c0.png)


## Description

### Map tool
Swift provides a way for users to plan their routes using fully interactive map. The input takes two locations: origin and destination. After filling in both locations, the tool will then provide user with a planned route. Users can also choose between 3 travel modes:
- Driving
- Transit
- Walking

Each travel mode may produce a different route based on mulitple factors such as time, transport restrictions and more. The visualized result is also calculated via distance matrix that tells users the total distance of the trip in kilometers as well as duration of the trip. If there is no possible route found for the origin and destination, the application will produce a error message for the user.

### Authentication
Application has a full fledged built-in authentication hosted on [**Firebase**](https://firebase.google.com/). There are total of 4 methods users can use to authenticate in the application.
#### Normal
- Email/password

### OAuth providers
- Google
- Facebook
- GitHub

## Components
- Login page
- Landing page
- Map tool page

## Data

Data used in the map tool part of the application are being fetched from [**Google API**](https://console.cloud.google.com/)

API's used:
- Google Maps API
- Google Places Autocomplete
- Google Directions API
- Google Distance Matrix

## Built With
- React.js
- Vite

## Styling
- Tailwind CSS
- Framer Motion
- Fontawesome Icons

## Dependencies
- Firebase
- Firebase Hooks
- React Google Autocomplete
- React Google Maps API
- React Router

## Authors
David Poslušný
