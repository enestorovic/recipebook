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

const isLocalEnvironment = window.location.href.includes('localhost')
if(isLocalEnvironment) {
	const backendUrl = "http://localhost:4000";
} else {
	const backendUrl = "https://mq287hzg9l.execute-api.us-east-1.amazonaws.com";
}

firebase.initializeApp(config);

class SignedInComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			recipes: null,
		};
	}

	async componentDidMount() {
		const token = await firebase.auth().currentUser?.getIdToken();

		try {
			const response = await fetch(backendUrl + "/dev/recipes", {
				headers: {
					Authorization: token,
				},
			});
			if (response.status === 401) {
				console.log("unauthorized");
			} else {
				const data = await response.json();
				this.setState({ recipes: data });
			}
		} catch (err) {
			console.error(err);
		}
	}

	signOut() {
		firebase.auth().signOut();
	}

	render() {
		const userName = firebase.auth().currentUser?.email;
		return (
			<section className="section">
				<div className="container has-text-centered">
					Hello {userName}! You're now signed in
					<div className="title">Recipes</div>
						{
							this.state.recipes && this.state.recipes.map(recipe => {
								return (
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
														<strong>{recipe.title}</strong>
													</p>
													<p>
														{recipe.description}
													</p>
												</div>
											</div>
										</article>
									</div>
								);
							})
						}
					<button onClick={() => this.signOut()}>Sign out</button>
				</div>
			</section>
		);
	}
}

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
		};
	}

	uiConfig = {
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


	componentDidMount() {
		this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
			(user) => this.setState({ isSignedIn: !!user })
		);
	}

	componentDidUnmount() {
		this.unregisterAuthObserver();
	}

	render(){
		if (this.state.isSignedIn) {
      return <SignedInComponent />;
    }
		return (
			<div className="App container">
				<h1>My App</h1>

				{this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
					<div>
						<p>Please sign-in:</p>
						<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
					</div>
				}
			</div>
		);
	}
	
}

export default App