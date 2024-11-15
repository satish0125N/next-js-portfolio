const LinkButton = ({ variant, href, children }) => {
	const baseStyle =
		'px-6 py-3 border font-xl rounded-md shadow-md duration-500 transition-all';

	const variantStyles = {
		black:
			'inline-block bg-black text-white border-white hover:text-gold hover:border-transparent hover:shadow-lg hover:shadow-gold',
		white:
			'inline-block bg-transparent text-white border-2 border-white hover:bg-white hover:text-black',
		green:
			' inline-block bg-green-500 text-white border-transparent hover:bg-green-700',
		blue:
			' inline-block bg-blue-500 text-white border-transparent hover:bg-blue-700',
	};

	return (
		<a href={href} className={`${baseStyle} ${variantStyles[variant]}`}>
			{children}
		</a>
	);
};

export default LinkButton;
