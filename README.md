# Play Sports Network Interview

If you are running the application locally:
1. In order to compile in the terminal at the root folder of the project enter: run 'npm install'

2. In order to compile in the terminal at the root folder of the project enter:  'grunt --env=dev'

3. In order to run the program with nodemon watch run in the terminal in the root folder: 'npm test'     OR run 'npm start' for a normal single start. 

4. In order to populate the endpoints collection on the azure mongodb, run a REST api client e.g. Postman then send a POST request to http://localhost:5050/populate-endpoints-collection with an example body of: 

[
	{
	    "endpointName": "firstEndpoint",
        "method": "GET",
        "uri":"http://localhost:5050/firstendpoint"
	},
	{
	    "endpointName": "secondEndpoint",
        "method": "GET",
        "uri":"http://localhost:5050/secondendpoint"
	}
]

and the headers of: 

authorization:t9UmQ3W^MBDtVGht¬PrXPQ,on(6E^7Yz0EW
Content-Type:application/json


5. In order to hit the return the responses from the requested endpoints please do a GET request to:
http://localhost:5050/data-request/:requestedJSONEndpoints

where ':requestedJSONEndpoints' is a comma seperated string of the data sources you want to return.
e.g.:
http://localhost:5050/data-request/firstendpoint&secondendpoint

