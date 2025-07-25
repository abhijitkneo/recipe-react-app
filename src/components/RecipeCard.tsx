import React from 'react'
import { recipeDataProps } from '../types/recipe'
import { Card, Col } from 'react-bootstrap'
import { GoStarFill } from "react-icons/go";
import { BsClock } from "react-icons/bs";
import { IoRestaurantOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";

interface Props {
	recipe: recipeDataProps;
}

const RecipeCard = ({recipe}: Props) => {
	return (
		<Col md={3}>
			<Card className='rounded-4'>
				<Card.Img variant='top' src={recipe.image} className='rounded-top-4'></Card.Img>
				<Card.Body>
					<span className="position-absolute bg-white rounded-pill px-2 py-1 top-0 start-0 mt-3 ms-3 fw-bold shadow-sm d-inline-flex align-items-center gap-1 border">
						<GoStarFill className='text-warning' /> {recipe.rating}
					</span>
					<p className=" fw-bold m-0 text-primary">{recipe.cuisine}</p>
					<h5 className='fw-bold mb-0'>{recipe.name}</h5>
					<a href="#" className="stretched-link position-absolute top-0 start-0 w-100 h-100"></a>
				</Card.Body>
				<Card.Footer className='pt-0 pb-3 border-0 bg-transparent'>
					<ul className="m-0 list-unstyled d-flex align-items-center justify-content-between">
						<li className='d-inline-flex align-items-center gap-1 small fw-medium text-black-50'>
							<BsClock /> {recipe.cookTimeMinutes} min
						</li>
						<li className='d-inline-flex align-items-center gap-1 small fw-medium text-black-50'>
							<IoRestaurantOutline /> {recipe.cuisine}
						</li>
						<li className='d-inline-flex align-items-center gap-1 small fw-medium text-black-50'>
							<FiUsers /> Serves {recipe.servings}
						</li>
					</ul>
				</Card.Footer>
			</Card>
		</Col>
	)
}

export default RecipeCard