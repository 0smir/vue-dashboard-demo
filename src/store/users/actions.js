
let API_KEY = 'AIzaSyBiZzawE5DYFXfZuh9irzQaMZxm5iNU25s';
export default {
  async login(context, payload) {
    console.log('login payload: ', payload)
    const userData = await context.dispatch('auth', {
      ...payload,
      mode: 'login'
    });

    if (userData) {
      console.log('userData: ', userData);
      await context.dispatch('loadUserData', userData.localId);
    }
  },
  async signup(context, payload) {
    console.log('signup payload: ', payload)
    try {
      const authData = await context.dispatch('auth', {
        ...payload,
        mode: 'signup'
      });

      await context.dispatch('people/addEmployee', { ...payload, id: authData.localId }, { root: true });

    } catch (error) {
      console.error('Signup failed:', error);
      throw error; // Propagate error to the UI
    }

  },

  async auth(context, payload) {
    let mode = payload.mode;
    // let API_KEY = API_KEY;
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
    console.log(responseData);
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Fail due fetch!'
      );
      console.log(responseData);
      throw error;
    }

    context.commit('setUser', {
      token: responseData.idToken,
      userID: responseData.localId
    });

    return responseData; // Return user data

  },

  logout(context) {
    const actPayload = {
      token: null,
      userID: null
    };

    context.commit('setUser', actPayload);
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

    context.commit('setUserData', responseUserData);
  }

}