import Info from './components/Info';
import Masthead from './components/Masthead';
import Navbar from './components/Navbar';
import Project from './components/Project';
import Skill from './components/Skill';
export default function Home() {
	return (
		<div className='font-[family-name:var(--font-geist-sans)]'>
			{/* <Navbar /> */}

			<main className='block overflow-hidden'>
				<Masthead />
				<Info />
				<Skill />
				<Project />
			</main>

			<footer className='row-start-3 flex gap-6 flex-wrap items-center justify-center'></footer>
		</div>
	);
}
