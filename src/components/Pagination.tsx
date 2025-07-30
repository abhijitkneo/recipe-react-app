import React from 'react'
import { Button } from 'react-bootstrap';

interface paginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void
}

const Pagination = ({currentPage, totalPages, onPageChange} : paginationProps) => {

	const pageNumbers = Array.from({ length: totalPages }, (_ , i) => i + 1)

	return (
		<nav aria-label="Page navigation">
			<ul className="pagination gap-2">
				<li className="page-item">
					<Button className='page-link' onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
						<span aria-hidden="true">&laquo;</span>
					</Button>
				</li>
				{
					pageNumbers.map((number) => (
						<li 
							className={`page-item ${currentPage === number ? 'active' : ''}`} 
							key={number} 
							onClick={() => onPageChange(number)}
						>
							<Button className='page-link'>{number}</Button>
						</li>
					))
				}

				<li className="page-item">
					<Button className='page-link' onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
						<span aria-hidden="true">&raquo;</span>
					</Button>
				</li>
			</ul>
		</nav>
	)
}

export default Pagination