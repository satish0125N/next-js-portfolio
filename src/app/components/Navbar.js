'use client';

import Image from 'next/image';
import React, { useEffect, useLayoutEffect, useRef } from 'react';

export default function Navbar({ onHeightChange }) {
	const divRef = useRef(null);
	const [divHeight, setDivHeight] = React.useState(0);
	useLayoutEffect(() => {
		if (divRef.current) {
			const newheight = divRef.current.clientHeight;
			setDivHeight(newheight);
			onHeightChange(newheight);
			// console.log(newheight);
		}
	}, []);

	const [display, setDisplay] = React.useState(false);

	function handleClick() {
		// Toggle state
		setDisplay((prevState) => !prevState);

		// Add or remove a class from the body tag
		if (!display) {
			// document.body.classList.add('overflow-hidden');
		} else {
			// document.body.classList.remove('overflow-hidden');
		}
	}

	const [isSticky, setIsSticky] = React.useState(false); // State to manage sticky class
	const navbarRef = useRef(null); // Ref for the header

	// Function to handle scroll
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 101) {
				// Set threshold for when to apply sticky
				setIsSticky(true);
			} else {
				setIsSticky(false);
			}
		};

		// Add scroll event listener
		window.addEventListener('scroll', handleScroll);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);
	return (
		<>
			<header
				ref={divRef}
				className='relative flex justify-between items-center bg-black py-8 px-4 z-[999]'>
				<span className='border-gradient block absolute left-0 bottom-0'></span>
				<Image
					src='/next.svg'
					alt='Next.js logo'
					width={180}
					height={38}
					priority
				/>
				<Image
					src='/next.svg'
					alt='Next.js logo'
					width={180}
					height={38}
					priority
					className='hidden lg:block'
				/>
				<nav
					className={`static w-[180px] justify-end flex ${isSticky ? 'sticky top-0 z-50 ' : ''}`}
					ref={navbarRef}>
					<button
						onClick={handleClick}
						className={`${isSticky ? 'hidden' : 'block'}`}>
						<svg
							className='block h-6 w-6 text-white cursor-pointer'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth='1.5'
							stroke='currentColor'
							aria-hidden='true'
							data-slot='icon'>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
							/>
						</svg>
					</button>
					<div
						style={
							isSticky
								? {
										top: '0px', // Set top to 0 when sticky
										opacity: '1',
										visibility: 'visible',
									}
								: {
										top: display ? `${divHeight}px` : `-${divHeight}px`, // Set top based on display
										opacity: display ? '1' : '0', // Opacity based on display
										visibility: display ? 'visible' : 'hidden', // Visibility based on display
									}
						}
						className={` backdrop-blur-[15px] bg-gold bg-opacity-10  shadow-lg shadow-gold absolute  translate-x-[-50%] left-[50%] px-4 w-full h-auto max-w-[1000px] ease-linear duration-300 text-white z-[99] rounded-br-[15px] rounded-bl-[15px] ${isSticky ? 'top-0 ' : ''}`}>
						{/* Content here */}

						<span className=' block absolute left-0'></span>
						<ul className='flex justify-center py-[15px] gap-4  '>
							<li className='text-primary'>
								<a
									className='text-2xl text-white transition-all hover:text-gold'
									href='#'>
									Home
								</a>
							</li>
							<li>
								<a
									className='text-2xl text-white transition-all hover:text-gold'
									href='#'>
									Project
								</a>
							</li>
							<li>
								<a
									className='text-2xl text-white transition-all hover:text-gold'
									href='#'>
									About
								</a>
							</li>
							<li>
								<a
									className='text-2xl text-white transition-all hover:text-gold'
									href='#'>
									Contact
								</a>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		</>
	);
}
