# Garage-app

## BACKEND

How to run the backend locally with mongoDB Compass?
-Go to the backend folder
-Make sure all packages are installed by writting npm i or npm install
-Make sure your mongoDB is running and mongoDB Compass connected

-Write npm run start

+++++To login as a POST request:http://localhost:3000/api/login
In the body,write json email and pswd, for example
{
"email":"test@gmail.com",
"pswd":"123"
},return an object of {user,token}

+++++To register a client as a POST request:http://localhost:3000/api/users/register
In the body,write json email,pswd,userType,txt, for example
{
"email":"test@gmail.com",
"pswd":"123",
"txt":"test",
"userType:"client"
},return an object of {user,token}

-Test the API on postman or insomnia by using the following port

+++++To get all users as a GET request:http://localhost:3000/api/users

+++++To get an user by id as a GET request:http://localhost:3000/api/users/12344556 (user id here)

+++++To add a mechanicien as a POST request:http://localhost:3000/api/users/add/mechanicien
In the body,write json username only because the password wil be set as 123 by default and the role will be mechanicien, for example
{
"username":"test",
}

+++++To add a mechanicien as a POST request:http://localhost:3000/api/users/add/mechanicien
In the body,write json username and password, for example:
{
"username":"test",
"password":"123"
}

I have set a brand new login for the client(see inside users.controller.js) for security purpose and logic is slightly different (aza rarahina fa mbol resahiko)

++++Delete a mechanicien as a PATCH request http://localhost:3000/api/users/delete/mechanicien

+++++To login as a client as a POST request:http://localhost:3000/api/users/client/login/
In the body,write json username and password, for example
{
"username":"sa",
"password":"123"
}

+++++To set password a PATCH request:http://localhost:3000/api/client/setPassword/
In the body,write json username and password, for example
{
"password":"123"
}. User should be authenticated, so a header should be passed on.

+++++Authentication.js added
It is used to authenticate an user to protect certain route
It needs a token which has to be set and sent to the backend.
It is in the headers and/or then authorization on postman or insomnia
When an user logged in, i have sent a token as a response.
When the front end or you want to test on postman/insomnia, we have to start the token with "Bearer ",for example:Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Yzg2OThiMTMxNWZhY2MzYWNjMjhlMCIsInVzZXJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDEyNjc1MTAsImV4cCI6MTc0MTM1MzkxMH0.9RdEskD2gjpxUdpfHriCRbcZtUj4sJKfIkv4xs66rAg

+++++Authorization.js added
It is used to check the user role if they are authorized to call some api.
NOTE: BOTH AUTHENTICATION AND AUTHORIZATION NEED A TOKEN

+++++Book apointment as a POST request
http://localhost:3000/api/apointments/bookApointment,
body are description(required),car(id from front) in the body for example:{
"description":"This is my description","car":"objId1234"
}, therefore needs a header to be passed for authentication(the req.user.id will be used to get the id)

++++Get all apointments specific for admin role only as a GET request
http://localhost:3000/api/apointments/admin
It needs authentication and authorization, meaning must pass a header. Return array of apointment

++++Get all apointments specific for client role as a GET request
http://localhost:3000/api/apointments/client/:id
It needs authentication, meaning must pass a header. Return array of apointment

++++Get all apointments specific for mechanicien role or role only
as a GET request http://localhost:3000/api/apointments/mechanicien/?id
It needs authentication. Return array of apointment.

++++Approve and set apointment (APPROVED and REPAIRING) as a PATCH request
http://localhost:3000/api/apointments/setApointment/67cfa17b6ea35689db1eb56a(apointment id), the body contain both the date and assigned to(mechanicien)

++++Cancel apointment as a DELETE request http://localhost:3000/api/apointments/cancelApointment/67cfa17b6ea35689db1eb56a(apointment id),

++++Register a car as POST request
http://localhost:3000/api/vehicule/register, body field are name, model,licensePlate

++++Get all vehicules of a client id as a GET request
http://localhost:3000/api/vehicule/1234552(userID)

++++Update a vehicule by id as a PATCH request http://localhost:3000/api/vehicule/1234552(vehicule id)

++++Get vehicule by id as a GET request
http://localhost:3000/api/vehicule/1234552(vehicule id)

++++Get all repaired car as GET request http://localhost:3000/api/repair

++++Get repair car by id as a GET request, http://localhost:3000/api/repair/67cfa47c0ce6474ce81672f0

++++Repairing a car by id as a PATCH request, http://localhost:3000/api/repair/update/67cfa47c0ce6474ce81672f0
