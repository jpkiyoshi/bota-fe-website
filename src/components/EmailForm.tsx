import { useState } from 'react';
import styles from './EmailForm.module.css';
import { JSXInternal } from 'preact/src/jsx';
import TextInput from './TextInput';

const EmailForm = () => {
	const [successMsg, setSuccessMsg] = useState<string>('');
	const [showForm, setShowForm] = useState<boolean>(true);

	async function handleSubmit(e: JSXInternal.TargetedEvent<HTMLFormElement, Event>) {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);

		const response = await fetch('/api/notionClient', {
			method: 'POST',
			body: formData,
		});

		const data = await response.json();

		if (data.message) {
			setSuccessMsg(data.message);
		}

		setShowForm(false);
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			{showForm && (
				<>
					<label htmlFor='email'>
						Inscreva-se para ser notificado assim que o programa estrear!
					</label>
					<TextInput type='email' />
				</>
			)}
			{successMsg && (
				<div className={styles.successMsg}>
					<p>{successMsg}</p>
				</div>
			)}
		</form>
	);
};

export default EmailForm;
