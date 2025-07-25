import React from 'react'
import bannerImage from '../assets/banner-image-1.png';
import { Col, Container, Row } from 'react-bootstrap';

export const Banner = () => {
	return (
		<section className="banner my-4">
			<Container>
				<Row>
					<Col>
						<img src={bannerImage} alt="" className='img-fluid rounded-3 w-100' />
					</Col>
				</Row>
			</Container>
		</section>
	)
}