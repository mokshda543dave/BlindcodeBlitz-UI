export const doLogin = (userSessionData, next) => {
  localStorage.setItem("userSessionData", JSON.stringify(userSessionData));
  next();
};

export const isLoggedIn = () => {
  let userSessionData = localStorage.getItem("userSessionData");
  if (userSessionData == null) return false;
  return true;
};

export const doLogout = (next) => {
  localStorage.removeItem("userSessionData");
  next();
};

export const getCurrentUser = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("userSessionData")).user;
  }
  return undefined;
};

export const getCurrentUserProfile = () => {
  if (isLoggedIn()) {
    return getCurrentUser()?.roles[0].name;
  }
  return false;
};

export const saveSolution = (solutionContent) => {
  localStorage.setItem("userSolutionData", JSON.stringify(solutionContent));
};

export const getSolutionContent = () => {
  return JSON.parse(localStorage.getItem("userSolutionData"));
};

export const removeSolution = (next) => {
  localStorage.removeItem("userSolutionData");
  next();
};

export const getToken = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("userSessionData")).token;
  } else {
    return null;
  }
};

// release v1.0 commit
