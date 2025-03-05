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

+++++To login as admin as a post request:http://localhost:3000/api/admin/login/
In the body,write json username and password, for example
{
"username":"admin",
"password":"123"
}
