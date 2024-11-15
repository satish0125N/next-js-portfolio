'use client';
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
// import Bg from '../img/bgg.jpg';
import Navbar from './Navbar';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';
import htmlSvg from '../img/svg/html.svg';
import cssSvg from '../img/svg/css.svg';
import bootstrap from '../img/svg/bootstrap.svg';
import figma from '../img/svg/figma.svg';
import jq from '../img/svg/jq.svg';
import js from '../img/svg/js.svg';
import php from '../img/svg/php.svg';
import sass from '../img/svg/sass.svg';
import tw from '../img/svg/tw.svg';
import vs from '../img/svg/vs.svg';
import xd from '../img/svg/xd.svg';
import gitlab from '../img/svg/gitlab.svg';
import ps from '../img/svg/ps.svg';
import wp from '../img/svg/wordpress.svg';
import react from '../img/svg/react.svg';
import next from '../img/svg/next.svg';

function useLineAnimation(svgRef, sectionRef) {
	// Add sectionRef parameter
	useEffect(() => {
		if (!svgRef.current || !sectionRef.current) return;

		const root = svgRef.current;
		const section = sectionRef.current;
		const svgns = 'http://www.w3.org/2000/svg';
		const ease = 0.75;
		const total = 50;

		let pointer = {
			x: window.innerWidth / 2,
			y: window.innerHeight / 2,
		};

		let positions = Array(total)
			.fill()
			.map(() => ({
				x: pointer.x,
				y: pointer.y,
				line: document.createElementNS(svgns, 'line'),
			}));

		// Initialize lines
		positions.forEach((pos, i) => {
			root.appendChild(pos.line);
			pos.line.setAttribute('stroke', '#FFD700');
			pos.line.setAttribute('stroke-width', '1');
			pos.line.style.opacity = (total - i) / total;
		});

		function updateLines() {
			positions.forEach((pos, i) => {
				if (i === 0) {
					pos.x += (pointer.x - pos.x) * ease;
					pos.y += (pointer.y - pos.y) * ease;
				} else {
					pos.x += (positions[i - 1].x - pos.x) * ease;
					pos.y += (positions[i - 1].y - pos.y) * ease;
				}

				const line = pos.line;
				if (i === positions.length - 1) {
					line.setAttribute('x1', pos.x);
					line.setAttribute('y1', pos.y);
					line.setAttribute('x2', pos.x);
					line.setAttribute('y2', pos.y);
				} else {
					line.setAttribute('x1', pos.x);
					line.setAttribute('y1', pos.y);
					line.setAttribute('x2', positions[i + 1].x);
					line.setAttribute('y2', positions[i + 1].y);
				}
			});

			requestAnimationFrame(updateLines);
		}

		const handleMouseMove = (event) => {
			// Get section bounds
			const rect = section.getBoundingClientRect();

			// Check if mouse is within section bounds
			if (
				event.clientX >= rect.left &&
				event.clientX <= rect.right &&
				event.clientY >= rect.top &&
				event.clientY <= rect.bottom
			) {
				pointer.x = event.clientX;
				pointer.y = event.clientY;
				root.style.opacity = '1';
			} else {
				root.style.opacity = '0';
			}
		};

		window.addEventListener('mousemove', handleMouseMove);
		requestAnimationFrame(updateLines);

		// Cleanup
		return () => {
			window.removeEventListener('mousemove', handleMouseMove);
			positions.forEach((pos) => {
				if (pos.line.parentNode) {
					pos.line.parentNode.removeChild(pos.line);
				}
			});
		};
	}, []);
}
export default function Masthead() {
	const [navbarHeight, setNavbarHeight] = useState(0); // State to store navbar height

	// Function to handle navbar height changes
	const handleHeightChange = (height) => {
		setNavbarHeight(height);
	};
	const svgRef = useRef(null);
	const sectionRef = useRef(null);
	useLineAnimation(svgRef, sectionRef);
	const h1Ref = useRef(null);
	useEffect(() => {
		// Register plugin inside useEffect
		gsap.registerPlugin(SplitText);

		// GSAP animation setup
		const ctx = gsap.context(() => {
			if (h1Ref.current) {
				const split = new SplitText(h1Ref.current, {
					type: 'chars',
				});

				gsap.set(split.chars, { perspective: 3000 });
				gsap.from(split.chars, {
					duration: 0.5,
					scale: 4,
					autoAlpha: 0,
					ease: 'none',
					stagger: 0.03,
				});
			}
		});

		// Cleanup
		return () => ctx.revert();
	}, []);

	const svgContainerRef = useRef(null);

	// Array of SVG objects
	const svgImages = [
		{ src: htmlSvg, alt: 'HTML', className: 'w-16 h-16' },
		{ src: cssSvg, alt: 'CSS', className: 'w-16 h-16' },
		{ src: bootstrap, alt: 'BOOTSTRAP', className: 'w-16 h-16' },
		{ src: figma, alt: 'FIGMA', className: 'w-16 h-16' },
		{ src: jq, alt: 'JQUERY', className: 'w-16 h-16' },
		{ src: js, alt: 'JAVA SCRIPT', className: 'w-16 h-16' },
		{ src: php, alt: 'PHP', className: 'w-16 h-16' },
		{ src: sass, alt: 'SASS', className: 'w-16 h-16' },
		{ src: tw, alt: 'TAILWINDCSS', className: 'w-16 h-16' },
		{ src: vs, alt: 'VISHUAL CODE', className: 'w-16 h-16' },
		{ src: xd, alt: 'XD', className: 'w-16 h-16' },
		{ src: gitlab, alt: 'GITLAB', className: 'w-16 h-16' },
		{ src: ps, alt: 'PHOTOSHOP', className: 'w-16 h-16' },
		{ src: wp, alt: 'WORDPRESS', className: 'w-16 h-16' },
		{ src: react, alt: 'REACT(BASIC)', className: 'w-16 h-16' },
		{ src: next, alt: 'NEXT(BASIC)', className: 'w-16 h-16' },

		// Add other SVGs
	];

	useEffect(() => {
		if (!svgContainerRef.current) return;
		const container = svgContainerRef.current;
		const svgs = container.querySelectorAll('.tech-svg');

		const getRandomTransform = () => ({
			x: Math.random() * window.innerWidth - window.innerWidth / 2, // Relative to screen width
			y: Math.random() * window.innerHeight - window.innerHeight / 2, // Relative to screen height
		});

		// Set initial state
		svgs.forEach((svg) => {
			const random = getRandomTransform();
			gsap.set(svg, {
				opacity: 0,
				scale: 0.5,
				x: random.x,
				y: random.y,
			});
		});

		const tl = gsap.timeline();

		// Animate to center
		tl.to(svgs, {
			// opacity: 1,
			scale: 1,
			x: 0,
			y: 0,
			duration: 1.2,
			stagger: {
				each: 0.2,
				ease: 'power2.out',
			},
			ease: 'elastic.out(1, 0.5)',
		});

		// Add floating animation
		svgs.forEach((svg) => {
			const randomFloat = {
				x: Math.random() * 20 - 10,
				y: Math.random() * 20 - 10,
			};

			gsap.to(svg, {
				x: `+=${randomFloat.x}`,
				y: `+=${randomFloat.y}`,
				opacity: 1,
				duration: 2 + Math.random() * 2,
				repeat: -1,
				yoyo: true,
				ease: 'sine.inOut',
				delay: Math.random() * 2,
			});
		});

		// Handle hover for individual SVGs
		const handleMouseMove = (e) => {
			const hoveredSvg = e.target.closest('.tech-svg');
			if (!hoveredSvg) return;

			const { clientX, clientY } = e;
			const rect = hoveredSvg.getBoundingClientRect();
			const centerX = rect.left + rect.width / 2;
			const centerY = rect.top + rect.height / 2;

			const dx = (clientX - centerX) * 0.2;
			const dy = (clientY - centerY) * 0.2;

			gsap.to(hoveredSvg, {
				x: `+=${dx}`,
				y: `+=${dy}`,
				duration: 0.3,
				ease: 'power2.out',
			});
		};

		container.addEventListener('mousemove', handleMouseMove);

		// Cleanup
		return () => {
			container.removeEventListener('mousemove', handleMouseMove);
			gsap.killTweensOf(svgs);
		};
	}, []);

	return (
		<>
			<Navbar onHeightChange={handleHeightChange} />
			<section
				ref={sectionRef}
				style={{
					height: `calc(100vh - ${navbarHeight}px)`,
				}}
				className='masthead overflow-hidden relative bg-black p-b-20  flex flex-col items-center justify-center'>
				<div ref={svgContainerRef} className='svg-container absolute top-0 h-full'>
					{svgImages.map((svg, index) => (
						<div key={svg.alt} className='tech-svg relative opacity-0'>
							<Image
								src={svg.src}
								alt={svg.alt}
								width={48}
								height={48}
								className={`${svg.className} transition-all duration-300 hover:scale-110`}
							/>
						</div>
					))}
				</div>
				<svg
					ref={svgRef}
					className='draw-line absolute top-0 left-0 w-full h-full pointer-events-none'
					style={{ overflow: 'visible', transition: 'opacity 0.3s ease' }}></svg>
				{/* <Image
					src={Bg}
					alt='background image'
					width={'100%'}
					height={'100%'}
					priority
					className='absolute top-0 left-0 w-full h-full object-cover z-0'
				/> */}
				<div className='container'>
					<h1
						ref={h1Ref}
						data-title
						className='font-toe neo-shadow relative text-center text-4xl xl:text-5xl '>
						Welcome to my portfolio
					</h1>
				</div>
			</section>
		</>
	);
}
