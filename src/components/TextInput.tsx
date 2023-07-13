import LoadingSpinner from './LoadingSpinner';

type TextInputProps = {
	type: string;
	loading: boolean;
};

const TextInput = ({ type, loading }: TextInputProps) => {
	return (
		<div className='relative flex mx-auto h-12'>
			<input
				required
				minLength={5}
				type={type}
				placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
				name={type}
				id={type}
				className='rounded-full p-2 border border-cool-grey-50 w-80 sm:w-96 text-sm px-5 bg-cool-grey-50 focus:outline-2 outline-pink-vivid-500'
			/>
			<button className='absolute right-1 top-1 bg-pink-vivid-500 text-cool-grey-50 border-0 rounded-full font-bold transition-colors py-3 px-4 text-xs hover:bg-pink-vivid-600'>
				{loading ? <LoadingSpinner /> : 'Inscrever-se'}
			</button>
		</div>
	);
};
export default TextInput;
