import client from '@mailchimp/mailchimp_marketing';

client.setConfig({
	apiKey: import.meta.env.MAILCHIMP_KEY,
	server: import.meta.env.MAILCHIMP_SERVER,
});

export const post = async ({ request }) => {
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

	await addMember(email);

	return new Response(
		JSON.stringify({
			type: 'success',
			message: 'Você será o primeiro a saber quando o nosso programa estrear.',
		}),
		{ status: 200 }
	);
};

async function addMember(email) {
	const response = await client.lists.addListMember(
		import.meta.env.MAILCHIMP_PROGRAMABOTAFE_AUDIENCE_ID,
		{
			email_address: email,
			status: 'subscribed',
			tags: ['website'],
		}
	);
}

async function checkIfEmailExists(newEmail) {
	const response = await client.lists.getListMembersInfo(
		import.meta.env.MAILCHIMP_PROGRAMABOTAFE_AUDIENCE_ID
	);
	const existingEmails = response.members.map(member => member.email_address);

	return existingEmails.includes(newEmail);
}
