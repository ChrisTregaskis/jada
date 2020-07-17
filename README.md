# JADA
Job Application Digital Assistant

You can check out an example of JADA running here: https://vimeo.com/438840301

I've been told getting your first dev job, on top of projects one could show, is a numbers game. After spending over 120 hours, countless applications and missing coding due to spending the majority of my time applying to code (the irony) I started to wonder if I could use my new skills to build something that would automate this all.
If you've ever been looking for work for longer than a month, you'd certainly appreciate how taxing it can be mentally not getting any replies from applications, or just getting automated responses. I started loosing lots of confidence, increasingly doubting my self-worth and this affected relationships around me. This project was also birthed to counter the lifeless feeling of interacting with the recruitment industry.
And so, here I set out to build a system I call JADA... (Job Applications Digital Assistant)

**JADA so far achieves the following main objectives:**
- Handles all initial job applications including processing whether to apply or not
- Logs each processed job with key details that can be queried and avoids duplicating applying for roles
- Emails session reports after each run, including basic charts of key programming words and locations
- Displays a fontend dashboard using React and chartJS, breaking down key insights for processed applications thereby helping inform performance
- Displays a table of all applications to easily find by id or reference. When clicked, a modal appears with all relevant information including url to original job application.

**JADA also achieves the following:**
- Enables me to spend my time coding instead of applying to code (still makes me chuckle!) 
- Lifts the mental toll of no return for the hard work put in
- I have more life and energy for each day

**Currently:**
- I am building in user functionality to enable others to use JADA

The API structure is set up using Node.js, MongoDB and Mongoose among a few other packages. Its using the Model, Controller, Route pattern and is simple to follow.

For ease I've got a `run_jada.js` file and a `jada_functions.js` file. I have repurposed Selenium in order to automatically drive the browser and run JADA logic. 

You are very welcome to purose the code ;-) 
