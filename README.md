# Civilised-Web-App
This is the main repository for the Civilised-Social-Media-Web-App.
The Complete project consists of 3 major components ->

1. **The Civilised-Social-Web-App**(Done)- This is the main repository of the project.Deployed on [Heroku](https://civilised-social-web-app.herokuapp.com/welcome)
2. **Civilised Chat, The Real-Time Chat Component**(Done)-The real time chat component of the web app deployed externally on [Netlify as Civilised-Chat](https://iiitp-civilised.netlify.app/) and the github repository is deployed [here](https://github.com/kb-0311/civilised-chat)
3. **The Announcements and Notices within Civilised-Web-App** (Remaining)


## The Architecture
![Untitled (1080 × 1920 px) (1920 × 1080 px)](https://user-images.githubusercontent.com/96020697/179420574-5f7212e1-fb0a-42f1-8a2e-8314f8e5da09.png)

## Tech-Stack Utilized

### **The Civilised-Social-Web-App**(Done)-
1. `React` - for creating and implementing resuable custom components and serving the site.

2. `Redux` - for centralizing the data storage, utilizing axios within the actions to make api requests and interact with the server, and global client-side state management.

3. `NodeJs` - using the asyncronous call-back based single-threaded nature as well as utlizing background threads for blocking tasks made it the best choice for writing the server-side code for the application.

4. `ExpressJS` - for Implementing the MVC architecture to the server-side code , creating apis with custom routes and http METHODS, used express properties for creating a custom error middle-ware for the backend as well as a middleware which validates the authentication status of the user on the server-side.

4. `MongoDB`- for storing user data and their posts, the images are stored with their cloudinary bucket public id and url to be fetched on the server-side and rendered on the client-side.

5. `Cloudinary`- the image storage bucket as well as file management utility for this application.


