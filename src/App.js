import Home from "./pages/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import AntiProtectedRoutes from "./antiProtectedRoute";
import ProtectedRoutes from "./ProtectedRoutes";
import Comments from "./pages/Comments";
import Blogs from "./pages/Blogs";

function App() {
	return (
		<Router>
			<Switch>
				<Route exact path="/" component={Home} />
				<AntiProtectedRoutes exact path="/login" component={Login} />
				<ProtectedRoutes exact path="/blogs/:id" component={Comments} />
				<ProtectedRoutes exact path="/blog" component={Blogs} />
			</Switch>
		</Router>
	);
}

export default App;
