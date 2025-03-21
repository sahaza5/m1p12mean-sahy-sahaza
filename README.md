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

++++Get all mechanicien as a GET request
http://localhost:3000/api/users/

++++Get all clients as a GET request
http://localhost:3000/api/users/client

++++Get a single user of a client id as a GET request
http://localhost:3000/api/users/1231(id:user Id)

++++Set user profile as a PATCH request
http://localhost:3000/api/users/setProfile, the body is {pswd?,name?,surname?,txt?,email?,phone?}

++++Register a car as POST request
http://localhost:3000/api/vehicule/register/werqwe(id:user id), body field are name, description,image. NB: CREATE A FOLDER CALLED images IN YOUR BACKEND FIRST!!!!!!!!!!!!!!!!!!!!!!!!!!!!

++++Get all vehicules of a client id as a GET request
http://localhost:3000/api/vehicule/1234552(id:userID)

++++Get vehicule by id as a GET request
http://localhost:3000/api/vehicule/1234552(id: vehicule id)

++++Update a vehicule by id as a PATCH request
http://localhost:3000/api/vehicule/1234552(id: vehicule id), the body can be {name?,description?,image?}

++++Book apointment as a POST request
http://localhost:3000/api/apointments/bookApointment/userId(67db2bb77d0f43c267e0857c)/vehicleId(12123234234), body is {description, date}

++++Get all apointments as a GET request
http://localhost:3000/api/apointments/admin/

++++Get all apointment for client as a GET request
http://localhost:3000/api/apointments/client/id(user id 67db2bb77d0f43c267e0857c)

++++Get all apointment for mechanicien as a GET request
http://localhost:3000/api/apointments/mechanicien/id(mechanicien id 67db2bb77d0f43c267e0857c)

++++Get apointment by id as a GET request
http://localhost:3000/api/apointments/apointmentId67dc6c0ef4ae6fac83e96bba

++++Set/update apointment

++++Cancel apointment

++++Disable employee/user

++++Create task

++++Get all tasks

++++Get task mechanicien

++++Get task by id

++++Update task
