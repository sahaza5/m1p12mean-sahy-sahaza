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

+++++To user by id as a get request:http://localhost:3000/api/users/12344556 (user id here)

+++++To login as admin or mechanicien as a post request:http://localhost:3000/api/responsable/login/
In the body,write json username and password, for example
{
"username":"admin",
"password":"123"
}

+++++To register a client as a post request:http://localhost:3000/api/users/register/client
In the body,write json username and password only, no need the role to be set to client because by default it will be set, for example
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
I have set a brand new login for the client for security purpose and logic is slightly different (aza rarahina fa mbol resahiko)
