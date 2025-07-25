import Header from './components/Header/Header';
import { Banner } from './components/Banner';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { recipeDataProps } from './types/recipe';
import RecipeCard from './components/RecipeCard';


function App() {
	const [recipeData, setRecipeData] = useState<recipeDataProps[] | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {

		const fetchRecipes = async() => {
			try {
				const apiUrl = 'https://dummyjson.com/recipes';
				const response = await fetch(apiUrl);
				if(!response.ok) throw new Error(`HTTP Error Status ${response.status}`);

				const data = await response.json();
				setRecipeData(data.recipes);
				console.log(data.recipes);
				
			} catch(err: any) {
				setError(err.message || 'Something went wrong')
			} finally {
				setLoading(false);
			}
		};
		fetchRecipes();
	}, [])

	
	return (
		<div className="App">
			<Header />
			<Banner />
			<section className="recipeList">
				<Container>
					<Row className='g-3'>
						{ loading && (
							<Col md={12} className='text-center'>
								<Spinner animation='border' />
							</Col>
						) }

						{ error && <p className="m-0">{error}</p> }

						{ recipeData && recipeData.map(recipe => (
								<RecipeCard key={recipe.id} recipe={recipe} />
							))
						}

					</Row>
				</Container>
			</section>
		</div>
	);
}

export default App;
