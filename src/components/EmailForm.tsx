import { useState } from 'react';
import { JSXInternal } from 'preact/src/jsx';
import TextInput from './TextInput';
import Alert from './Alert';

const EmailForm = () => {
	const [loading, setLoading] = useState(false);
	const [responseMsg, setResponseMsg] = useState({ type: null, text: null });
	const [showForm, setShowForm] = useState<boolean>(true);

	async function handleSubmit(e: JSXInternal.TargetedEvent<HTMLFormElement, Event>) {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData(e.currentTarget);

		const response = await fetch('/api/mailchimpClient', {
			method: 'POST',
			body: formData,
		});

		const data = await response.json();

		if (data.message) {
			setResponseMsg({
				type: data.type,
				text: data.message,
			});
		}

		setShowForm(false);
		setLoading(false);
	}

	return (
		<form className='flex flex-col gap-2 text-center mx-3' onSubmit={handleSubmit}>
			{showForm && (
				<>
					<label htmlFor='email' class='text-cool-grey-100'>
						Inscreva-se para ser notificado assim que o programa estrear!
					</label>
					<TextInput type='email' loading={loading} />
				</>
			)}
			{responseMsg.text && (
				<Alert type={responseMsg.type} text={responseMsg.text} />
			)}
		</form>
	);
};

export default EmailForm;
