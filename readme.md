Start the backend app

1. Run the command npm install.
2. Run command npm start
3. Make the first api call as localhost:8080/api/ to initialise the app (It will create the geoJSON from the provided KML file)
4. Make the api call localhost:8080/api/find_outlet and send long_lat in body (order should be longitude,latitude like {long_lat:"16.295191,48.195019"})
5. The API will respond with the Locations that can serve the input point

For the Frontend app

1. Run the index.html
The app is not complete as the google geo tagging account needs a credit card.
I can complete the application given more time and an API Key.

Tech Used

Backend
1. Restify

Frontend
1. Angular js

Current Issues
1. The API will respond with all the restaurants in the area and not the closest one
2. Proper Sanity checks have to be implemented
3. Frontend needs to be completed

 