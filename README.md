# HealthBooker🧑‍⚕️

<h3>Description :</h3> 
This is a webapp where you can book an appointment with a doctor.

👉[Click here](https://healthbooker.onrender.com/) to check out the app.
<br/>

### 📃Features :

<ul>
<li>User can register and login.</li>
<li>You can view all available doctors on the site.</li>
<li>You can also update your profile.</li>
<li>You can also send your queries to us from the contact section.</li>
<li>You can view all your notifications in the notifications tab.</li>
<li>There is also an admin managment system.</li>
<li>You can only access your notications, profile, appointments, doctor application if you're logged in</li>
<li>User can also apply for becoming a doctor on our site.</li>
<li>User can book an appointment with the doctor of their own choice.</li>
<li>Admin has the control to accept any user's request to become a doctor.</li>
<li>Admin can also remove any user or doctor from the site.</li>
<li>Doctor and Admin have the control to mark if the appointment is completed.</li>
<li>User will recieve notification if their application is accepted or rejected.</li>
<li>User and Doctor will recieve notification if their appointment is completed.</li>
<li>Doctor will recieve notification if someone booked appointment with them.</li>
<li>All the data will be stored on the database so there is no chance of losing you information.</li>
</ul>

<hr/>

### To run the project on your local machine

<ol>
<li>Download the project from the git repository</li>
<li>Add .env file in root directory for the backend which contains</li>

```
PORT=5000
MONGO_URI=YOUR_OWN_MONGODB_URL
JWT_SECRET=YOUR_JWT_SECRET
```
<li>Add .env file in client directory for the frontend which contains</li>

```

REACT_APP_SERVER_DOMAIN=http://127.0.0.1:5000/api
REACT_APP_CLOUDINARY_BASE_URL=https://api.cloudinary.com/v1_1/{CLOUD_NAME}/image/upload
REACT_APP_CLOUDINARY_CLOUD_NAME=YOUR_OWN_CLOUDINARY_CLOUD_NAME
REACT_APP_CLOUDINARY_PRESET=YOUR_OWN_CLOUDINARY_PRESET
```
**Note:** Replace the **{CLOUD_NAME}** with your own cloudinary cloud name

<li>To run the backend, go to root directory in the terminal and execute: npm start</li>
<li>To run the frontend, open a new terminal and run 'cd client/' to go to client directory and execute: npm start</li>
</ol>

### To access the admin dashboard

<ol>
<li>Download the project from the git repository</li>
<li>You need to create your own MongoDB instance and add the MongoDB url to the .env file</li>
<li>Register on the website and go to your MongoDB and manually change the 'isAdmin' field of the account you want to make admin in the DB to 'true' and then log in back on the site</li>
<li>Now you will be able to access the admin dashboard</li>
</ol>

### Home page

<img src="./client/src/images/full_pic.png" alt='home'/>

### Sign up page

<img src="./client/src/images/signup.png" alt='signup'/>

### Sign in page

<img src="./client/src/images/signin.png" alt='signin'/>

### Profile page

<img src="./client/src/images/profile.png" alt='profile'/>

### All Doctors page

<img src="./client/src/images/doctors.png" alt='doctors'/>

### Apply for doctor page

<img src="./client/src/images/docapply.png" alt='applyfordoctor'/>

### Admin all users dashboard

<img src="./client/src/images/users.png" alt='users'/>

### Admin all applications page

<img src="./client/src/images/applications.png" alt='applications'/>

### Book Appointment page

<img src="./client/src/images/bookappointment.png" alt='bookappointment'/>

### Users all appointments page

<img src="./client/src/images/userappointments.png" alt='appointments'/>

### Doctors all appointments page

<img src="./client/src/images/doctorappointments.png" alt='appointments'/>

### Notifications page

<img src="./client/src/images/notifications.png" alt='notifications'/>

<hr/>

### Tools and technologies used :

<a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a>
<a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a>
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="35" height="35"/> </a>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" alt="react" width="35" height="35"/> </a>
<a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a>
<a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://github.com/MarioTerron/logo-images/raw/master/logos/expressjs.png" alt="express"  height="20"/> </a>
<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a>
<a href="https://redux.js.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" alt="redux" width="40" height="40"/> </a>
<br/>

### Connect with me :

<a href="https://twitter.com/avinashdunna" target="blank"><img align="center" src="https://img.icons8.com/color/48/000000/linkedin.png" alt="Avinash905 | LinkedIn" height="35" width="35" /></a>
<a href="https://twitter.com/avinashdunna" target="blank"><img align="center" src="https://raw.githubusercontent.com/rahuldkjain/github-profile-readme-generator/master/src/images/icons/Social/twitter.svg" alt="avinashdunna" height="30" width="40" /></a>
