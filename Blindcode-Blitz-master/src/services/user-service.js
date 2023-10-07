// release v1.0 commit

import { Axios } from "./helper";

export const RegisterUser = (userData) => {
  return Axios.post("/v1/api/user/register", userData).then((res) => res.data);
};

export const LoginUser = (userCredentials) => {
  return Axios.post("/v1/api/auth/login", userCredentials).then(
    (res) => res.data
  );
};
