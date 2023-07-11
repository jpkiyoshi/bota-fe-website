import styles from './TextInput.module.css';
import LoadingSpinner from './LoadingSpinner';

type TextInputProps = {
	type: string;
	loading: boolean;
};

const TextInput = ({ type, loading }: TextInputProps) => {
	return (
		<div className={styles.formControl}>
			<input
				required
				minLength={5}
				type={type}
				placeholder={type.charAt(0).toUpperCase() + type.slice(1)}
				name={type}
				id={type}
				className={styles.emailInput}
			/>
			<button className={styles.ctaBtn}>
				{loading ? <LoadingSpinner /> : 'Inscrever-se'}
			</button>
		</div>
	);
};
export default TextInput;
