## Routes
- for local development use localhost:8080/whatYouRequire as your URL

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
            "Success": true, 
            "Message": "Successfully updated totalJobs credentials"
          }  
    - if unsuccessful, error message depends on input, i.e. 'Email or password field empty'
        ```JSON
          { 
            "status": 400,
            "Success": false, 
            "Message": "Depending on caught error"
          }
    - alternatively, if unable to connect to DB
        ```JSON
          { 
            "status": 500,
            "Success": false, 
            "Message": "Not able to update document"
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
            "Success": true, 
            "Message": "Successfully updated user preferences",
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
            "Success": false, 
            "Message": "Depending on caught error"
          }
    - alternatively, if unable to connect to DB
        ```JSON
          { 
            "status": 500,
            "Success": false, 
            "Message": "Not able to update document"
          }