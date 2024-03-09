- [Model link](https://app.eraser.io/workspace/Z0NTJLYeIIp8VZ4LQn0j?origin=share)



# Summary of this project

Project is to create  To-Do List application using JavaScript for both the frontend and backend. The application should allow users to add, edit, delete.

In this project I have worked  on both backend and frontend using JavaScript

In backend I have used the nodejs , express , monngo  , mongooses , jwt , bcrypt , and many more...

I have create our database on cloud (Mongo Atlas) and used almost all type of CRUD operations like create , delete , update. 


I used aggregation pipeline (lookup) to fetch user TODO by  userId  and also used mongoose hooks to hash the password just before store in database.

I have created the two schema UserSchema and TODOlistSchema which are connect to each other by userId.

I add custom middlewares to verifyJWT for loged in user.

I have inject many custom function to our schema like ispasswordCorrect , generateRefreshToken , generateAccessToken.


In frontend I have used react , react-router-dom , react hooks , html , css , tailwind.

I have also tried to use context api for user authentication
but due to less time period, I can't. I used another method to authenticate the user.


Project uses all standard practices like JWT, bcrypt, access tokens, refresh Tokens and many more..

###  End points of project : 
1. User Registration
2. User Login
3. User Logout
#### Logedin user end point
4. Add TODO 
5. Delete TODO
6. Update TODO
7. Fetch TODO


I can also add much more end point like update user profile ,change password , forget password and many more...


Note : Please go through my code part specially backend code.
I used all standard practices like JWT, bcrypt, access tokens, refresh Tokens.

