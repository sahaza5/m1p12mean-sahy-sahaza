# Garage-app

## BACKEND

How to run the backend locally with mongoDB Compass?
-Go to the backend folder
-Make sure all packages are installed by writting npm i or npm install
-Make sure your mongoDB is running and mongoDB Compass connected
-Create a mock data of admin in the user collection of garage database(anontanio za raha ts azo eto) in mongoDB compass,

example:{
"username":"admin",
"password":"123",
}

-Write npm run start

-Test the API on postman or insomnia by using the following port

+++++To get all users as a get request:http://localhost:3000/api/users

+++++To get an user by id as a get request:http://localhost:3000/api/users/12344556 (user id here)

+++++To login as admin or mechanicien as a post request:http://localhost:3000/api/responsable/login/
In the body,write json username and password, for example
{
"username":"admin",
"password":"123"
}

+++++To register a client as a post request:http://localhost:3000/api/users/register/client
In the body,write json username and password only, no need the role to be set to client because by default it will, for example
{
"username":"sa",
"password":"123"
}

+++++To add a mechanicien as a post request:http://localhost:3000/api/users/add/mechanicien
In the body,write json username only because the password wil be set as 123 by default and the role will be mechanicien, for example
{
"username":"test",
}

+++++To add a mechanicien as a post request:http://localhost:3000/api/users/add/mechanicien
In the body,write json username and password, for example:
{
"username":"test",
"password":"123"
}

I have set a brand new login for the client(see inside users.controller.js) for security purpose and logic is slightly different (aza rarahina fa mbol resahiko)

+++++To login as a client as a post request:http://localhost:3000/api/client/login/
In the body,write json username and password, for example
{
"username":"sa",
"password":"123"
}

+++++Authentication.js added
It is used to authenticate an user to protect certain route
It needs a token which has to be set and sent to the backend.
It is in the headers and/or then authorization on postman or insomnia
When an user logged in, i have sent a token as a response.
When the front end or you want to test on postman/insomnia, we have to start the token with "Bearer ",for example:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Yzg2OThiMTMxNWZhY2MzYWNjMjhlMCIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDEyNjc1MTAsImV4cCI6MTc0MTM1MzkxMH0.9RdEskD2gjpxUdpfHriCRbcZtUj4sJKfIkv4xs66rAg

+++++Authorization.js added
It is used to check the user role if they are authorized to call some api.
NOTE: BOTH AUTHENTICATION AND AUTHORIZATION NEED A TOKEN

+++++Book apointment as a post request
http://localhost:3000/api/apointments/bookApointment,
body are title(required),description(not required), belongsTo(required), image(not required), in the body for example:{
"title":"Test repair",
"description":"This is my description"
}, therefore needs a header to be passed for authentication

++++Get all apointments specific for admin role only
http://localhost:3000/api/apointments/admin
It needs authentication and authorization, meaning must pass a header. Return array of apointment

++++Get all apointments specific for mechanicien role or role only
http://localhost:3000/api/apointments/mechanicien/?id
It needs authentication. Return array of apointment.
