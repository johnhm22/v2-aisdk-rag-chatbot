"use client";

import React, { useState } from "react";
import { processPdfFile } from "./actions";
import { Loader2 } from "lucide-react";

export default function PDFUpload() {
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{
		type: "error" | "success";
		text: string;
	} | null>(null);

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;
		setIsLoading(true);
		setMessage(null);
		try {
			const formData = new FormData();
			formData.append("pdf", file);

			const result = await processPdfFile(formData);
			if (result.success) {
				setMessage({
					type: "success",
					text: result.message || "PDF processed successfully",
				});
				e.target.value = "";
			} else {
				setMessage({
					type: "error",
					text: result.error || "Failed to process PDF",
				});
			}
		} catch (err) {
			setMessage({
				type: "error",
				text: "An error occurred while processing the PDF",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen gb-gray-50 py-12 px-4">
			<div className="mx-w-4xl mx-auto">
				<h1 className="text-gray-900 text-3xl font-bold mb-8 text-center">
					PDF Upload
				</h1>
				<form className="mb-6 border border-slate-200 rounded-lg shadow max-w-3xl mx-auto py-3 px-2">
					<div className="pt-6">
						<div className="space-y-4 flex flex-col">
							<label htmlFor="pdf-upload ">Upload PDF file</label>
							<input
								id="pdf-upload"
								type="file"
								accept=".pdf"
								onChange={handleFileUpload}
								disabled={isLoading}
								className="mt-2 border border-slate-300 py-3 px-2 rounded font-semibold"
							/>
						</div>
						{isLoading && (
							<div className="flex items-center gap-2 mt-5">
								<Loader2 className="h-5 w-5 animate-spin" />
								<span className="text-muted-foreground">Processing PDF...</span>
							</div>
						)}
						{message && (
							<div className="mt-5">
								<span>{message.type === "error" ? "Error" : "Success"}</span>
								{message.type === "success" && <span>`{message.text}`</span>}
							</div>
						)}
					</div>
				</form>
			</div>
		</div>
	);
}
