//this component is to bring in the google UI
import { useEffect, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import { signInAnonymously } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import firebase from 'firebase/compat/app';
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'

function Login() {
  const navigate = useNavigate();

  const { auth, user } = useContext(AppContext);
  

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
    signInSuccessUrl: '/',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>',
    // Privacy policy url.
    privacyPolicyUrl: '<your-privacy-policy-url>'
  };

  function handleLoginAnon() {
    signInAnonymously(auth)
    .then(() => {
      //for testing: set user uid to anonymous
      console.log('signed in anonymously');
    })
    .catch((err) => {
      console.log(err);
    })
  }


  useEffect(() => {
    //firstly check if we already have an auth instance, if we do, then return true, if not, create a new firebase auth instance. this is to prevent firebase app duplicate error
    //https://github.com/firebase/firebaseui-web/blob/master/README.md#tips-for-initializing-a-new-ui-instance-with-the-same-auth-instance
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(auth);

    ui.start('#firebaseui-auth-container', uiConfig);
  }, [auth]);

  //navigate out if user is already logged in
  useEffect(() => {
    if (auth.currentUser) {
      navigate('/');
    } 
  }, [auth.currentUser]);

  return (
    <div className="App">
      <h1>Welcome to My Awesome App</h1>
      {/* google sign in */}
      <div id="firebaseui-auth-container"></div>
      {/* anon sign in */}
      <button onClick={handleLoginAnon}>Sign in anonymously</button>
      
      {/* {user?.uid ? <button onClick={handleLogout}>Sign Out</button> : null} */}
      
      <div>{user?.uid ? user.uid : 'no uid'}</div>

      <div id="loader">Loading...</div>
    </div>
  );
}

export default Login;