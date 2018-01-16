import Auth0Lock from 'auth0-lock';
const authDomain = 'rvrvrv.auth0.com';
const clientId = 'HcMolKSmeIq3cmA577qNRsjiQre7Is7t';

class AuthService {
  constructor() {
    this.lock = new Auth0Lock(clientId, authDomain, {
      auth: {
        params: {
          scope: 'openid email'
        },
      }
    });
    this.showLock = this.showLock.bind(this);
    this.lock.on('authenticated', this.authProcess.bind(this));
  }

  authProcess = (authResult) => {
    console.log(authResult);
  }

  showLock() {
    this.lock.show();
  }

  // Store authFields in localStorage
  setToken = (authFields) => {
    let { idToken, exp } = authFields;
    localStorage.setItem('rvrvrv-ttt-idToken', idToken);
    localStorage.setItem('rvrvrv-ttt-exp', exp * 1000);
  }

  // Ensure auth is current (hasn't expired)
  isCurrent = () => {
    let expStr = localStorage.getItem('rvrvrv-ttt-exp');
    if (!expStr) {
      localStorage.removeItem('rvrvrv-ttt-idToken');
      return false;
    }
    // Compare current (now) and exp time
    let now = new Date();
    let exp = new Date(parseInt(expStr, 10));
    // If expired, log out
    if (exp < now) {
      this.logout();
      return false;
    } else return true; // If auth is current, return true
  }

  // Retrieve authFields from localStorage
  getToken() {
    let idToken = localStorage.getItem('rvrvrv-ttt-idToken');
    if (this.isCurrent && idToken) return idToken;
    // If expired, clear localStorage
    else {
      localStorage.removeItem('rvrvrv-ttt-idToken');
      localStorage.removeItem('rvrvrv-ttt-exp');
      return false;
    }
  }

  // Log out user
  logout = () => {
    // Clear localStorage
    localStorage.removeItem('rvrvrv-ttt-idToken');
    localStorage.removeItem('rvrvrv-ttt-exp');
    // Reload the page
    window.location.reload();
  }
}

const auth = new AuthService();
export default auth;
