# RAG ChatBot Project

A coding exercise designed to practise extending the response capabilities of AI to include details in a document, for example a company policy. Such information would not be available in the LLM.

The document is loaded into a supabase in the form of chunks and their corresponding embedding.

A ui page /upload permits the user to upload a document which is then subject to the above process. The function is in .app/upload/actions.ts contains the function to do this.

The ui page /chat provides a simple chat form to allow the user to conduct a back and forth conversation with the AI bot.

A tool, searchKnowledgeBase, has been written which the ai can use to provide answers to questions about the uploaded document. The tool references the function searchDocuments which will take a query, convert it into an embedding and then query the supabase database using cosine distance to return the most suitable response.

## Observations

It does not always work as expected or hoped. I uploaded the minutes from a meeting. When questioned the ai didn't always correctly provide the names of the those who attended, the location, or the date of the meeting.

I changed models from ai to anthropic and saw slight improvements.

There is more experimentation required.

## Tech Stack

Next.js v16  
Vercel ai-sdk v6
Drizzle ORM
Supabase
Anthropic Claude Sonnet-4.5

## Reference

Codevolution - ai-sdk v5 Full Course
https://www.youtube.com/watch?v=BQmbuEClULY&t=15686s
