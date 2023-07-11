import styles from './TextInput.module.css';

type TextInputProps = {
	type: string;
};

const TextInput = ({ type }: TextInputProps) => {
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
			<button className={styles.ctaBtn}>Inscrever-se</button>
		</div>
	);
};
export default TextInput;
