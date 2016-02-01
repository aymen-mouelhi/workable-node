
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
workable.getAccounts(function(error, account) {
  console.log(JSON.stringify(accounts));
});

// get account information
workable.getAccount('<account-subdomain>', function(error, account) {
  console.log(account);
});

// get account members
workable.getAccountMembers('<account-subdomain>', function(error, members) {
  console.log(JSON.stringify(members));
});

// get account recruiters
workable.getAccountRecruiters('<account-subdomain>', function(error, recruiters) {
  console.log(JSON.stringify(recruiters));
});


```

### Running Tests

	Tests can be found in /test/api.test.js

### License (MIT)

Copyright (c) 2016, Aymen Mouelhi.

Author: [Aymen Mouelhi]

