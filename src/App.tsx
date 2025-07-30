import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetails';
import Layout from './components/Layout';


function App() {
	return (
		<>
			{/* <Routes>
				<Route path='/' element={<Home />} />
				<Route path='/recipe/:id' element={<RecipeDetails />} />
			</Routes> */}

			<Routes>
				<Route path='/' element={<Layout />}>
					<Route index element={<Home />} />
					<Route path='/recipe/:id' element={<RecipeDetails />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
