
let API_KEY = 'AIzaSyBiZzawE5DYFXfZuh9irzQaMZxm5iNU25s';
let timer;

export default {
  async login(context, payload) {
    const userData = await context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });

    if (userData) {
      await context.dispatch('loadUserData', userData.localId);
    }
  },
  async signup(context, payload) {
    try {
      const authData = await context.dispatch('auth', {
        ...payload,
        mode: 'signup'
      });

      await context.dispatch('people/addEmployee', { ...payload, id: authData.localId }, { root: true });

      localStorage.setItem('userProfileData', JSON.stringify(payload));
      context.dispatch('autoLogin');
    } catch (error) {
      console.error('Signup failed:', error);
      throw error; // Propagate error to the UI
    }

  },

  async auth(context, payload) {
    let mode = payload.mode;
    let url = '';

    if (mode === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    }

    let response = await fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true
        })
      }
    );

    let responseData = await response.json();
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Fail due fetch!'
      );
      throw error;
    }

    const expiresIn = +responseData.expiresIn * 1000;
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userID', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      token: responseData.idToken,
      userID: responseData.localId
    });

    return responseData; // Return user data
  },

  autoLogin(context) {
    let token = localStorage.getItem('token'),
      userID = localStorage.getItem('userID'),
      tokenExpiration = localStorage.getItem('tokenExpiration'),
      userProfileData = JSON.parse(localStorage.getItem('userProfileData'));
    let expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      return;
    }

    setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

    if (token && userID) {
      context.commit('setUser', {
        token: token,
        userID: userID
      });

      context.commit('setUserData', userProfileData);
    }
  },

  logout(context) {
    localStorage.removeItem('token');
    localStorage.removeItem('userID');
    localStorage.removeItem('tokenExpiration');
    localStorage.removeItem('userProfileData');

    clearTimeout(timer);

    const actPayload = {
      token: null,
      userID: null
    };
    const userData = null;

    context.commit('setUser', actPayload);
    context.commit('setUserData', userData);
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },

  async loadUserData(context, data) {
    let personID = data;
    let url = `https://jira-vue-demo-default-rtdb.firebaseio.com/people/${personID}.json`;

    const userData = await fetch(url);
    const responseUserData = await userData.json();

    if (!userData.ok) {
      const error = new Error(responseUserData.message || 'Faled to fetch');
      throw error;
    }

    localStorage.setItem('userProfileData', JSON.stringify(responseUserData));
    context.commit('setUserData', responseUserData);
  }

}