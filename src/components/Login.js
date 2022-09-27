//this component is to bring in the google UI
import { useEffect, useContext } from 'react';
import AppContext from '../AppContext';

import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

function Login() {

  const { auth, user } = useContext(AppContext)
  
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        // User successfully signed in.
        // Return type determines whether we continue the redirect automatically
        // or whether we leave that to developer to handle.
        return true;
      },
      uiShown: function () {
        // The widget is rendered.
        // Hide the loader.
        document.getElementById('loader').style.display = 'none';
      }
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: 'popup',
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  useEffect(() => {
    //firstly check if we already have an auth instance, if we do, then return true, if not, create a new firebase auth instance. this is to prevent firebase app duplicate error
    //https://github.com/firebase/firebaseui-web/blob/master/README.md#tips-for-initializing-a-new-ui-instance-with-the-same-auth-instance
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start('#firebaseui-auth-container', uiConfig);
  }, [auth])

  return (
    <div className="App">
      <h1>Welcome to My Awesome App</h1>
      <div id="firebaseui-auth-container"></div>
      <div id="loader">Loading...</div>
      <div>{user?.uid ? user.uid : 'no uid'}</div>
    </div>
  );
}

export default Login;