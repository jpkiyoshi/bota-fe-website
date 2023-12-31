type AlertProps = {
	type: 'error' | 'success';
	text: string;
};

const Alert = ({ type, text }: AlertProps) => {
	return (
		<div
			className={`py-3 px-4 text-center rounded-md w-fit max-w-[90%] mx-auto text-base shadow-md ${
				type === 'error'
					? 'bg-red-vivid-50 text-red-vivid-900 border-2 border-red-vivid-400'
					: 'bg-cyan-vivid-50 text-cyan-vivid-900 border-2 border-cyan-vivid-700'
			}`}
		>
			<div className='flex items-center gap-1 mb-1'>
				{type === 'error' ? (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 24 24'
					>
						<path
							fill='hsl(348, 94%, 20%)'
							d='M13 13h-2V7h2m0 10h-2v-2h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2Z'
						/>
					</svg>
				) : (
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='20'
						height='20'
						viewBox='0 0 24 24'
					>
						<path
							fill='hsl(188, 91%, 23%)'
							d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9Z'
						/>
					</svg>
				)}
				<h3 class='text-base font-bold'>
					{type === 'error'
						? 'Ops! Email já cadastrado.'
						: 'Email registrado com sucesso!'}
				</h3>
			</div>
			<p class='text-sm'>{text}</p>
		</div>
	);
};
export default Alert;
