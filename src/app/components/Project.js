'use client';
import Image from 'next/image';
import React from 'react';
import ProjectImg from '../img/dev.jpg';
import ProjectImg2 from '../img/dev-1.jpg';
import LinkButton from './Button';

export default function Project() {
	return (
		<>
			<section className='relative'>
				<h2 className='text-center font-toe text-black text-4xl py-4'>
					My Projects
				</h2>
				<p className='text-center font-colus text-3xl pb-4'>
					Check out some of the awesome projects I have worked on.
				</p>
				<div className='bg-black text-white py-12 md:py-20'>
					<div className='container mx-auto'>
						<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
							<div className='relative perspective-3000 preserve-3d group overflow-hidden rounded-lg border border-white'>
								<div className='rounded-lg z-10 w-full   group-hover:opacity-0 group-hover:invisible  transition duration-1000'>
									<Image
										src={ProjectImg}
										width={`100%`}
										height={`100%`}
										alt='Project Image 1'
										className='w-full h-[300px] object-cover rounded-lg '
									/>
									<div className='absolute group-hover:opacity-0  inset-0 w-full h-full bg-black opacity-50'></div>{' '}
									{/* This is the overlay */}
									<div className='absolute group-hover:opacity-0  inset-0 flex items-center justify-center'>
										<h2 className='text-center font-toe text-white text-4xl py-4'>
											Portfolio Website
										</h2>
									</div>
								</div>
								<div className='flex flex-col h-full p-4 overflow-auto md:p-8 absolute z-0 text-white  opacity-0  group-hover:opacity-100 group-hover:translate-y-[-100%] group-hover:opacity-1 w-full rounded-lg transition duration-1000'>
									<div className='z-100 relative'>
										<h2 className='text-center font-colus text-white text-3xl py-4'>
											Portfolio Website
										</h2>
										<h3 className='pb-2'>A personal portfolio website</h3>
										<p className='pb-2'>
											A custom-built portfolio website showcasing my skills, projects, and
											resume.
										</p>
										<p className='pb-4'>Technologies: React, Next.js, Tailwind CSS</p>
										<LinkButton variant='black' href='#projects'>
											View Projects
										</LinkButton>
									</div>
								</div>
							</div>
							<div className='relative perspective-3000 preserve-3d group overflow-hidden rounded-lg border border-white'>
								<div className='rounded-lg z-10 w-full   group-hover:opacity-0 group-hover:invisible  transition duration-1000'>
									<Image
										src={ProjectImg2}
										width={`100%`}
										height={`100%`}
										alt='Project Image 1'
										className='w-full h-[300px] object-cover rounded-lg '
									/>
									<div className='absolute group-hover:opacity-0  inset-0 w-full h-full bg-black opacity-50'></div>{' '}
									{/* This is the overlay */}
									<div className='absolute group-hover:opacity-0  inset-0 flex items-center justify-center'>
										<h2 className='text-center font-toe text-white text-4xl py-4'>
											Portfolio Website
										</h2>
									</div>
								</div>
								<div className='flex flex-col h-full p-4 overflow-auto md:p-8 absolute z-0 text-white  opacity-0  group-hover:opacity-100 group-hover:translate-y-[-100%] group-hover:opacity-1 w-full rounded-lg transition duration-1000'>
									<div className='z-100 relative'>
										<h2 className='text-center font-colus text-white text-3xl py-4'>
											Portfolio Website
										</h2>
										<h3 className='pb-2'>A personal portfolio website</h3>
										<p className='pb-2'>
											A custom-built portfolio website showcasing my skills, projects, and
											resume.
										</p>
										<p className='pb-4'>Technologies: React, Next.js, Tailwind CSS</p>
										<LinkButton variant='black' href='#projects'>
											View Projects
										</LinkButton>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
