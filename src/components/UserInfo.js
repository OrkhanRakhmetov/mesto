export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileInfo = document.querySelector(jobSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileInfo.textContent,
      avatar: this._profileAvatar.src,
    }
  }

  setUserInfo(userInfo) {
    this._profileName.textContent = userInfo.name;
    this._profileInfo.textContent = userInfo.about;
    this._profileAvatar.src = userInfo.avatar;
    this._profileId = userInfo.id;
  }

  getProfileId() {
      return this._profileId;
    }

    setUserAvatar() {
      return this._profileAvatar.src;
    }
}
