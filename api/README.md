# Routes
- for local development use localhost:8080/whatYouRequire as your URL

- for all routes that require an authenticated token, if authorisation fails for what ever reason, it will return:
    ```JSON
      { 
        "success": "false",
        "message": "Auth failed"
      } 

## USERS

- GET `/api/user/:userId` : returns user data
- POST `/api/user/signup` : creates a user
- POST `/api/user/login` : returns an authenticated bearer token
- PUT `/api/user/preferences/totalJobs/:userId` : updates totalJobs log in credentials
- PUT `/api/user/preferences/:userId` : updates user preferences
- DELETE `/api/user/:userId` : deletes a single user

### GET
**/api/user/:userId**

You must be authenticated to get data from this route; requires token.

- Returns user information

- Requires user id in url parameters
    
- Returns:
    - if successful 
        ```JSON
          { 
            "status": 200,
            "success": true,
            "user": {
              "_id": "5f102df825d2553212c30edf",
              "first_name": "Joe",
              "last_name": "Blogs",
              "jada_email": "joe@blogs.com",
              "preferences": {
                "reporting_email": "jerryjones@help.com",
                "job_title": "Junior Software Engineer",
                "location": "Dorset",
                "radius": 10,
                "session_limit": 20,
                "dkw": ["Software", "Engineer", "JavaScript"],
                "udkw": ["Lead", ".NET"],
                "ikw": ["Python", "OOP", "Windows"]
              }
            }
          }  
    - if unsuccessful
        ```JSON
          { 
            "status": 404,
            "success": false, 
            "message": "no valid entry found for user id"
          }
    - alternatively, if unable to connect
        ```JSON
          { 
            "status": 500,
            "success": false, 
            "error": "Relevant error message"
          }

### POST
**/api/user/signup**

- Takes email and password for JADA. Hashes the password before saving to DB and email must be unique.

- Required and sent through body:
  ```JSON
    { 
      "first_name": "Joe",
      "last_name": "Blogs",
      "email": "joe@blogs.com", 
      "password": "password"
    }
  
- Returns:
  - if successful 
      ```JSON
        {
          "success": true,
          "message": "User created",
          "user": {
            "_id": "5f27e36e21c43c2d33f3606b",
            "first_name": "Joe",
            "last_name": "Blogs",
            "email": "joe@blogs.com"
          }
        } 
  - if user email already exists
      ```JSON
        { 
          "status": 422,
          "success": false,
          "message": "Email exists"
        }
  - alternatively, if unable to connect to save
      ```JSON
        { 
          "status": 500,
          "success": false, 
          "message": "Not able to update document"
        }
    
### POST
**/api/user/login**

- Requires email and password for JADA log in and returns a bearer token if successful. 

- Required and sent through body (example):
  ```JSON
    { 
      "email": "joe@blogs.com", 
      "password": "password"
    }
  
- Returns:
  - if successful 
      ```JSON
        {
          "success": true,
          "message": "Auth successful",
          "user_id": "5f102df825d2553212c30edf",
          "token": "token"
        } 
  - if unsuccessful 
      ```JSON
        { 
          "success": "false",
          "message": "Auth failed"
        } 
      
### PUT
**/api/user/preferences/totalJobs/:userId**

You must be authenticated to update data from this route; takes bearer token.

- Takes email and password for totalJobs. Encrypts the password before saving to DB.

- Required and sends through body either of the following:
    ```JSON
      { 
        "email": "valid@email.com", 
        "pass": "password"
      }
    
- Returns:
    - if successful 
        ```JSON
          { 
            "status": 200,
            "success": true, 
            "message": "Successfully updated totalJobs credentials"
          }  
    - if unsuccessful, error message depends on input, i.e. 'Email or password field empty'
        ```JSON
          { 
            "status": 400,
            "success": false, 
            "message": "Depending on caught error"
          }
    - alternatively, if unable to connect to DB
        ```JSON
          { 
            "status": 500,
            "success": false, 
            "message": "Not able to update document"
          }

### PUT
**/api/user/preferences/:userId**

You must be authenticated to update data from this route; takes bearer token.

- All preferences are optional and can be sent in the same request

    - `{ "email": "valid@email.com" }` : email user wants session report sent to.
    - `{ "job_title": String }` : type string, desired job title.
    - `{ "location": String }` :  type string, desired location.
    - `{ "radius": Number }` : type number, desired search radius. Specific options required: 0, 5, 10, 20, 30.
    - `{ "session_limit": Number }` : type number, desired apply limit. Limits how many applications applied in a given session.
    - `{ "dkw": Array }` : type Array (js object), dkw stands for 'desired keywords', an array of single desired keywords. 
    - `{ "udkw": Array }` : type Array (js object), udkw stands for 'undesired keywords', an array of single undesired keywords. 
    - `{ "ikw": Array }` : type Array (js object), ikw stands for 'interested keywords', an array of single interested keywords. 
    
    - an example request might be:
    ```JSON
      { 
        "job_title": "Junior Software Engineer",
        "location": "Bath",
        "radius": 20,
        "session_limit": 40,
        "dkw": ["Software", "Engineer", "JavaScript", "Agile", "PHP"],
        "udkw": ["Lead", ".NET", "C#"],
        "ikw": ["Python", "OOP", "Windows", "LAMP"]
      }
    
    
- Returns:
    - if successful, count will state how many property values have changed and if changed, value of returned preference will state true, otherwise defaults to false.
        ```JSON
          { 
            "status": 200,
            "success": true, 
            "message": "Successfully updated user preferences",
            "preferences_updated": {
              "count": 0,
              "email": false,
              "job_title": false,
              "location": false,
              "radius": false,
              "session_limit": false,
              "dkw": false,
              "udkw": false,
              "ikw": false
            }
          }
    - if unsuccessful, error message depends on input, i.e. 'Invalid radius option. Must be set to either 0, 5, 10, 20 or 30'
        ```JSON
          { 
            "status": 400,
            "success": false, 
            "message": "Depending on caught error"
          }
    - alternatively, if unable to connect to DB
        ```JSON
          { 
            "status": 500,
            "success": false, 
            "message": "Not able to update document"
          }

### DELETE
**/api/user/:userId**

You must be authenticated to delete user from this route; takes bearer token.

- Requires userId to be passed through url parameters.
  
- Returns:
  - if successful 
      ```JSON
        {
          "message": "User deleted"
        } 
  - if unsuccessful 
      ```JSON
        { 
          "success": "false",
          "message": "Auth failed"
        }
    
## SESSIONS

- GET `/api/sessions/` : returns all sessions
- GET `/api/sessions/:sessionId` : returns a single session
- POST `/api/sessions/` : logs a session to DB

- Runtime logic:
    - POST `/api/sessions/totalJobsLogIn` : navigates to totalJobs and logs in

### GET
**/api/sessions/**

You must be authenticated to get data from this route; requires token.

- Returns all sessions data
    
- Returns:
    - if successful (example) :
        ```JSON
          { 
            "response": {
              "status": 200,
              "count": 39,
              "sessions": [
                {
                  "_id": "5efdbddc2b498306b5f98de8",
                  "session_id": "202007025efdbdc0c3f14b06b7710f5e",
                  "session_date": "2020-07-02",
                  "session_time": "11:58:08",
                  "total_processed": 20,
                  "newly_processed": 8,
                  "successfully_applied": 3,
                  "skipped_applications": 5,
                  "dkw_overview": ["DEVELOPER", "SOFTWARE", "ENGINEER", "GRADUATE"],
                  "dkw_all": ["DEVELOPER", "SOFTWARE", "ENGINEER", "DEVELOPER", "GRADUATE", "ENGINEER", "GRADUATE"],
                  "udkw_overview": ["TRAINEESHIP", "CONSULTANT", "LEAD"],
                  "udkw_all": ["TRAINEESHIP", "CONSULTANT", "LEAD", "LEAD"],
                  "top24_overview": ["JAVA", "SCALA"],
                  "top24_all": ["JAVA", "SCALA", "JAVA", "JAVA"],
                  "locations_overview": ["UK", "MOUNT"],
                  "locations_all": ["UK", "MOUNT", "MOUNT", "UK"]
                },
                { }
              ]
            }
          }
    - if unsuccessful
        ```JSON
          { 
            "status": 404,
            "success": false, 
            "message": "no data in db"
          }
    - alternatively, if error caught
        ```JSON
          { 
            "status": 500,
            "success": false, 
            "error": "Relevant error message"
          }
      
### GET
**/api/sessions/:sessionId**

You must be authenticated to get data from this route; requires token.

- Requires session id in url parameters and returns relevant session data.
    
- Returns:
    - if successful (example) :
        ```JSON
          { 
            "_id": "5efdbddc2b498306b5f98de8",
            "session_id": "202007025efdbdc0c3f14b06b7710f5e",
            "session_date": "2020-07-02",
            "session_time": "11:58:08",
            "total_processed": 20,
            "newly_processed": 8,
            "successfully_applied": 3,
            "skipped_applications": 5,
            "dkw_overview": ["DEVELOPER", "SOFTWARE", "ENGINEER", "GRADUATE"],
            "dkw_all": ["DEVELOPER", "SOFTWARE", "ENGINEER", "DEVELOPER", "GRADUATE", "ENGINEER", "GRADUATE"],
            "udkw_overview": ["TRAINEESHIP", "CONSULTANT", "LEAD"],
            "udkw_all": ["TRAINEESHIP", "CONSULTANT", "LEAD", "LEAD"],
            "top24_overview": ["JAVA", "SCALA"],
            "top24_all": ["JAVA", "SCALA", "JAVA", "JAVA"],
            "locations_overview": ["UK", "MOUNT"],
            "locations_all": ["UK", "MOUNT", "MOUNT", "UK"]
          }
    - if unsuccessful
        ```JSON
          { 
            "status": 404,
            "success": false, 
            "message": "no data in db"
          }
    - alternatively, if error caught
        ```JSON
          { 
            "status": 500,
            "success": false, 
            "error": "Relevant error message"
          }