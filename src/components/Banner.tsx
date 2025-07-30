import React from 'react'
import bannerImage from '../assets/banner-image-1.png';
import { Col, Container, Row } from 'react-bootstrap';

export const Banner = () => {
	return (
		<section className="banner my-4">
			<Container>
				<Row>
					<Col>
						<figure className="m-0 overflow-hidden rounded-3 d-flex align-items-center justify-content-center">
							<img src={bannerImage} alt="" className='img-fluid rounded-3 w-100' />
						</figure>
					</Col>
				</Row>
			</Container>
		</section>
	)
}