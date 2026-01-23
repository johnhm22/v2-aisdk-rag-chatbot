import { cosineDistance, desc, gt, sql, asc, lt } from "drizzle-orm";
import { db } from "./db-config";
import { documents } from "./db-schema";
import { generateEmbedding } from "./embeddings";

export async function searchDocuments(
	query: string,
	limit: number = 10,
	threshold: number = 0.25,
) {
	const embedding = await generateEmbedding(query);
	const distance = cosineDistance(documents.embedding, embedding!);

	// const similarity = sql<number>`1 - ${cosineDistance(
	// 	documents.embedding,
	// 	embedding!,
	// )}`;

	const similarDocuments = await db
		.select({
			id: documents.id,
			content: documents.content,
			distance,
			// embedding: documents.embedding,
		})
		.from(documents)
		.where(lt(distance, threshold))
		.orderBy(asc(distance))
		.limit(limit);

	const distancesAndContent = similarDocuments.map((doc) => {
		return { id: doc.id, content: doc.content, similarity: 1 - doc.distance };
	});
	console.log("***********************");
	console.log("distances: ", distancesAndContent);
	console.log("***********************");

	return distancesAndContent;
}
