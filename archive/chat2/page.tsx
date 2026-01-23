"use client";

import { useState, Fragment } from "react";
import { useChat } from "@ai-sdk/react";

import {
	PromptInput,
	PromptInputBody,
	type PromptInputMessage,
	PromptInputSubmit,
	PromptInputTextarea,
	PromptInputTools,
} from "@/components/ai-elements/prompt-input";
import {
	Message,
	MessageContent,
	MessageResponse,
} from "@/components/ai-elements/message";
import {
	Conversation,
	ConversationContent,
	ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Loader } from "@/components/ai-elements/loader";

export default function RAGChatBot() {
	const [input, setInput] = useState("");
	const { messages, sendMessage, status } = useChat();

	const handleSubmit = (message: PromptInputMessage) => {
		if (!message.text) return;
		sendMessage({ text: message.text });
		setInput("");
	};

	return (
		<div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh-4rem)]">
			Chat page
			<div className="flex flex-col h-full">
				<Conversation className="h-full">
					<ConversationContent>
						{messages.map((message) => (
							<div
								key={message.id}
								className={
									message.role === "user" ? "flex justify-end" : "flex"
								}
							>
								{message.parts.map((part, index) => {
									switch (part.type) {
										case "text":
											return (
												<Fragment key={`${message.id}-${index}`}>
													<MessageContent
														className={
															message.role === "user"
																? "bg-slate-400 p-3 rounded border border-blue-500"
																: "bg-slate-100 p-3 px-5 rounded"
														}
													>
														<MessageResponse>{part.text}</MessageResponse>
													</MessageContent>
												</Fragment>
											);
										default:
											return null;
									}
								})}
							</div>
						))}
						{status === "submitted" || (status === "streaming" && <Loader />)}
					</ConversationContent>
					<ConversationScrollButton />
				</Conversation>
				<PromptInput onSubmit={handleSubmit} className="mt-4 p-3 mb-9">
					<PromptInputBody>
						<PromptInputTextarea
							value={input}
							onChange={(e) => setInput(e.target.value)}
						/>
					</PromptInputBody>
					{/* <PromptInputTools> */}
					{/* {Model Selector, web search}  */}
					{/* </PromptInputTools> */}
					<PromptInputSubmit />
				</PromptInput>
			</div>
		</div>
	);
}
