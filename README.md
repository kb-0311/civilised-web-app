# Civilised-Web-App
This is the main repository for the Civilised-Social-Media-Web-App.
The Complete project consists of 3 major components ->

1. **The Civilised-Social-Web-App**(Done)- This is the main repository of the project.Deployed on [Heroku](https://civilised-social-web-app.herokuapp.com/welcome)
2. **Civilised Chat, The Real-Time Chat Component**(Done)-The real time chat component of the web app deployed externally on [Netlify as Civilised-Chat](https://iiitp-civilised.netlify.app/) and the github repository is deployed [here](https://github.com/kb-0311/civilised-chat)
3. **The Announcements and Notices within Civilised-Web-App** (Remaining)


## The Architecture
![Untitled (1080 × 1920 px) (1920 × 1080 px) (2400 × 1080 px) (1)](https://user-images.githubusercontent.com/96020697/185734831-58eb7df9-0af6-4209-bb97-96ce2706cdb4.png)


## Tech-Stack Utilized

### **The Civilised-Social-Web-App**(Done)-
1. `React` - for creating and implementing reusable custom components and serving the site.

2. `Redux` - for centralizing the data storage, utilizing axios within the actions to make api requests and interact with the server, and global client-side state management.

3. `NodeJs` - for  creating the server and  using the asyncronous call-back based single-threaded nature as well as utlizing background threads for blocking tasks made it the best choice for writing the server-side code for the application.

4. `ExpressJS` - for Implementing the MVC architecture to the server-side code , creating apis with custom routes and http METHODS, used express properties for creating a custom error middle-ware for the backend as well as a middleware which validates the authentication status of the user on the server-side.

4. `MongoDB`- for storing user data and their posts, the images are stored with their cloudinary bucket public id and url to be fetched on the server-side and rendered on the client-side.

5. `Cloudinary`- the image storage bucket as well as file management utility for this application.

### **[The Civilised Forum and Notices](https://github.com/kb-0311/civilised-forum-and-notices)**(Done)-
1. `NextJS` - for server-side rendering or static side genaration to the served client whichever is more optimized approach at a given time and implmenting React under the hood for creating and implementing reusable custom components and serving the site.

2. `TypeScript` - for defining types for the objects and data members exhanged between the apollo client and graphql server. 

3. `GraphQL` -  Utilized to make the backend APIs fast, flexible, and developer-friendly by fetching only data fields necessary from multiple data sources, here in this case a remote deployed postgresQL Database. Used Query and Mutations in the graph server for CRUDifying the PostgresQL instance.

4. `Apollo CLent` - Implemented Apollo Client to define,implement and utilize the server side graphQL Queries and Mutations. Implemenented in memory caching to opimize the entire User experience by making the time intensive DB round trip only when necessary.  

2. `NextAuth` - for implementing OAuth 2.0 Google Strategy.

### **[The Civilised Chat](https://github.com/kb-0311/civilised-chat)**(Done)-
1. `React` - for creating and implementing resuable custom components and serving the site.

2. `NodeJs` - for  creating the server and using the asyncronous call-back based single-threaded nature as well as utlizing background threads for blocking tasks made it the best choice for writing the server-side code for the application.

3. `Socket.io` - for implementing web-sockets on server connection and for emitting and handling socket events to provide real-time data streaming.  



