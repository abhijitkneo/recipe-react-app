import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { recipeDataProps } from '../types/recipe';
import { Alert, Col, Container, Row, Spinner } from 'react-bootstrap';
import { PiChefHat, PiForkKnife, PiStar, PiTag, PiWarningFill } from "react-icons/pi";
import { HiOutlineExclamationTriangle } from "react-icons/hi2";
import { LuCookingPot } from "react-icons/lu";
import { BsClock } from 'react-icons/bs';
import { IoRestaurantOutline } from 'react-icons/io5';
import { FaRegDotCircle } from "react-icons/fa";

const RecipeDetails = () => {
	const params = useParams();
	const id = params.id;
	console.log("id >>>", id);
	
	const [recipe, setRecipe] = useState<recipeDataProps | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchRecipeDetails = async () => {
			try {
				const apiUrl = `https://dummyjson.com/recipes/${id}`;
				const response = await fetch(apiUrl);
				if(!response.ok) throw new Error(`HTTP Error Status : ${response.status}`);
				const data = await response.json();

				setRecipe(data);
				console.log(data);
				

			} catch (err:any) {
				setError(err.status || 'Something went wrong');
			} finally {
				setLoading(false);
			}
		};

		fetchRecipeDetails();
	}, [id])
	
	
	return (
		<section className="recipeDetails position-relative pt-5 mb-5">
			{ loading && 
				<div className='loader text-center position-fixed w-100 h-100 start-0 top-0 bg-white bg-opacity-75'>
					<Spinner animation='border' />
				</div> 
			}
			{ error && 
				<Alert variant='danger' className='position-fixed end-0 bottom-0 me-3 mb-3'>
					<p className="d-flex align-items-center gap-2 m-0"><PiWarningFill size={'24'} /> {error}</p>
				</Alert> 
			}
			<Container className='position-relative'>
				<Row>
					<Col md={12}>
						{ !recipe ? 
								<p className="py-5 mb-0 d-flex flex-column align-items-center gap-2">
									<HiOutlineExclamationTriangle size={'48'} />No Recipe Found!
								</p>
							: (
								<>
									<Row>
										<Col md={4}>
											<figure className="m-0">
												<img src={`${recipe.image}`} alt="" className='img-fluid rounded-4' />
											</figure>
										</Col>
										<Col md={8}>
											<p className='fw-semibold text-primary mb-0'>{recipe.cuisine}</p>
											<h1 className='fw-semibold'>{recipe.name}</h1>

											<Row className='mt-3'>
												<Col md={2}>
													<p className="d-flex align-items-center gap-1 mb-1">
														<BsClock size={18} className='lh-1 opacity-50' />
														<span className='fw-medium'>{recipe.cookTimeMinutes} min</span>
													</p>
													<p className="small fw-semibold text-black-50 m-0">Cooking Time</p>
												</Col>
												<Col md={2}>
													<p className="d-flex align-items-center gap-1 mb-1">
														<PiForkKnife size={18} className='lh-1 opacity-50' />
														<span className='fw-medium'>Serves {recipe.servings}</span>
													</p>
													<p className="small fw-semibold text-black-50 m-0">Serving</p>
												</Col>
												<Col md={2}>
													<p className="d-flex align-items-center gap-1 mb-1">
														<PiChefHat size={18} className='lh-1 opacity-50' />
														<span className='fw-medium'>{recipe.difficulty}</span>
													</p>
													<p className="small fw-semibold text-black-50 m-0">Difficulty</p>
												</Col>
												<Col md={2}>
													<p className="d-flex align-items-center gap-1 mb-1">
														<PiStar size={18} className='lh-1 opacity-50' />
														<span className='fw-medium'>{recipe.rating}</span>
													</p>
													<p className="small fw-semibold text-black-50 m-0">Rating</p>
												</Col>
											</Row>
											<Row className='mt-5 pt-4'>
												<Col md={12}>
													<div className="mealType d-flex align-items-center gap-2 border-bottom pb-4 mb-4">
														{/* <PiTag size={24} className='opacity-50' /> */}
														<p className="fw-medium m-0">Meal Type : </p>
														<ul className="list-unstyled d-flex align-items-center gap-2 p-0 m-0">
															{
																recipe.mealType.map((meal, index) => (
																	<li key={index} className='bg-light border rounded px-3 text-black-50'>{meal}</li>
																))
															}
														</ul>
													</div>
												</Col>
												<Col md={12}>
													<h4 className='mb-3 lh-1 d-flex align-items-center gap-2'><LuCookingPot size={24} className='opacity-50' /> Ingredients ({recipe.ingredients.length})</h4>
													<ul className="list-unstyled d-flex align-items-center flex-wrap gap-2 p-0 m-0 ingredient-list">
														{
															recipe.ingredients.map((ingr, index) => (
																<li key={index} className='bg-primary-subtle border border-primary border-opacity-25 rounded px-3 py-2'>{ingr}</li>
															))
														}
													</ul>
												</Col>
											</Row>
										</Col>
									</Row>
									<Row className='mt-5'>
										<Col md={9}>
											<h4 className='mb-3 lh-1 d-flex align-items-center gap-2'><IoRestaurantOutline size={24} className='opacity-50' /> Directions</h4>
											<ul className="list-unstyled d-flex flex-column gap-2 p-0 m-0 mt-4">
												{
													recipe.instructions.map((instruction, index) => (
														<li className='d-flex gap-3' key={index}>
															<FaRegDotCircle size={16} className='text-primary mt-1 lh-1' /> {instruction}
														</li>
													))
												}
											</ul>
										</Col>
										<Col md={3}>
											<h4 className='mb-3 lh-1 d-flex align-items-center gap-2'><PiTag size={24} className='opacity-50' /> Tags</h4>
											<ul className="list-unstyled d-flex flex-wrap align-items-center gap-2 p-0 m-0">
												{
													recipe.tags.map((tag, index) => (
														<li key={index} className='bg-light border rounded px-3 text-black-50'>{tag}</li>
													))
												}
											</ul>
										</Col>
									</Row>
								</>
							)
						}
					</Col>
				</Row>
			</Container>
		</section>
	)
}

export default RecipeDetails