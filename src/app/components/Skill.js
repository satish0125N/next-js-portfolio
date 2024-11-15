import Image from 'next/image';
import React from 'react';
import ProjectImg from '../img/bg.webp';
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
export default function Skill() {
	const svgImages = [
		{ src: htmlSvg, alt: 'HTML', className: 'w-16 h-16' },
		{ src: cssSvg, alt: 'CSS', className: 'w-16 h-16' },
		{ src: bootstrap, alt: 'BOOTSTRAP', className: 'w-16 h-16' },
		{ src: tw, alt: 'TAILWINDCSS', className: 'w-16 h-16' },
		{ src: sass, alt: 'SASS', className: 'w-16 h-16' },
		{ src: jq, alt: 'JQUERY', className: 'w-16 h-16' },
		{ src: js, alt: 'JAVA SCRIPT', className: 'w-16 h-16' },
		{ src: php, alt: 'PHP', className: 'w-16 h-16' },
		{ src: wp, alt: 'WORDPRESS', className: 'w-16 h-16' },
		{ src: react, alt: 'REACT(BASIC)', className: 'w-16 h-16' },
		{ src: next, alt: 'NEXT(BASIC)', className: 'w-16 h-16' },
		{ src: figma, alt: 'FIGMA', className: 'w-16 h-16' },
		{ src: xd, alt: 'XD', className: 'w-16 h-16' },
		{ src: ps, alt: 'PHOTOSHOP', className: 'w-16 h-16' },
		{ src: gitlab, alt: 'GITLAB', className: 'w-16 h-16' },
		{ src: vs, alt: 'VISHUAL CODE', className: 'w-16 h-16' },

		// Add other SVGs
	];
	return (
		<>
			<section className='skill'>
				<h2 className='text-center font-toe text-black text-4xl py-4'>
					Skills & Technologies
				</h2>
				<div className='bg-black text-white py-20'>
					<div className='container mx-auto text-center'>
						<div className='grid grid-cols-2 md:grid-cols-6 gap-8'>
							{svgImages.map((svg, index) => (
								<div key={svg.alt} className='flex flex-col items-center'>
									<Image
										width={50}
										height={50}
										src={svg.src}
										alt={svg.alt}
										className={`${svg.className} w-16 h-16 mb-2`}
									/>
									<span>{svg.alt}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
