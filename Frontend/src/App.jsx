import "./App.css";
import Landing from "./Components/Landing/Landing";
import Main from "./Components/Main/Main";
import Profile from "./Components/Profile/Profile";
import { Routes, Route } from "react-router-dom";

const App = () => {
	return (
		<Routes>
			<Route path={"/"} element={<Landing />}></Route>
			<Route path={"/main"} element={<Main />}></Route>
			<Route path={"/profile"} element={<Profile />}></Route>
		</Routes>
	);
};

export default App;
