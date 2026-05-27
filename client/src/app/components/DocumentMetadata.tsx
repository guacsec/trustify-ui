import getBranding from "@app/hooks/useBranding";

export const DocumentMetadata = ({ title }: { title?: string }) => {
  const branding = getBranding();
  const baseTitle = branding.application.title;
  const documentTitle = title ? `${title} | ${baseTitle}` : baseTitle;

  return <title>{documentTitle}</title>;
};
