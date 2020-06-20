const {v4: uuidv4} = require('uuid');

// CONSTANTS
const numberOfHelpRequests = 10;
const REQUEST_STATUS = {
  OPEN: 'OPEN',
  WIP: 'WIP',
  CLOSED: 'CLOSED'
};
const SOURCE = {
  HOTLINE: 'HOTLINE',
  APP: 'APP',
  ADMIN_DASHBOARD: 'ADMIN_DASHBOARD'
};

// FUNCTIONS

function createMultipleHelpRequests() {
  const requests = [];
  for (let i = 0; i < numberOfHelpRequests; i++) {
    requests.push(createSingleHelpRequest(REQUEST_STATUS.OPEN, 'hallo Welt ' + i, 'xyz'));
  }
  return requests;
}

function createSingleHelpRequest(requestStatus, requestText, adminUser) {
  const date = new Date();
  const helpRequest = {
    id: uuidv4(),
    createdAt: date,
    updatedAt: date,
    requestStatus: requestStatus,
    requestText: requestText,
    adminUser: adminUser
  };
  return helpRequest;
}

function createHelpSeeker(fullName, phone, source, enteredBy) {
  const helpSeeker = {
    id: uuidv4(),
    user: null,
    fullName: fullName,
    source: source,
    enteredBy: null
  };
  return helpSeeker;
}

function createMultipleHelpSeekers() {
  const helpSeekers = [];
  helpSeekers.push(createHelpSeeker('Max Meier', '01234566789', SOURCE.ADMIN_DASHBOARD, ''));
  helpSeekers.push(createHelpSeeker('Max Mustermann', '01234566789', SOURCE.ADMIN_DASHBOARD, ''));
  helpSeekers.push(createHelpSeeker('John Doe', '01234566789', SOURCE.ADMIN_DASHBOARD, ''));
  helpSeekers.push(createHelpSeeker('Jane Doe', '01234566789', SOURCE.ADMIN_DASHBOARD, ''));
  return helpSeekers;
}

// DATA
const helpRequests = createMultipleHelpRequests();
const helpSeekers = createMultipleHelpSeekers();

module.exports = {
  getHelpRequests: function () {
    return helpRequests;
  },
  createHelpRequest: function (requestStatus, requestText, adminUser) {
    return createSingleHelpRequest(requestStatus, requestText, adminUser);
  },
  getHelpRequest: function (uuid) {
    return helpRequests.find(request => request.id === uuid);
  },
  createHelpSeeker: function (fullName, phone, source, enteredBy) {
    return createHelpSeeker(fullName, phone, source, enteredBy);
  },
  getHelpSeekers: function () {
    return helpSeekers;
  },
  getHelpSeeker: function (uuid) {
    return helpSeekers.find(seeker => seeker.id === uuid);
  }
};

