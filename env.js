let baseURl = "http://192.168.101.27:8000/";

let API = {
  login: baseURl + "users/login/",
  register: baseURl + "users/register/",
  profile: baseURl + "api/profile/",
  profileUpdate: baseURl + "api/profile/update/",
};

export default API;
