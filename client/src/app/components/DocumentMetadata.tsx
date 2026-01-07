import useBranding from "@app/hooks/useBranding";

export const DocumentMetadata = ({ title }: { title?: string }) => {
  const branding = useBranding();
  const baseTitle = branding.application.title;
  const documentTitle = title ? `${title} | ${baseTitle}` : baseTitle;

  return <title>{documentTitle}</title>;
};
