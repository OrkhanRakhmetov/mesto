export class UserInfo {
  constructor({ profileName, profileInfo }) {
    this._profileName = document.querySelector(profileName);
    this._profileInfo = document.querySelector(profileInfo);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      info: this._profileInfo.textContent
    };
  }

  setUserInfo({ name, info }) {
    this._profileName.textContent = name;
    this._profileInfo.textContent = info;
  }
}
