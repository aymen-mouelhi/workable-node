
# Workable Node

> Node.JS Workable API (v3) Wrapper

### Installation

```bash
$ npm install github3
```

### Example Code

```javascript

var workable = require('workable-node')();

// Set access token
workable.setAccessToken('<ACCESS TOKEN>');

// get account information
workable.getAccount('groove-tech', function(error, account) {
  console.log(account);
});

// get account members
workable.getAccountMembers('groove-tech', function(error, members) {
  console.log(JSON.stringify(members));
});

// get account recruiters
workable.getAccountRecruiters('groove-tech', function(error, recruiters) {
  console.log(JSON.stringify(recruiters));
});


```

### Running Tests

	* Tests can be found in /test/api.test.js

### License (MIT)

Copyright (c) 2016, Aymen Mouelhi.

**

Author: [Aymen Mouelhi]

