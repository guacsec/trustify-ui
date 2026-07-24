import type { RecommendEntry } from "@app/client";
import {
	formatRemediationCategory,
	remediationCategoryColor,
} from "@app/utils/remediation-utils";
import { purlBaseEquals } from "@app/utils/utils";
import { formatVexStatus, vexStatusColor } from "@app/utils/vex-utils";
import { Label, LabelGroup, List, ListItem } from "@patternfly/react-core";
import spacing from "@patternfly/react-styles/css/utilities/Spacing/spacing";
import type React from "react";

interface RecommendationsExpandedContentProps {
	recommendations: RecommendEntry[];
	currentPurl?: string;
}

export const RecommendationsExpandedContent: React.FC<
	RecommendationsExpandedContentProps
> = ({ recommendations, currentPurl }) => {
	return (
		<List isPlain>
			{recommendations.map((rec) => (
				<ListItem key={rec.package}>
					<strong>{rec.package}</strong>
					{currentPurl && purlBaseEquals(rec.package, currentPurl) && (
						<Label color="blue" isCompact className={spacing.mlSm}>
							Applied
						</Label>
					)}
					{rec.vulnerabilities.length > 0 && (
						<List isPlain className={spacing.mlMd}>
							{rec.vulnerabilities.map((v) => (
								<ListItem key={v.id}>
									<LabelGroup>
										<Label color={vexStatusColor(v.status)}>
											{v.id}: {formatVexStatus(v.status)}
										</Label>
										{v.remediations.map((r) => (
											<Label
												key={`${r.category}-${r.details ?? ""}`}
												color={remediationCategoryColor(r.category)}
												isCompact
												{...(r.url ? { href: r.url } : {})}
											>
												{formatRemediationCategory(r.category)}
												{r.details ? `: ${r.details}` : ""}
											</Label>
										))}
									</LabelGroup>
								</ListItem>
							))}
						</List>
					)}
				</ListItem>
			))}
		</List>
	);
};
