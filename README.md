# habit-app
# Habyte
### Instructions for use

`Npm install`  - Install project dependencies <br/>

Run `CD backend` from root <br/>

Run `knex migrate:latest`, followed by `knex seed:run`   - Generates tables in DB and populates with existing data<br/>

Run `Node Server.js` in backend folder of project directory - initialises Database server<br/>

Change directory to project root, Run `NPM start` - Initialises Frontend server<br/>


##### For Tests:

Frontend:
Run `NPM test -- --coverage a`  - Runs all frontend tests followed by coverage. <br/>

Backend:
Run `NPM run test2` - Run all backend tests. Upon CTRL + C to be presented with coverage <br/>





## Rorie, Keir, Liam and Susan

For the rest of the week you will be working to create a habit tracker.
Your website should have the following functionality for users:
- Users should be able to login
- Users should be able to choose a habit they want to track (e.g water, exercise, 8 hours of sleep) and choose the frequency at which they want to track the habit.
- Users should be able to track a habit and mark it as complete for the day.
- Users should be able to see if they have completed a habit for the day and see if they have a streak of completing their habits.

Your website should have the following technical functionality:
- Developers should host a database to store the daily information about users.

---
## Standups
### Tuesday
#### What we achieved yesterday.

-Created a design template and planned the components that we would need.<br/>
-Tried multiple database solutions to find the best fit for our project. <br/>
-Created the schema for our database tables. <br/>
-Bootstraped the frontend with create-react-app. <br/>
-Created Log in template.<br/>


#### What we aim to achieve today.
-Build the routes for the API. <br/>
-Create a basic frontend. <br/>
-Flesh out log in and sign up.<br/>

#### Any blockers (things that are going to stop you achieving you aim)
-LogIn/SignUp can't be started until UserAuth routes have been established <br/>


### Wednesday
#### What you achieved yesterday.
-Routes established(api/ user auth) <br/>
-API routes tested <br/>
-Frontend skeleton established <br/>



#### What you aim to achieve today.
-Connect front & back end - display retrieved data <br/>
-Log-in/sign-up functionality <br/>
-Test UserAuth Routes <br/>


#### Any blockers (things that are going to stop you achieving you aim)
-n/a

### Thursday
#### What you achieved yesterday.
-Begun frontend testing  <br/>
-Finished backend testing (UserAuth Routes) <br/>
-Connected front&backend (displaying data) <br/>
-Log-in / Sign-up functionality  <br/>
-Delete habit button <br/>
-Begun work on updating habit streak feature <br/>


#### What you aim to achieve today.
-Finish frontend testing <br/>
-Finish habit streak feature <br/>
-Styling  <br/>


#### Any blockers (things that are going to stop you achieving you aim)
-n/a

### Friday
#### What you achieved yesterday.
-Styling finished <br/> 
-Completed app functionality <br/>

#### What you aim to achieve today.
-Finish Frontend tests <br/>

#### Any blockers (things that are going to stop you achieving you aim)
n/a

---
### What we have learned
Rorie: Alot more in React. How to redirect. Cors troubleshooting. PUT & DELETE Requests<br/>
Keir: Ensure files are staged before committing.<br/>
Susan: How to create more meaningful tests <br/>
Liam: Further developed understanding of backend route testing <br/>
All: Coverage interface (/coverage/index.html)

### What challenges we overcame
Rorie: Sending PUT/DELETE request from browser / solution: Using .history  /// Streaking updating logic <br/>
Keir: Database Local Vs. Hosted <br/>
Susan: Various frontend testing bits <br/>
Liam: using ElephantSQL / Solution: changing to Sqlite <br/>

### What we struggled with
Rorie: testing  /  Using PostGres&Elephant <br/>
Keir: testing  /  Using PostGres&Elephant  <br/> 
Susan: testing  /  Using PostGres&Elephant <br/>
Liam: testing  /  Using PostGres&Elephant <br/>

### What we would do differently next time
Rorie: Learn complex testing (Mock functions & data / promise.resolve/reject) <br/>
Keir: Learn complex testing (Mock functions & data / promise.resolve/reject) <br/>
Susan: Learn complex testing (Mock functions & data / promise.resolve/reject) <br/>
Liam: Learn complex testing (Mock functions & data / promise.resolve/reject) <br/>
