export class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._profileName = document.querySelector(nameSelector);
    this._profileInfo = document.querySelector(jobSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileInfo.textContent
    }
  }

  setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileInfo.textContent = job;
  }
}
