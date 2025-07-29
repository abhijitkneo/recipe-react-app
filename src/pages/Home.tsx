import React, { useEffect, useState } from 'react'
import { Banner } from '../components/Banner'
import { recipeDataProps } from '../types/recipe';
import { Button, Col, Container, Form, Row, Spinner } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import { MdOutlineNoFood } from "react-icons/md"
import { RxReset } from "react-icons/rx";

const Home = () => {
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);
	const [recipeData, setRecipeData] = useState<recipeDataProps[] >([]);
	const [filteredData, setFilteredData] = useState<recipeDataProps[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [selectedCuisine, setSelectedCuisine] = useState('');
	const [selectedMealType, setSelectedMealType] = useState('');
	const [maxCookingTime, setMaxCookingTime] = useState<number | ''>('');
	const [sortOption, setSortOption] = useState('');

	useEffect(() => {
		const fetchRecipes = async () => {
			try {
				const apiUrl = "https://dummyjson.com/recipes";
				const response = await fetch(apiUrl);
				if(!response.ok) throw new Error(`HTTP Error status: ${response.status}`);
				const data = await response.json();

				setRecipeData(data.recipes);
				setFilteredData(data.recipes);
				console.log(data.recipes);
				
			} catch(err:any) {
				setError(err.status || "Something went wrong")
			} finally {
				setLoading(false);
			}
		};

		fetchRecipes();
	}, []);

	//search logic
	useEffect(() => {
		let filtered = recipeData;
		if(searchTerm.trim()) {
			filtered = filtered.filter((r) => r.name.toLowerCase().includes(searchTerm.toLowerCase()));
		}

		if(selectedCuisine) {
			filtered = filtered.filter((r) => r.cuisine === selectedCuisine);
		}

		if(selectedMealType) {
			filtered = filtered.filter((r) => r.mealType.includes(selectedMealType));		
		}

		if(maxCookingTime !== '') {
			filtered = filtered.filter((mct) => mct.cookTimeMinutes <= Number(maxCookingTime));
		}

		//handle sorting
		let sorted = [...filtered]
		switch (sortOption) {
			case 'name-asc':
				sorted.sort((a, b) => a.name.localeCompare(b.name));
				break;
			case 'name-desc':
				sorted.sort((a, b) => b.name.localeCompare(a.name));
				break;
			default:
				break;
		}

		setFilteredData(sorted);
	}, [searchTerm, recipeData, selectedCuisine, selectedMealType, maxCookingTime, sortOption])

	//reset filter
	const handleResetFilter = () => {
		setSearchTerm('');
		setSelectedCuisine('');
		setSelectedMealType('');
		setMaxCookingTime('');
	}
	const handleResetSort = () => {
		setSortOption('');
	}
	
	const cuisineOptions = Array.from(new Set(recipeData.map((r) => r.cuisine)))
	const mealTypeOptions = Array.from(new Set(recipeData.flatMap((m) => m.mealType)))

	return (
		<div className='home mb-5'>
			<Banner />

			<section className="recipeList">
				<Container>
					<section className="search-filter-container mb-3 pb-3 border-bottom">
						<Row>
							<Col md={3}>
								<p className='mb-1 fw-medium'>Search By</p>
								<div className="form-input">
									<input type="search" className='form-control' value={searchTerm} placeholder='Recipe Name ...' onChange={(e) => setSearchTerm(e.target.value)} />
								</div>
							</Col>
							<Col md={1} className='align-self-center'><p className="m-0 text-center mt-4">OR</p></Col>
							<Col md={6}>
								<p className='mb-1 fw-medium'>Filter By</p>
								<div className="d-flex align-items-center gap-2">
									<Form.Select onChange={(e) => setSelectedCuisine(e.target.value)} value={selectedCuisine}>
										<option value="">Cuisine</option>
										{cuisineOptions.map((cuisineOpt, index) => (
											<option value={cuisineOpt} key={index}>{cuisineOpt}</option>
										))}
									</Form.Select>
									<Form.Select onChange={(m)=> setSelectedMealType(m.target.value)} value={selectedMealType}>
										<option value="">Meal Type</option>
										{mealTypeOptions.map((meal, index) => (
											<option value={meal} key={index}>{meal}</option>
										))}
									</Form.Select>
									<input type="text" className='form-control' placeholder='Cooking Time ..' onChange={(ct) => setMaxCookingTime(ct.target.value ? Number(ct.target.value) : '')} value={maxCookingTime} />
									<Button variant='secondary' type='button' className='flex-shrink-0' onClick={handleResetFilter}>Clear Filter</Button>
								</div>
							</Col>
							<Col md={2}>
								<p className='mb-1 fw-medium'>Sort By</p>
								<div className="d-flex gap-2">
									<Form.Select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
										<option value="">Select</option>
										<option value="name-asc">Name Asc</option>
										<option value="name-desc">Name Desc</option>
									</Form.Select>
									<Button variant='secondary' type='button' onClick={handleResetSort} className='lh-1'>
										<RxReset size={18} className='lh-1' />
									</Button>
								</div>
							</Col>
						</Row>
					</section>
					<Row className='g-3'>
						{ loading && <Col md={12} className='text-center'><Spinner animation='border' /></Col> }
						{ error && <Col md={12}><p className="m-0">{error}</p></Col> }
						{/* { recipeData && recipeData.map(recipe => (
							<RecipeCard key={recipe.id} recipe={recipe} />
						))} */}

						{
							filteredData.length > 0 ? (
								filteredData.map(recipe => (
									<RecipeCard key={recipe.id} recipe={recipe} />
								))
							) : (
								<p className='m-0 d-flex align-items-center flex-column gap-3 mt-4 opacity-50'>
									<MdOutlineNoFood size={75} />
									No Recipes found
								</p>
							)
						}
					</Row>
				</Container>
			</section>
		</div>
	)
}

export default Home