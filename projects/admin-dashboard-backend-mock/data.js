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
  ADMIN: 'ADMIN'
};

// FUNCTIONS

function createMultipleHelpRequests() {
  const requests = [];
  for (let i = 0; i < numberOfHelpRequests; i++) {
    const index = Math.round(Math.random() * 2);
    const status = index === 0 ? REQUEST_STATUS.OPEN : index === 1 ? REQUEST_STATUS.WIP : REQUEST_STATUS.CLOSED;
    requests.push(createSingleHelpRequest(status, 'hallo Welt ' + i, 'xyz'));
  }
  return requests;
}

function createSingleHelpRequest(requestStatus, requestText, helpSeeker, adminUser = null) {
  const date = new Date();
  const index = Math.round(Math.random() * (helpSeekers.length - 1));
  const helpRequest = {
    id: uuidv4(),
    createdAt: date,
    updatedAt: date,
    requestStatus: requestStatus,
    requestText: requestText,
    helpSeeker: helpSeekers[index],
    adminUser: adminUser
  };
  return helpRequest;
}

function createHelpSeeker(fullName, phone, source, enteredBy = null) {
  const helpSeeker = {
    id: uuidv4(),
    user: null,
    fullName: fullName,
    source: source,
    enteredBy: enteredBy,
    phone: phone
  };
  return helpSeeker;
}

function createMultipleHelpSeekers() {
  const helpSeekers = [];
  helpSeekers.push(createHelpSeeker('Max Meier', '01234566789', SOURCE.ADMIN, ''));
  helpSeekers.push(createHelpSeeker('Max Mustermann', '01234566789', SOURCE.ADMIN, ''));
  helpSeekers.push(createHelpSeeker('John Doe', '01234566789', SOURCE.ADMIN, ''));
  helpSeekers.push(createHelpSeeker('Jane Doe', '01234566789', SOURCE.ADMIN, ''));
  return helpSeekers;
}

function createUser(firstName, lastName, street, streetNo, zipCode,
                    city, email, location, phone, source) {
  const user = {
    firstName: firstName,
    lastName: lastName,
    street: street,
    streetNo: streetNo,
    zipCode: zipCode,
    city: city,
    email: email,
    location: location,
    phone: phone,
    source: source
  };
  return user;
}

// DATA
const helpSeekers = createMultipleHelpSeekers();
const helpRequests = createMultipleHelpRequests();

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
  },
  createUser: function(firstName, lastName, street, streetNo, zipCode,
                       city, email, location, phone, source) {
    return createUser(firstName, lastName, street, streetNo, zipCode,
      city, email, location, phone, source);
  }
};

