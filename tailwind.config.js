/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			container: {},
			fontFamily: {
				toe: 'Toe the Lineless',
				colus: 'Colus',
			},
			fontSize: {
				sm: '12px',
				base: '14px',
				xl: '16px',
				'2xl': '18px',
				'3xl': '20px',
				'4xl': '34px',
				'5xl': '80px',
			},
			colors: {
				background: 'var(--background)',
				foreground: 'var(--foreground)',
				primary: '#bf5dd7',
				purple: '#6E0990ff',
				gold: '#FFD700',
			},
		},
	},
	plugins: [
		function ({ addUtilities }) {
			addUtilities({
				'.preserve-3d': {
					'transform-style': 'preserve-3d',
				},
				'.perspective-3000': {
					perspective: '3000px',
				},
			});
		},
	],
};
