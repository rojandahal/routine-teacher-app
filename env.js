let baseURl = "http://192.168.101.27:8000/";
let secondServer = "http://192.168.18.10:3000/";

let API = {
  login: baseURl + "users/login/",
  register: baseURl + "users/register/",
  profile: baseURl + "api/profile/",
  profileUpdate: baseURl + "api/profile/update/",
  searchRoutine: secondServer + "api/v1/routine/search",
};

export default API;
