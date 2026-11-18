import type React from "react";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams, setSearchParams] = useSearchParams();

  if (cryptoAlgorithms.length === 0) {
    return null;
  }

  const remove = (name?: string) => {
    const remaining = name
      ? searchParams.getAll(CRYPTO_PARAM).filter((value) => value !== name)
      : [];
    const next = new URLSearchParams(searchParams);
    next.delete(CRYPTO_PARAM);
    for (const value of remaining) {
      next.append(CRYPTO_PARAM, value);
    }
    setSearchParams(next, { replace: true });
  };

  return (
    <div className="pf-v6-u-mb-md">
      <LabelGroup
        categoryName="Crypto"
        isClosable
        onClick={() => remove()}
        data-testid="crypto-filter-labels"
      >
        {cryptoAlgorithms.map((name) => (
          <Label
            key={name}
            variant="outline"
            onClose={() => remove(name)}
            closeBtnAriaLabel={`Remove crypto filter ${name}`}
          >
            {name}
          </Label>
        ))}
      </LabelGroup>
    </div>
  );
};
