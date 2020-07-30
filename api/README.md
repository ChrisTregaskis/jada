## Routes
- for local development use localhost:8080/whatYouRequire as your URL

### PUT
**/api/user/preferences/totalJobs/:userId**

You must be authenticated to update data from this route; takes bearer token.

- Takes email and password for totalJobs. Encrypts the password before saving to DB.

- Required and sends through body either of the following:
    - `{ "email": "valid@email.com", "pass": "password" }` 
    
- Returns:
    - if successful 
        - `status 200`
        - `{ "Success": true, "Message": "Successfully updated totalJobs credentials" }`  
    - if unsuccessful
        - `status 400` 
            - `{ "Success": false, "Message": "..." }` 
            : error message depends on input, i.e. 'Email or password field empty'
        - `status 500` 
            - `{ "Success": false, "Message": "Not able to update document" }`