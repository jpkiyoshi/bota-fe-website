import { useState } from 'react';
import styles from './EmailForm.module.css';

const EmailForm = () => {
	const [successMsg, setSuccessMsg] = useState('');
	const [showForm, setShowForm] = useState(true);

	const handleSubmit = async e => {
		e.preventDefault();

		const formData = new FormData(e.target);

		const response = await fetch('/api/formHandling', {
			method: 'POST',
			body: formData,
		});

		const data = await response.json();

		if (data.message) {
			setSuccessMsg(data.message);
		}

		setShowForm(false);
	};

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
							minLength='5'
							type='email'
							placeholder='Email'
							name='email'
							id='email'
							className={styles.email}
						/>
						<button className={styles.ctaBtn}>Enviar</button>
					</div>
				</>
			)}
			{successMsg && <p>{successMsg}</p>}
		</form>
	);
};

export default EmailForm;
