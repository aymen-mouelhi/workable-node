
# Workable Node

> Node.JS Workable API (v3) Wrapper

### Installation

```bash
$ npm install workable-node
```

### Example Code

```javascript

var workable = require('workable-node')();

// Set access token
workable.setAccessToken('<ACCESS TOKEN>');

// Or:
var Workable = require('workable-node');

var workable = new Workable({
    accessToken: '<ACCESS TOKEN>'
});

// get All accounts
workable.getAccounts(null, function(error, accounts) {
  console.log(JSON.stringify(accounts));
});

// get account information
workable.getAccount('<account-subdomain>', null, function(error, account) {
  console.log(account);
});

// get account members
workable.getAccountMembers('<account-subdomain>', null, function(error, members) {
  console.log(JSON.stringify(members));
});

// get account recruiters
workable.getAccountRecruiters('<account-subdomain>', null, function(error, recruiters) {
  console.log(JSON.stringify(recruiters));
});

// get Published Jobs
workable.getJobs('<account-subdomain>', {state: 'published'}, function(error, jobs) {
  console.log(JSON.stringify(jobs));
});

// Candidate Object

var candidate = {
  "sourced": true, // won't recieve thank you email, if this needs to be done then sourced must be set to false
  "candidate": {
    "name": "Jj Botha",
    "firstname": "Jj",
    "lastname": "Botha",
    "headline": "Professional Administration Manager",
    "education_entries": [
      { "degree": "MBA", "school": "University of Pennsylvania", "field_of_study": null, "start_date": "2008-03-01", "end_date": "2011-03-30" },
      { "degree": "B.S.", "school": "University of Chicago", "field_of_study": "Marketing Communication & Economics", "start_date": "2004-09-01", "end_date": "2007-03-30" }
    ],

    "experience_entries": [
      {
        "title": "Sales Director",
        "summary": null,
        "start_date": "2011-03-01",
        "end_date": "2014-03-30",
        "current": false,
        "company": "Vox Mobile",
        "industry": "Telecommunications"
      }
    ],

    "answers": [
      {
        "question_key": "2128d717",
        "body": "Planning"
      },
      {
        "question_key": "3399e6cd",
        "choices": ["1e477229"]
      }
    ],

    "skills": [ "Travel Planning", "Problem Solving"],
    "social_profiles": [
        {
          "type": "twitter",
          "name": "Twitter",
          "username": "jj_botha",
          "url": "http://www.twitter.com/jj_botha"
        },
        {
          "type": "linkedin",
          "name": "LinkedIn",
          "url": "http://www.linkedin.com/in/jj_botha"
        },
        {
          "type": "googleplus",
          "url": "https://plus.google.com/6908286706342698"
        }
    ]
  }
}

// Create Candidate in Workable
workable.createCandidate('<account-subdomain>', '<Job>', 'applied', candidate, function(error, data) {
  // created
  console.log("User has been " + data.status);
});

```

### Running Tests

	Tests can be found in /test/api.test.js

### License (MIT)

Copyright (c) 2016, Aymen Mouelhi.

Author: [Aymen Mouelhi]
