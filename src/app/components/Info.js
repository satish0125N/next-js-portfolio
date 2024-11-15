import Image from 'next/image';
import React from 'react';
import img from '../img/bg.jpg';
import Button from './Button';
import LinkButton from './Button';
export default function Info() {
	return (
		<>
			<section className='info'>
				<h2 className='text-center font-toe text-black text-4xl py-4 '>
					Personal Introduction
				</h2>
				<div className='bg-black text-white py-20'>
					<div className='container mx-auto flex flex-col-reverse md:flex-row items-center'>
						{/* Left Column - Text Content */}
						<div className='w-full md:w-1/2 text-center md:text-left'>
							<h1 className='text-4xl md:text-6xl font-bold font-colus mb-6 '>
								Hi, I'm Satish Thakor
							</h1>
							<p className='text-xl md:text-3xl mb-6 font-colus'>
								Front-End Developer | Freelance Specialist at Zs Creations
							</p>
							<p className='text-lg mb-8 '>
								I specialize in building modern, responsive websites and web
								applications with a focus on accessibility, performance, and
								user-centered design. I have expertise in technologies like React,
								Next.js, Tailwind CSS, HTML, CSS, WordPress, PHP, JavaScript, jQuery,
								SASS, and SEO.
							</p>
							<div className='flex justify-center md:justify-start space-x-4'>
								<LinkButton variant='black' href='#projects'>
									View Projects
								</LinkButton>
								<LinkButton variant='black' href='#projects'>
									Contact Me
								</LinkButton>
							</div>
						</div>

						{/* Right Column - Profile Image */}
						<div className='w-full md:w-1/2 mb-8 md:mb-0 flex justify-center'>
							<Image
								width={50}
								height={50}
								src={img}
								width={500}
								height={500}
								alt='Satish Thakor'
								className='rounded-full w-48 h-48 md:w-72 md:h-72 shadow-lg'
							/>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
