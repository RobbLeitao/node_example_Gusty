function isAdmin() {
  return localStorage.getItem('userRole') === 'true';
}

function getUserName() {
  return localStorage.getItem('userName');
}

function setUserRole(userRole) {
  localStorage.setItem('userRole', userRole);
}

function setUserName(userName) {
  localStorage.setItem('userName', userName);
}
