import type { APIRoute } from 'astro';
import * as SibApiV3Sdk from '@sendinblue/client';

const apiInstance = new SibApiV3Sdk.ContactsApi();

apiInstance.setApiKey(SibApiV3Sdk.ContactsApiApiKeys.apiKey, import.meta.env.BREVO_KEY);

export const post: APIRoute = async ({ request }) => {
	const data = await request.formData();
	const email = data.get('email').toString().toLowerCase();

	const emailExists = await checkIfEmailExists(email);

	if (emailExists) {
		return new Response(
			JSON.stringify({
				type: 'error',
				message: 'Fique tranquilo, você não perderá nenhuma novidade!',
			}),
			{ status: 400 }
		);
	}

	await addContact(email);

	return new Response(
		JSON.stringify({
			type: 'success',
			message: 'Você será o primeiro a saber quando o nosso programa estrear.',
		}),
		{ status: 200 }
	);
};

async function addContact(email) {
	const createContact = new SibApiV3Sdk.CreateContact();
	createContact.email = email;
	createContact.listIds = [2];

	const response = await apiInstance.createContact(createContact);
}

async function checkIfEmailExists(newEmail) {
	const response = await apiInstance.getContacts();
	const existingEmails = response.body.contacts.map(contact => contact.email);

	return existingEmails.includes(newEmail);
}
