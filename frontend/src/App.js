import './App.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';

const config = {
	apiKey: "AIzaSyDbXZCw-a5eWxEm1RbJIg45vc45ALbzUVg",
	authDomain: "recipebook2-6dead.firebaseapp.com",
	projectId: "recipebook2-6dead",
	storageBucket: "recipebook2-6dead.appspot.com",
	messagingSenderId: "682961276413",
	appId: "1:682961276413:web:d694bc438866e5e41edd94"
};

firebase.initializeApp(config);
 
// Configure FirebaseUI.
const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: '/signedIn',
	// We will display Google and Facebook as auth providers.
	signInOptions: [
		firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	callbacks: {
    // Avoid redirects after sign-in.
    signInSuccessWithAuthResult: () => false,
  }
};

function SignInScreen() {
	const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.

	// Listen to the Firebase Auth state and set the local state.
	useEffect(() => {
		const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
			setIsSignedIn(!!user);
		});
		return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
	}, []);

	if (!isSignedIn) {
		return (
			<div className="App container">
				<h1>My App</h1>
				<p>Please sign-in:</p>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
			</div>
		);
	}
	return (
		<div className="App container">
			<h1>My App</h1>
			<p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
			<a onClick={() => firebase.auth().signOut()}>Sign-out</a>

			<div>
				<h1 className="title">Dashboard</h1>

				<div className="box columns">
					<div>
							<span className="icon">
								<span className="fa-stack">
									<i className="fa-stack fa-2x	"><FontAwesomeIcon icon="caret-up" /></i>
									<i className="fa-stack fa-2x"><FontAwesomeIcon icon="caret-down" /></i>
								</span>
							</span>
					</div>
					<article className="media">
						<div className="media-left">
							<figure className="image is-64x64">
								<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"></img>
							</figure>
						</div>
						<div className="media-content">
							<div className="content">
								<p>
									<strong>Floolproof Pan Pizza</strong>
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
								</p>
							</div>
						</div>
					</article>
				</div>

				<div className="box">
					<article className="media">
						<div className="media-left">
							<figure className="image is-64x64">
								<img src="https://bulma.io/images/placeholders/128x128.png" alt="Image"></img>
							</figure>
						</div>
						<div className="media-content">
							<div className="content">
								<p>
									<strong>Floolproof Pan Pizza</strong>
								</p>
								<p>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean efficitur sit amet massa fringilla egestas. Nullam condimentum luctus turpis.
								</p>
							</div>
						</div>
					</article>
				</div>
			</div>
		</div>
	);
}

export default SignInScreen