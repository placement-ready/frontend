import React from "react";
import { Play, Loader2 } from "lucide-react";

interface PreviewPlaceholderProps {
	compileResume: () => void;
	isCompiling: boolean;
}

export const PreviewPlaceholder = React.memo<PreviewPlaceholderProps>(
	({ compileResume, isCompiling }) => (
		<div className="h-full flex items-center justify-center bg-gray-50">
			<div className="text-center">
				<div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-lg flex items-center justify-center">
					<Play size={40} className="text-gray-400" />
				</div>
				<h3 className="text-lg font-semibold text-gray-600 mb-2">Preview Not Available</h3>
				<p className="text-sm text-gray-500 mb-4">
					Click &ldquo;Compile Resume&rdquo; to generate your preview
				</p>
				<button
					onClick={compileResume}
					disabled={isCompiling}
					className="flex items-center justify-center gap-2 py-2 px-4 text-sm font-semibold rounded-lg text-white bg-green-600 hover:bg-green-700 disabled:bg-green-400 transition-colors mx-auto"
				>
					{isCompiling ? (
						<>
							<Loader2 size={16} className="animate-spin" /> Compiling...
						</>
					) : (
						<>
							<Play size={16} /> Compile Resume
						</>
					)}
				</button>
			</div>
		</div>
	)
);
PreviewPlaceholder.displayName = "PreviewPlaceholder";
