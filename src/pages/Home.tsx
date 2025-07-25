import React, { useEffect, useState } from 'react'
import { Banner } from '../components/Banner'
import { recipeDataProps } from '../types/recipe';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';

const Home = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [recipeData, setRecipeData] = useState<recipeDataProps[] | null>(null);

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const apiUrl = "https://dummyjson.com/recipes";
				const response = await fetch(apiUrl);
				if(!response.ok) throw new Error(`HTTP Error status: ${response.status}`);
				const data = await response.json();

				setRecipeData(data.recipes);
				console.log(data.recipes);
				
			} catch(err:any) {
				setError(err.status || "Something went wrong")
			} finally {
				setLoading(false);
			}
		};

		fetchRecipes();
	}, [])
	

	return (
		<div className='home mb-5'>
			<Banner />

			<section className="recipeList">
				<Container>
					<Row className='g-3'>
						{ loading && <Col md={12} className='text-center'><Spinner animation='border' /></Col> }
						{ error && <Col md={12}><p className="m-0">{error}</p></Col> }
						{ recipeData && recipeData.map(recipe => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))}
					</Row>
				</Container>
			</section>
		</div>
	)
}

export default Home