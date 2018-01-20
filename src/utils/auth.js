import Auth0Lock from 'auth0-lock';
import Relay from 'react-relay';
import CreateUser from '../mutations/CreateUser';
import SigninUser from '../mutations/SigninUser';
import { blue800 } from 'material-ui/styles/colors'

const authDomain = 'rvrvrv.auth0.com';
const clientId = 'HcMolKSmeIq3cmA577qNRsjiQre7Is7t';

class AuthService {
  constructor() {
    this.lock = new Auth0Lock(clientId, authDomain, {
      auth: {
        params: {
          scope: 'openid email id_token'
        }
      },
      theme: {
        logo: `${window.location.origin}/favicon.ico`,
        primaryColor: blue800
      },
      languageDictionary: {
        title: "Tic-Tac-Turing"
      }
    });
    this.showLock = this.showLock.bind(this);
    this.lock.on('authenticated', this.authProcess.bind(this));
  }

  authProcess = (authResult) => {
    console.log('authResult:', authResult);
    this.lock.getUserInfo(authResult.accessToken, (err, profile) => {
      console.log('profile:', profile);
      if (err) return console.log('Authentication error.');
      // Store information from Auth0
      let idToken = profile.sub;
      let email = profile.email;
      let exp = authResult.expiresIn;
      // Attempt to sign-in user
      this
        .signinUser({ idToken, email, exp })
        .then(
        success => success,
        // If rejected, create new user
        rejected => {
          this
            .createUser({ idToken, email, exp })
            .then()
            .catch(e => console.log(e))
        });
    });
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
    let exp = new Date(now + expStr);
    console.log(now, exp);
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

  // Create user after authentication
  createUser = (authFields) => {
    return new Promise((resolve, reject) => {
      console.log(authFields);
      Relay.Store.commitUpdate(
        new CreateUser({
          email: authFields.email,
          idToken: authFields.idToken,
          name: 'Test'
        }), {
          onSuccess: (response) => {
            this.signinUser(authFields);
            resolve(response);
          },
          onFailure: (response) => {
            reject(response);
          }
        }
      );
    });
  }

  // Sign-in user after authentication
  signinUser = (authFields) => {
    return new Promise((resolve, reject) => {
      Relay.Store.commitUpdate(
        new SigninUser({
          idToken: authFields.idToken
        }), {
          onSuccess: (response) => {
            this.setToken(authFields);
            resolve(response);
          },
          onFailure: (response) => {
            reject(response);
          }
        }
      );
    });
  }
}

const auth = new AuthService();
export default auth;
