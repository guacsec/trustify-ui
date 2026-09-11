import type { Plugin } from "vite";

const summary = {
  pqcAlgorithms: 4,
  classicalAlgorithms: 12,
  totalAlgorithms: 16,
  pqcSboms: 7,
  totalSboms: 25,
};

const algorithms = [
  {
    id: "1",
    name: "ML-KEM-768",
    type: "KEM",
    standard: "FIPS 203",
    pqcReady: true,
  },
  {
    id: "2",
    name: "ML-DSA-65",
    type: "Signature",
    standard: "FIPS 204",
    pqcReady: true,
  },
  {
    id: "3",
    name: "SLH-DSA-SHA2-128s",
    type: "Signature",
    standard: "FIPS 205",
    pqcReady: true,
  },
  {
    id: "4",
    name: "ML-KEM-1024",
    type: "KEM",
    standard: "FIPS 203",
    pqcReady: true,
  },
  {
    id: "5",
    name: "RSA-2048",
    type: "Encryption",
    standard: "PKCS#1",
    pqcReady: false,
  },
  {
    id: "6",
    name: "RSA-4096",
    type: "Encryption",
    standard: "PKCS#1",
    pqcReady: false,
  },
  {
    id: "7",
    name: "ECDSA-P256",
    type: "Signature",
    standard: "FIPS 186-4",
    pqcReady: false,
  },
  {
    id: "8",
    name: "ECDSA-P384",
    type: "Signature",
    standard: "FIPS 186-4",
    pqcReady: false,
  },
  {
    id: "9",
    name: "Ed25519",
    type: "Signature",
    standard: "RFC 8032",
    pqcReady: false,
  },
  {
    id: "10",
    name: "X25519",
    type: "KEM",
    standard: "RFC 7748",
    pqcReady: false,
  },
  {
    id: "11",
    name: "AES-128-GCM",
    type: "Symmetric",
    standard: "NIST SP 800-38D",
    pqcReady: false,
  },
  {
    id: "12",
    name: "AES-256-GCM",
    type: "Symmetric",
    standard: "NIST SP 800-38D",
    pqcReady: false,
  },
  {
    id: "13",
    name: "ChaCha20-Poly1305",
    type: "AEAD",
    standard: "RFC 8439",
    pqcReady: false,
  },
  {
    id: "14",
    name: "SHA-256",
    type: "Hash",
    standard: "FIPS 180-4",
    pqcReady: false,
  },
  {
    id: "15",
    name: "SHA-384",
    type: "Hash",
    standard: "FIPS 180-4",
    pqcReady: false,
  },
  {
    id: "16",
    name: "SHA-512",
    type: "Hash",
    standard: "FIPS 180-4",
    pqcReady: false,
  },
];

export function mockCryptoPlugin(): Plugin {
  return {
    name: "mock-crypto-api",
    configureServer(server) {
      server.middlewares.use("/api/v3/crypto/summary", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(summary));
      });

      server.middlewares.use("/api/v3/crypto/algorithm", (_req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.end(
          JSON.stringify({ items: algorithms, total: algorithms.length }),
        );
      });
    },
  };
}
