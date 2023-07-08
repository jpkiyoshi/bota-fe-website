import type { APIRoute } from 'astro';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: import.meta.env.NOTION_KEY });

const databaseId = import.meta.env.NOTION_DATABASE_ID;

export const post: APIRoute = async ({ request }) => {
	const data = await request.formData();
	const email = data.get('email');

	if (!email) {
		return new Response(
			JSON.stringify({
				message: 'Por favor, insira um email válido',
			}),
			{ status: 400 }
		);
	}

	await addItem(email);

	return new Response(
		JSON.stringify({
			message: 'Obrigado!',
		}),
		{ status: 200 }
	);
};

async function addItem(text: any) {
	try {
		const response = await notion.pages.create({
			parent: { database_id: databaseId },
			properties: {
				title: {
					title: [
						{
							text: {
								content: text,
							},
						},
					],
				},

				Notificação: {
					people: [
						{
							object: 'user',
							id: '3ea45fc2-08e2-45e3-8aef-4f8ae62f8858',
						},
					],
				},
				Data: {
					date: {
						start: getBRTimeZoneInISOFormat(),
					},
				},
			},
		});
		console.log('Success! Entry added.');
	} catch (error) {
		console.error(error.body);
	}
}

function getBRTimeZoneInISOFormat(): string {
	const dataUTC = new Date();
	const offsetBrazil = -3; // Fuso horário do Brasil: UTC-3
	const dataBrazil = new Date(dataUTC.getTime() + offsetBrazil * 60 * 60 * 1000);

	return dataBrazil.toISOString();
}
