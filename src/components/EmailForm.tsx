import { useState } from 'react';
import styles from './EmailForm.module.css';
import { JSXInternal } from 'preact/src/jsx';

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
					<div className={styles.formControl}>
						<input
							required
							minLength={5}
							type='email'
							placeholder='Email'
							name='email'
							id='email'
							className={styles.email}
						/>
						<button className={styles.ctaBtn}>Inscrever-se</button>
					</div>
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
