export class UserInfo {
  constructor({ profileName, profileInfo }) {
    this._profileName = document.querySelector(profileName);
    this._profileInfo = document.querySelector(profileInfo);
  }

  getUserInfo() {
    const user = {};
    user.name = this._profileName.textContent;
    user.job = this._profileInfo.textContent;
    
    return user;
  }

  setUserInfo({ name , job }) {
    this._profileName.textContent = name;
    this._profileInfo.textContent = job;
  }
}
