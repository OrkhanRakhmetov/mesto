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

  getProfileId() {
    return this._profileId;
  }

  setUserInfo(user) {
    this._profileName.textContent = user.name;
    this._profileInfo.textContent = user.about;
    this._profileAvatar.src = user.avatar;
    this._profileId = user._id;
  }

  setUserAvatar() {
    return this._profileAvatar.src;
  }
}
