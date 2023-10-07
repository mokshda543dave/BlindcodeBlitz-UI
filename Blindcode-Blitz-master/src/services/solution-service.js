// release v1.0 commit

import { PRIVATE_AXIOS } from "./helper";

// Submit solution
export const SubmitSolution = (solutions, userId) => {
  console.log(solutions);
  console.log(userId);
  return PRIVATE_AXIOS.post(
    "v1/api/user/" + userId + "/submission",
    solutions
  ).then((res) => res.data);
};

// Get all solutions
export const loadAllSubmissions = (pageNumber, pageSize) => {
  return PRIVATE_AXIOS.get(
    "v1/api/adm/auth/submissions?pageNumber=" +
      pageNumber +
      "&pageSize=" +
      pageSize
  ).then((res) => res.data);
};
