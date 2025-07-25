import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap';
import logo from '../../assets/logo.svg';
import userAvatar from '../../assets/user-avatar.png';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
	return (
		<header className='shadow-sm py-2'>
			<Container>
				<Row>
					<Col md={6} className='align-self-center'>
						<figure className="m-0">
							<Link to={'/'}>
								<img src={logo} alt="" />
							</Link>
						</figure>
					</Col>
					<Col md={6}>
						<div className="d-flex align-items-center justify-content-end gap-3 main-menu">
							<NavLink to={'/'} end className={({isActive}) => `link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-100-hover ${isActive ? 'active' : ''}`}>Home</NavLink>
							<a href="/" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-100-hover'>Explore</a>
							<a href="/" className='link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-100-hover'>Help</a>
							<Button type='button' variant=''>
								<img src={userAvatar} alt="" />
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</header>
	)
}

export default Header