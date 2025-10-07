import React from "react";
import { Input, Textarea } from "./FormComponents";

interface PersonalInfoSectionProps {
	fullName: string;
	email: string;
	phone: string;
	location: string;
	website: string;
	summary: string;
	updateField: (field: string, value: string) => void;
	generateAISuggestion: (type: "summary" | "description") => string;
}

export const PersonalInfoSection = React.memo<PersonalInfoSectionProps>(
	({ fullName, email, phone, location, website, summary, updateField, generateAISuggestion }) => (
		<div className="space-y-4">
			<Input
				label="Full Name *"
				value={fullName}
				onChange={(e) => updateField("fullName", e.target.value)}
				placeholder="John Doe"
			/>
			<Input
				label="Email *"
				type="email"
				value={email}
				onChange={(e) => updateField("email", e.target.value)}
				placeholder="john.doe@email.com"
			/>
			<Input
				label="Phone Number"
				type="tel"
				value={phone}
				onChange={(e) => updateField("phone", e.target.value)}
				placeholder="+1 234 567 890"
			/>
			<Input
				label="Location"
				value={location}
				onChange={(e) => updateField("location", e.target.value)}
				placeholder="New York, NY"
			/>
			<Input
				label="Website/Portfolio"
				type="url"
				value={website}
				onChange={(e) => updateField("website", e.target.value)}
				placeholder="https://johndoe.dev"
			/>
			<Textarea
				label="Professional Summary"
				value={summary}
				onChange={(e) => updateField("summary", e.target.value)}
				placeholder="A brief summary of your career..."
				rows={5}
				aiClick={() => updateField("summary", generateAISuggestion("summary"))}
			/>
		</div>
	)
);
PersonalInfoSection.displayName = "PersonalInfoSection";
