export const LOGIN_SUCCESS = (userdata: any) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userdata,
  };
};

export const LOGIN_ERROR = () => {
  return {
    type: "LOGIN_ERROR",
    payload: "Error",
  };
};
