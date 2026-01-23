// import { embed } from "ai";

//Note: voyageAI is recommended by anthropic who don't provide an embedding feature
import { VoyageAIClient } from "voyageai";

export async function generateEmbedding(text: string) {
	const input = text.replace("\n", " ");
	const client = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY });
	const { data } = await client.embed({
		model: "voyage-code-2",
		input: input,
	});
	return data![0].embedding;
}

//openai requires credit card details for this to work
// export async function generateEmbedding(text: string) {
// 	const input = text.replace("/n", " ");
// 	const { embedding } = await embed({
// 		model: "openai/text-embedding-3-small",
// 		value: input,
// 	});
// 	return embedding;
// }

export async function generateEmbeddings(texts: string[]) {
	const client = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY });
	const inputs = texts.map((text) => text.replace("/n", " "));
	const { data } = await client.embed({
		input: inputs,
		model: "voyage-code-2",
	});
	return data;
}
