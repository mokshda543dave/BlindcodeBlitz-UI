// release v1.0 commit

import { Axios, PRIVATE_AXIOS } from "./helper";

export const updatePermission = (perId, status) => {
  return PRIVATE_AXIOS.put(`v1/api/permissions/update/${perId}`, status).then(
    (res) => res.data
  );
};

export const getPermissions = () => {
  return Axios.get("v1/api/permissions/view").then((res) => res.data);
};
