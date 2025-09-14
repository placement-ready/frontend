import React from "react";
import { Sparkles } from "lucide-react";

interface InputProps {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	type?: string;
	disabled?: boolean;
}

export const Input = React.memo<InputProps>(
	({ label, value, onChange, placeholder = "", type = "text", disabled = false }) => (
		<div>
			<label className="block mb-1.5 text-sm font-medium text-gray-700">{label}</label>
			<input
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				disabled={disabled}
				className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none disabled:bg-gray-200 transition-colors caret-green-600"
			/>
		</div>
	)
);
Input.displayName = "Input";

interface TextareaProps {
	label: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
	placeholder?: string;
	rows?: number;
	aiClick?: () => void;
}

export const Textarea = React.memo<TextareaProps>(
	({ label, value, onChange, placeholder = "", rows = 4, aiClick }) => (
		<div>
			<div className="flex justify-between items-center mb-1.5">
				<label className="text-sm font-medium text-gray-700">{label}</label>
				{aiClick && (
					<button
						type="button"
						onClick={aiClick}
						className="flex items-center text-green-600 text-xs font-semibold hover:text-green-700"
					>
						<Sparkles className="w-3 h-3 mr-1" /> AI Suggest
					</button>
				)}
			</div>
			<textarea
				rows={rows}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				className="w-full px-3 py-2 bg-white rounded-md border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-green-500 focus:outline-none resize-vertical transition-colors caret-green-600"
			/>
		</div>
	)
);
Textarea.displayName = "Textarea";
