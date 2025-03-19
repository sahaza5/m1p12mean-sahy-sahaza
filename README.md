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

++++Register a car as POST request
http://localhost:3000/api/vehicule/register/werqwe(id:user id), body field are name, description,image. NB: CREATE A FOLDER CALLED images IN YOUR BACKEND FIRST!!!!!!!!!!!!!!!!!!!!!!!!!!!!

++++Get all vehicules of a client id as a GET request
http://localhost:3000/api/vehicule/1234552(id:userID)

++++Get vehicule by id as a GET request
http://localhost:3000/api/vehicule/1234552(id: vehicule id)
