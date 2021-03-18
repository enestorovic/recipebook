import logo from './logo.svg';
import './App.sass';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App() {
	return (
		<div className="App container">
			<h1 className="title">Dashboard</h1>

			<div className="box columns">
				<div>
						<span className="icon">
							<span className="fa-stack">
								<i className="fa-stack fa-2x"><FontAwesomeIcon icon="caret-up" /></i>
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
	);
}

export default App;
