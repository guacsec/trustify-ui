import { useEffect } from "react";

import { useBranding } from "./useBranding";

export const useDocumentTitle = (pageTitle?: string): void => {
  const branding = useBranding();
  const baseTitle = branding.application.title;

  useEffect(() => {
    if (!baseTitle) {
      return;
    }

    if (!pageTitle) {
      document.title = baseTitle;
      return;
    }

    document.title = `${pageTitle} | ${baseTitle}`;
  }, [baseTitle, pageTitle]);
};

export default useDocumentTitle;
