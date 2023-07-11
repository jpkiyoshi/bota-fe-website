import type { APIRoute } from 'astro';
import { Client } from '@notionhq/client';
import UAParser from 'ua-parser-js';

const notion = new Client({ auth: import.meta.env.NOTION_KEY });

const databaseId = import.meta.env.NOTION_DATABASE_ID;

export const post: APIRoute = async ({ request }) => {
	const data = await request.formData();
	const userAgent = request.headers.get('user-agent');
	const { os, browser } = parseUserAgent(userAgent);

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

	await addItem({ email, os, browser });

	return new Response(
		JSON.stringify({
			type: 'success',
			message: 'Você será o primeiro a saber quando o nosso programa estrear.',
		}),
		{ status: 200 }
	);
};

async function addItem(item: { email: string; os: string; browser: string }) {
	try {
		const response = await notion.pages.create({
			parent: { database_id: databaseId },
			properties: {
				title: {
					title: [
						{
							text: {
								content: item.email,
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
				'Sistema Operacional': {
					rich_text: [
						{
							type: 'text',
							text: {
								content: item.os,
							},
						},
					],
				},
				Browser: {
					rich_text: [
						{
							type: 'text',
							text: {
								content: item.browser,
							},
						},
					],
				},
			},
		});
		console.log('Success! Entry added.');
		console.log(response);
	} catch (error) {
		console.error(error.body);
	}
}

async function checkIfEmailExists(newEmail: string) {
	const response = await notion.databases.query({
		database_id: databaseId,
	});
	const existingEmails = response.results.map(
		// @ts-ignore
		result => result.properties.Email.title[0].plain_text
	);

	return existingEmails.includes(newEmail);
}

function parseUserAgent(userAgent: string) {
	const parser = UAParser(userAgent);
	return {
		os: `${parser.os.name} ${parser.os.version}`,
		browser: `${parser.browser.name} ${parser.browser.version}`,
	};
}

function getBRTimeZoneInISOFormat(): string {
	const dataUTC = new Date();
	const offsetBrazil = -3; // Fuso horário do Brasil: UTC-3
	const dataBrazil = new Date(dataUTC.getTime() + offsetBrazil * 60 * 60 * 1000);

	return dataBrazil.toISOString();
}
