import type { UIMatch } from "react-router-dom";
import { useMatches } from "react-router-dom";

import { useDocumentTitle } from "./useDocumentTitle";

type TitleHandle =
  | {
      title?: string | ((match: UIMatch) => string);
    }
  | undefined;

type MatchWithTitleHandle = UIMatch & {
  handle?: TitleHandle;
};

export const useRouteDocumentTitle = (): void => {
  const matches = useMatches() as MatchWithTitleHandle[];

  const matchWithTitle = [...matches]
    .reverse()
    .find((match) => match.handle && match.handle.title);

  const rawTitle = matchWithTitle?.handle?.title;

  const pageTitle =
    typeof rawTitle === "function"
      ? rawTitle(matchWithTitle as UIMatch)
      : rawTitle;

  useDocumentTitle(pageTitle);
};

export default useRouteDocumentTitle;
