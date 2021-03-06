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

- Required and sends through body the following:
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
    
## APPLICATIONS

- GET `/api/applications/` : returns all applications
- GET `/api/applications/:applicationId` : returns an application
- GET `/api/applications/session/:sessionId` : returns all applications with stated session id
- GET `/api/applications/user/:userId` : returns all applications with stated user id
- POST `/api/applications/` : logs an application to DB
- DELETE `/api/applications/:applicationId` : deletes an application based on application id
- DELETE `/api/applications/user/:userId` : deletes all applications with relevant user id

### GET
**/api/applications/** <br>
**/api/applications/:applicationId** <br>
**/api/applications/session/:sessionId** <br>
**/api/applications/user/:userId**

You must be authenticated to get data from this route; requires token.

These routes return applications from the DB.
- When getting all applications, applications by session id, or by user id, a successful request will return (example) an array of application objects:
    ```JSON
     { 
       "response": {
         "status": 200,
         "count": 1160,
         "applications": [
           {
             "_id": "5efdbdd52b498306b5f98de3",
             "user_id": "5f102d3ce9647c31b2f1e922",
             "session_id": "202007025efdbdc0c3f14b06b7710f5e",
             "session_date": "2020-07-02",
             "session_time": "11:58:08",
             "job_title": "Graduate",
             "totalJobs_id": "90323856",
             "apply_attempted": false,
             "interested": true,
             "salary": "Competitive",
             "company": "CGI Group",
             "job_type": "Permanent",
             "job_posted": "Today",
             "location": "Mount Pleasant, Chippenham (SN14), SN14 0GB",
             "job_url": "https://www.totaljobs.com/job/graduate/cgi-group-job90323856",
             "job_contact": "Recruitment Team",
             "totalJobs_ref": "Totaljobs/J0120-0020",
             "found_dkw": ["SOFTWARE", "AGILE", "GRADUATE"],
             "found_udkw": [],
             "found_top24": ["JAVA", "C++", "C#", "PYTHON"]
           },
           { }
         ]
       }
     }

- When requesting a single application by application id, the response is the same except instead of an array of `applications`, a single `application` is returned. For example:
    ```JSON
    { 
      "response": {
        "status": 200,
        "count": 1,
        "application": {
          "_id": "5efdbdd52b498306b5f98de3",
          "user_id": "5f102d3ce9647c31b2f1e922",
          "session_id": "202007025efdbdc0c3f14b06b7710f5e",
          "session_date": "2020-07-02",
          "session_time": "11:58:08",
          "job_title": "Graduate",
          "totalJobs_id": "90323856",
          "apply_attempted": false,
          "interested": true,
          "salary": "Competitive",
          "company": "CGI Group",
          "job_type": "Permanent",
          "job_posted": "Today",
          "location": "Mount Pleasant, Chippenham (SN14), SN14 0GB",
          "job_url": "https://www.totaljobs.com/job/graduate/cgi-group-job90323856",
          "job_contact": "Recruitment Team",
          "totalJobs_ref": "Totaljobs/J0120-0020",
          "found_dkw": [],
          "found_udkw": [],
          "found_top24": []
        }
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

### POST
**/api/applications/**

This route adds an application to DB

- When logging an application to DB; 
    - the following fields are required:
        - `user_id` : the user's id
        - `session_id` : the current session the application was processed on
        - `session_date` : the current session date
        - `session_time` : the current session time
        - `job_title` : job title of application
        - `totalJobs_id` : the id totalJobs uses
        - `apply_attempted` : whether JADA clicked the 'apply' button on an application
        - `found_dkw` : an _ARRAY_ of desired keywords found
        - `found_udkw` : an _ARRAY_ of undesired keywords found
        - `found_top24` : an _ARRAY_ of interested keywords found
    - the following fields are optional:
        - `interested` : a _BOOL_ stating whether the application passed preference criteria
        - `salary` : a _STRING_ of salary quoted on application (NOT consistently numerical)
        - `company` : the company associated with the application
        - `job_type` : whether the role is permanent, part-time, contract etc
        - `job_posted` : based on the time application processed, how old job post is
        - `location` : location quoted on application
        - `job_url` : the job add url
        - `job_contact` : the contact associated with the application
        - `totalJobs_ref` : a reference for the application given by totalJob's user (the recruiter)

- An example of an application sent through body (example):
    ```JSON
      {
        "_id": "5efdbdd42b498306b5f98de2",
        "user_id": "5f102d3ce9647c31b2f1e923",
        "session_id": "202007025efdbdc0c3f14b06b7710f5r",
        "session_date": "2020-07-02",
        "session_time": "11:58:08",
        "job_title": "Junior Software Developer in Test (SDET)",
        "totalJobs_id": "90293561",
        "apply_attempted": true,
        "interested": true,
        "salary": "£23000 - £25000 per annum",
        "company": "Opus Recruitment Solutions Ltd",
        "job_type": "Permanent",
        "job_posted": "Posted 6 days ago",
        "location": "Chippenham",
        "job_url": "https://www.totaljobs.com/job/software-development-engineer-in-test/opus-recruitment-solutions-ltd-job90293562",
        "job_contact": "George Aldridge",
        "totalJobs_ref": "Totaljobs/GA-40",
        "found_dkw": ["SOFTWARE", "DEVELOPER", "RESTFUL", "AGILE", "ENGINEERING", "JAVASCRIPT", "HTML", "CSS"],
        "found_udkw": [],
        "found_top24": ["RUBY", "JAVA", "JAVASCRIPT", "C++", "C#", "HTML", "CSS"]
      }
  
- Returns:
  - if successful (example) :
      ```JSON
        {
          "status": 200,
          "message": "Application successfully logged",
          "loggedApplication": { 
            "_id": "5efdbdd42b498306b5f98de2",
            "user_id": "5f102d3ce9647c31b2f1e923",
            "session_id": "202007025efdbdc0c3f14b06b7710f5r",
            "session_date": "2020-07-02",
            "session_time": "11:58:08",
            "job_title": "Junior Software Developer in Test (SDET)",
            "totalJobs_id": "90293561",
            "apply_attempted": true,
            "interested": true,
            "salary": "£23000 - £25000 per annum",
            "company": "Opus Recruitment Solutions Ltd",
            "job_type": "Permanent",
            "job_posted": "Posted 6 days ago",
            "location": "Chippenham",
            "job_url": "https://www.totaljobs.com/job/software-development-engineer-in-test/opus-recruitment-solutions-ltd-job90293562",
            "job_contact": "George Aldridge",
            "totalJobs_ref": "Totaljobs/GA-40",
            "found_dkw": ["SOFTWARE", "DEVELOPER", "RESTFUL", "AGILE", "ENGINEERING", "JAVASCRIPT", "HTML", "CSS"],
            "found_udkw": [],
            "found_top24": ["RUBY", "JAVA", "JAVASCRIPT", "C++", "C#", "HTML", "CSS"]
        }
      }
  - if unsuccessful
      ```JSON
        { 
          "status": 500,
          "success": false, 
          "error": "Relevant error message"
        }
    
### DELETE
**/api/applications/:applicationId** <br>
**/api/applications/user/:userId**

You must be authenticated to delete data via this route; requires token.

These routes delete applications from the DB.

- Requires either an application id or user id to be passed through url parameters.

- When deleting a single application, if successful:
  ```JSON
    {
      "status": 200,
      "message": "application deleted"
    } 

- When deleteing multiple applications via a user id, if successful (example):
  ```JSON
    {
      "status": 200,
      "user_id": "5f102d3ce9647c31b2f1e923",
      "message": "Deleted 34"
    } 
  
- if unsuccessful 
  ```JSON
    { "error": "Relevant error message" }

## SESSIONS

- GET `/api/sessions/` : returns all sessions
- GET `/api/sessions/:sessionId` : returns a single session
- POST `/api/sessions/` : logs a session to DB

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
      
### POST
**/api/sessions/**

- When logging a session to DB, all the following fields are required.

- Required and sent through body (example):
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
  
- Returns:
  - if successful (example) :
      ```JSON
        {
          "status": 200,
          "message": "Session successfully logged",
          "loggedSession": { 
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
      }
  - if unsuccessful
      ```JSON
        { 
          "status": 500,
          "success": false, 
          "error": "Relevant error message"
        }
    
    
    
## SYSTEM SESSION RUNTIME LOGIC (via sessions route)

- POST `/api/sessions/totalJobsLogIn` : navigates to totalJobs and logs in
- POST `/api/sessions/runJobSearch` : enters given search preferences and lands on results page

### POST
**/api/sessions/totalJobsLogIn**

- You must be authenticated to call this route; requires bearer token.
- If authentication passes and log in details accepted, route successfully logs in the user's totalJobs account and lands on totalJobs homepage 

- Email and encoded password required (example):
    ```JSON
      {
        "email": "joe@blogs.com",
        "encPss": "5efdbddc2b498306b5f98de8"
      }
  
- Returns: 
  - if successful, once navigation finished executing (example) :
      ```JSON
        {
          "success": true,
          "message": "Successfully logged into totalJobs account"
        }
  - if validation unsuccessful, i.e. `{ "status": 400, "success": false, "message": "Invalid email" }` 
      ```JSON
        { 
          "success": false, 
          "error": "Relevant 400 error message"
        }
  - if connection unsuccessful
      ```JSON
        { 
          "success": false, 
          "error": "Relevant error message"
        }
    
### POST
**/api/sessions/runJobSearch**

- You must be authenticated to call this route; requires bearer token.
- If authentication passes and search parameters accepted, route applies search preferences and lands on totalJobs result page

- The route requires a job title, location and radius
- The route also requires to be on the correct url. Page title must match `Jobs | UK Job Search | Find your perfect job - totaljobs` otherwise returns system error and exits execution
- Job title and location must be strings
- Radius must be a number and either be; 0, 5, 10, 20 or 30
- An example request:
    ```JSON
      {
        "job_title": "Junior Software Engineer",
        "location": "Bristol",
        "radius": 5
      }
  
- Returns: 
  - if successful, once navigation finished executing (example) :
      ```JSON
        {
          "success": true,
          "search": {
            "job_title": "Junior Software Engineer",
            "location": "Bristol",
            "radius": 20
          },
          "message": "Successfully entered search and found results"
        }
  - if validation unsuccessful (example)
      ```JSON
        { 
          "success": false,
          "message": "Incorrect radius number",
          "expected_options": [0, 5, 10, 20, 30]
        }
  - if connection unsuccessful
      ```JSON
        { 
          "success": false,
          "message": "system error"
        }