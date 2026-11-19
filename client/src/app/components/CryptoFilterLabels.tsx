import type React from "react";
import { useNavigate } from "react-router-dom";

import { Label, LabelGroup } from "@patternfly/react-core";

const CRYPTO_PARAM = "crypto";

interface CryptoFilterLabelsProps {
  /** Crypto asset names currently applied through the `crypto` URL parameter. */
  cryptoAlgorithms: string[];
}

/**
 * Shows the crypto filter coming from the `crypto` URL parameter, e.g. when
 * following a link from the Cryptography page, and lets the user remove it.
 */
export const CryptoFilterLabels: React.FC<CryptoFilterLabelsProps> = ({
  cryptoAlgorithms,
}) => {
  const navigate = useNavigate();

  if (cryptoAlgorithms.length === 0) {
    return null;
  }

  // `index === undefined` clears every crypto value; otherwise only the value at that position
  // is removed, so that closing one label does not drop identical repeated values, nor
  // empty ones coming from `?crypto=`.
  const remove = (index?: number) => {
    // Build the new query string from the live URL, not from a render snapshot, so that
    // concurrent updates of other params (e.g. table filters) are retained.
    const next = new URLSearchParams(document.location.search);
    const remaining =
      index !== undefined
        ? next.getAll(CRYPTO_PARAM).filter((_, i) => i !== index)
        : [];
    next.delete(CRYPTO_PARAM);
    for (const value of remaining) {
      next.append(CRYPTO_PARAM, value);
    }
    navigate({ search: next.toString() }, { replace: true });
  };

  return (
    <div className="pf-v6-u-mb-md">
      <LabelGroup
        categoryName="Crypto"
        isClosable
        onClick={() => remove()}
        data-testid="crypto-filter-labels"
      >
        {cryptoAlgorithms.map((name, index) => (
          <Label
            key={`${name}-${index}`}
            variant="outline"
            onClose={() => remove(index)}
            closeBtnAriaLabel={`Remove crypto filter ${name}`}
          >
            {name}
          </Label>
        ))}
      </LabelGroup>
    </div>
  );
};
