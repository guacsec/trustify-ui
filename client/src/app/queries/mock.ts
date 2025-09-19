import type { SbomAdvisory } from "@app/client";

export const SBOM_MOCK: Array<SbomAdvisory> = [
  {
    uuid: "urn:uuid:16641287-e783-437f-ae44-fbb9added8ff",
    identifier: "https://www.redhat.com/#CVE-2023-20862",
    document_id: "CVE-2023-20862",
    issuer: {
      id: "c187f598-3c71-4977-b547-7e388a7c9db9",
      name: "Red Hat Product Security",
      cpe_key: null,
      website: null,
    },
    published: "2023-04-19T00:00:00Z",
    modified: "2023-11-14T22:09:12Z",
    withdrawn: null,
    title:
      "spring-security: Empty SecurityContext Is Not Properly Saved Upon Logout",
    labels: {
      type: "csaf",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2023-20862",
        title:
          "spring-security: Empty SecurityContext Is Not Properly Saved Upon Logout",
        description: null,
        reserved: null,
        published: "2023-04-19T00:00:00Z",
        modified: "2024-08-02T09:21:32.378Z",
        withdrawn: null,
        discovered: "2023-07-31T00:00:00Z",
        released: "2023-04-19T00:00:00Z",
        cwes: ["CWE-459"],
        average_severity: "medium",
        average_score: 6.3,
        status: "affected",
        context: {
          cpe: "cpe:/a:redhat:quarkus:2:*:*:*",
        },
        packages: [
          {
            id: "SPDXRef-a3be0ff6-a286-4a04-91f9-7812df6702e1",
            name: "quarkus-spring-security",
            group: null,
            version: "2.13.8.Final-redhat-00004",
            purl: [
              {
                uuid: "6a1d83c6-a770-5d88-9215-fdbf79bcc710",
                purl: "pkg:maven/io.quarkus/quarkus-spring-security@2.13.8.Final-redhat-00004?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "2b632501-d073-58f0-89a7-0654a3f4a1ba",
                  purl: "pkg:maven/io.quarkus/quarkus-spring-security",
                },
                version: {
                  uuid: "daa90c50-b765-590b-be8b-bd34bd7fdfda",
                  purl: "pkg:maven/io.quarkus/quarkus-spring-security@2.13.8.Final-redhat-00004",
                  version: "2.13.8.Final-redhat-00004",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:d4d249c3-333c-4b15-b1d3-ce6a74b3198b",
    identifier: "GHSA-9ph3-v2vh-3qx7",
    document_id: "GHSA-9ph3-v2vh-3qx7",
    issuer: null,
    published: "2024-04-02T09:30:42Z",
    modified: "2024-07-25T21:31:19Z",
    withdrawn: null,
    title: "Eclipse Vert.x vulnerable to a memory leak in TCP servers",
    labels: {
      type: "osv",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2024-1300",
        title: "Eclipse Vert.x vulnerable to a memory leak in TCP servers",
        description:
          "A vulnerability in the Eclipse Vert.x toolkit causes a memory leak in TCP servers configured with TLS and SNI support. When processing an unknown SNI server name assigned the default certificate instead of a mapped certificate, the SSL context is erroneously cached in the server name map, leading to memory exhaustion. This flaw allows attackers to send TLS client hello messages with fake server names, triggering a JVM out-of-memory error.",
        reserved: null,
        published: "2024-04-02T07:33:05.215Z",
        modified: "2025-03-03T16:41:15.639Z",
        withdrawn: null,
        discovered: null,
        released: null,
        cwes: [],
        average_severity: "medium",
        average_score: 5.4,
        status: "affected",
        context: null,
        packages: [
          {
            id: "SPDXRef-be82eb7e-1c7a-4526-9d88-8b5cc19ea137",
            name: "vertx-core",
            group: null,
            version: "4.3.4.redhat-00008",
            purl: [
              {
                uuid: "14c5c4d4-e5b4-5d8c-848e-f360b5affcad",
                purl: "pkg:maven/io.vertx/vertx-core@4.3.4.redhat-00008?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "228c4da2-cdbc-5430-8cb5-0cffb49ccf42",
                  purl: "pkg:maven/io.vertx/vertx-core",
                },
                version: {
                  uuid: "4c2be4ec-89e9-5dff-8d91-2da504ce2a06",
                  purl: "pkg:maven/io.vertx/vertx-core@4.3.4.redhat-00008",
                  version: "4.3.4.redhat-00008",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:7c9b7142-00ce-481a-b56f-6332b0752c25",
    identifier: "https://www.redhat.com/#CVE-2023-1664",
    document_id: "CVE-2023-1664",
    issuer: {
      id: "c187f598-3c71-4977-b547-7e388a7c9db9",
      name: "Red Hat Product Security",
      cpe_key: null,
      website: null,
    },
    published: "2023-03-27T00:00:00Z",
    modified: "2023-11-14T17:39:21Z",
    withdrawn: null,
    title: "keycloak: Untrusted Certificate Validation",
    labels: {
      type: "csaf",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2023-1664",
        title: "keycloak: Untrusted Certificate Validation",
        description: null,
        reserved: null,
        published: "2023-05-26T00:00:00Z",
        modified: "2024-08-02T05:57:24.969Z",
        withdrawn: null,
        discovered: "2023-03-27T00:00:00Z",
        released: "2023-03-27T00:00:00Z",
        cwes: ["CWE-295"],
        average_severity: "medium",
        average_score: 6.5,
        status: "affected",
        context: {
          cpe: "cpe:/a:redhat:quarkus:2:*:*:*",
        },
        packages: [
          {
            id: "SPDXRef-cb213b59-6979-4bd2-990d-8d1eed88e165",
            name: "keycloak-core",
            group: null,
            version: "18.0.6.redhat-00001",
            purl: [
              {
                uuid: "52697784-2369-5ac2-b53a-3a3afa2c464a",
                purl: "pkg:maven/org.keycloak/keycloak-core@18.0.6.redhat-00001?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "62a9d42e-ae59-51d3-835f-2e898069eb53",
                  purl: "pkg:maven/org.keycloak/keycloak-core",
                },
                version: {
                  uuid: "10c74b04-fcc3-5c4c-b778-a746fd45d629",
                  purl: "pkg:maven/org.keycloak/keycloak-core@18.0.6.redhat-00001",
                  version: "18.0.6.redhat-00001",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:544db4b9-c4f6-43ca-afd5-00c12e3b6882",
    identifier: "https://www.redhat.com/#CVE-2023-2976",
    document_id: "CVE-2023-2976",
    issuer: {
      id: "c187f598-3c71-4977-b547-7e388a7c9db9",
      name: "Red Hat Product Security",
      cpe_key: null,
      website: null,
    },
    published: "2023-06-14T00:00:00Z",
    modified: "2023-11-14T21:31:33Z",
    withdrawn: null,
    title: "guava: insecure temporary directory creation",
    labels: {
      type: "csaf",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2023-2976",
        title: "guava: insecure temporary directory creation",
        description: null,
        reserved: null,
        published: "2023-06-14T17:36:40.64Z",
        modified: "2024-08-02T06:41:03.778Z",
        withdrawn: null,
        discovered: "2023-06-15T00:00:00Z",
        released: "2023-06-14T00:00:00Z",
        cwes: ["CWE-552"],
        average_severity: "medium",
        average_score: 4.95,
        status: "affected",
        context: {
          cpe: "cpe:/a:redhat:quarkus:2:*:*:*",
        },
        packages: [
          {
            id: "SPDXRef-2162d8be-0f8c-42ce-8ded-0003566fc076",
            name: "guava",
            group: null,
            version: "31.1.0.jre-redhat-00004",
            purl: [
              {
                uuid: "bfb052a5-011e-533a-bd18-806445f6d9d9",
                purl: "pkg:maven/com.google.guava/guava@31.1.0.jre-redhat-00004?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "6c75680f-b140-59c3-9b52-397243d2b489",
                  purl: "pkg:maven/com.google.guava/guava",
                },
                version: {
                  uuid: "7ede0c6f-105b-5966-a852-502c45f19844",
                  purl: "pkg:maven/com.google.guava/guava@31.1.0.jre-redhat-00004",
                  version: "31.1.0.jre-redhat-00004",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:b496af43-81f4-411c-a195-874a0c4a0a9d",
    identifier: "https://www.redhat.com/#CVE-2023-33201",
    document_id: "CVE-2023-33201",
    issuer: {
      id: "c187f598-3c71-4977-b547-7e388a7c9db9",
      name: "Red Hat Product Security",
      cpe_key: null,
      website: null,
    },
    published: "2023-06-16T00:00:00Z",
    modified: "2023-11-14T21:51:12Z",
    withdrawn: null,
    title:
      "bouncycastle: potential  blind LDAP injection attack using a self-signed certificate",
    labels: {
      type: "csaf",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2023-33201",
        title:
          "bouncycastle: potential  blind LDAP injection attack using a self-signed certificate",
        description: null,
        reserved: null,
        published: "2023-07-05T00:00:00Z",
        modified: "2024-08-02T15:39:35.708Z",
        withdrawn: null,
        discovered: "2023-06-16T00:00:00Z",
        released: "2023-06-16T00:00:00Z",
        cwes: ["CWE-200"],
        average_severity: "medium",
        average_score: 5.3,
        status: "affected",
        context: {
          cpe: "cpe:/a:redhat:quarkus:2:*:*:*",
        },
        packages: [
          {
            id: "SPDXRef-a71fb1aa-3541-4406-8b45-1f9f1ed37e84",
            name: "bcprov-jdk15on",
            group: null,
            version: "1.70",
            purl: [
              {
                uuid: "46ca2115-c0c2-54ff-b528-7ff675dacd06",
                purl: "pkg:maven/org.bouncycastle/bcprov-jdk15on@1.70?type=jar",
                base: {
                  uuid: "7642fc54-068f-51d8-8a95-345b6b889e51",
                  purl: "pkg:maven/org.bouncycastle/bcprov-jdk15on",
                },
                version: {
                  uuid: "8e026edb-4e41-5a6a-84a1-539ff4eac077",
                  purl: "pkg:maven/org.bouncycastle/bcprov-jdk15on@1.70",
                  version: "1.70",
                },
                qualifiers: {
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:7b587acc-04fb-4b40-804b-1016825326bb",
    identifier: "GHSA-57m8-f3v5-hm5m",
    document_id: "GHSA-57m8-f3v5-hm5m",
    issuer: null,
    published: "2023-10-04T12:30:14Z",
    modified: "2023-11-01T17:54:21Z",
    withdrawn: "2023-11-01T17:54:21Z",
    title:
      "Withdrawn Advisory: Netty-handler does not validate host names by default",
    labels: {
      type: "osv",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2023-4586",
        title:
          "Withdrawn Advisory: Netty-handler does not validate host names by default",
        description:
          "## Withdrawn Advisory\nThis advisory has been withdrawn because the underlying vulnerability only concerns Red Hat's Hot Rod client, which is not in one of the GitHub Advisory Database's [supported ecosystems](https://github.com/github/advisory-database/blob/main/README.md#supported-ecosystems). This link is maintained to preserve external references.\n\n## Original Description\nNetty-handler has been found to no validate hostnames when using TLS in its default configuration. As a result netty-handler is vulnerable to man-in-the-middle attacks. Users would need to set the protocol to \"HTTPS\" in the SSLParameters of the SSLEngine to opt in to host name validation. A change in default behavior is expected in the `5.x` release branch with no backport planned.\n\nIn the interim users are advised to enable host name validation in their configurations.\nSee https://github.com/netty/netty/issues/8537 for details on the forthcoming change in default behavior.",
        reserved: null,
        published: null,
        modified: null,
        withdrawn: null,
        discovered: null,
        released: null,
        cwes: [],
        average_severity: "medium",
        average_score: 5.3,
        status: "affected",
        context: null,
        packages: [
          {
            id: "SPDXRef-430d898a-9b8b-456c-9151-e2b4e0783056",
            name: "netty-handler",
            group: null,
            version: "4.1.86.Final-redhat-00002",
            purl: [
              {
                uuid: "48f562d1-fdfd-59b7-bd23-861503f31e5d",
                purl: "pkg:maven/io.netty/netty-handler@4.1.86.Final-redhat-00002?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "d3f4c0dd-ef9c-54fe-b6dd-b37380718a57",
                  purl: "pkg:maven/io.netty/netty-handler",
                },
                version: {
                  uuid: "a6382423-1382-51d7-bcd6-cfb2eab7d764",
                  purl: "pkg:maven/io.netty/netty-handler@4.1.86.Final-redhat-00002",
                  version: "4.1.86.Final-redhat-00002",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:e1cc1eb0-671c-43ea-ac2e-8e2456421315",
    identifier: "https://www.redhat.com/#CVE-2023-4853",
    document_id: "CVE-2023-4853",
    issuer: {
      id: "c187f598-3c71-4977-b547-7e388a7c9db9",
      name: "Red Hat Product Security",
      cpe_key: null,
      website: null,
    },
    published: "2023-09-08T00:00:00Z",
    modified: "2023-11-10T12:57:35Z",
    withdrawn: null,
    title: "quarkus: HTTP security policy bypass",
    labels: {
      type: "csaf",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2023-4853",
        title: "quarkus: HTTP security policy bypass",
        description: null,
        reserved: null,
        published: "2023-09-20T09:47:32.15Z",
        modified: "2024-08-20T15:26:14.044Z",
        withdrawn: null,
        discovered: "2023-09-08T00:00:00Z",
        released: "2023-09-08T00:00:00Z",
        cwes: ["CWE-148"],
        average_severity: "high",
        average_score: 8.1,
        status: "affected",
        context: {
          cpe: "cpe:/a:redhat:quarkus:2.13:*:el8:*",
        },
        packages: [
          {
            id: "SPDXRef-86d9d71d-1c84-4148-a1ce-ea15349aba4d",
            name: "quarkus-vertx-http",
            group: null,
            version: "2.13.8.Final-redhat-00004",
            purl: [
              {
                uuid: "528a575d-5ed9-5aaa-9882-14701d64b51e",
                purl: "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00004?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "e883632e-4401-5912-a5c7-de4c7af2ae01",
                  purl: "pkg:maven/io.quarkus/quarkus-vertx-http",
                },
                version: {
                  uuid: "c040304d-22b4-5d85-9b32-55ae9bfffa52",
                  purl: "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00004",
                  version: "2.13.8.Final-redhat-00004",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
          {
            id: "SPDXRef-466c1ab1-7bf1-4a11-b7c8-0d03cb34d1c5",
            name: "quarkus-undertow",
            group: null,
            version: "2.13.8.Final-redhat-00004",
            purl: [
              {
                uuid: "4a538551-22ec-5fa5-b898-a991f552c2ee",
                purl: "pkg:maven/io.quarkus/quarkus-undertow@2.13.8.Final-redhat-00004?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "22c33f8e-bd68-5cee-af99-cc09b1d811d9",
                  purl: "pkg:maven/io.quarkus/quarkus-undertow",
                },
                version: {
                  uuid: "722a7259-2cf9-5f77-947a-42ae541244ab",
                  purl: "pkg:maven/io.quarkus/quarkus-undertow@2.13.8.Final-redhat-00004",
                  version: "2.13.8.Final-redhat-00004",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
          {
            id: "SPDXRef-9d10c8fa-d8b6-4e41-85ef-e5f90624f1e1",
            name: "quarkus-keycloak-authorization",
            group: null,
            version: "2.13.8.Final-redhat-00004",
            purl: [
              {
                uuid: "ed321301-2d42-5939-aa96-70930a231979",
                purl: "pkg:maven/io.quarkus/quarkus-keycloak-authorization@2.13.8.Final-redhat-00004?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "4be678d1-5f0d-5d97-88b4-968f4f4bb532",
                  purl: "pkg:maven/io.quarkus/quarkus-keycloak-authorization",
                },
                version: {
                  uuid: "e8c56f6c-62b3-5d14-a5f0-b2c921be6bdb",
                  purl: "pkg:maven/io.quarkus/quarkus-keycloak-authorization@2.13.8.Final-redhat-00004",
                  version: "2.13.8.Final-redhat-00004",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:c3ae6fb8-79b4-47ab-aac8-3da9835642bd",
    identifier: "https://www.redhat.com/#CVE-2023-44487",
    document_id: "CVE-2023-44487",
    issuer: {
      id: "c187f598-3c71-4977-b547-7e388a7c9db9",
      name: "Red Hat Product Security",
      cpe_key: null,
      website: null,
    },
    published: "2023-10-10T00:00:00Z",
    modified: "2023-11-21T11:59:10Z",
    withdrawn: null,
    title:
      "HTTP/2: Multiple HTTP/2 enabled web servers are vulnerable to a DDoS attack (Rapid Reset Attack)",
    labels: {
      type: "csaf",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2023-44487",
        title:
          "HTTP/2: Multiple HTTP/2 enabled web servers are vulnerable to a DDoS attack (Rapid Reset Attack)",
        description: null,
        reserved: null,
        published: "2023-10-10T00:00:00Z",
        modified: "2024-08-19T07:48:04.546Z",
        withdrawn: null,
        discovered: "2023-10-09T00:00:00Z",
        released: "2023-10-10T00:00:00Z",
        cwes: ["CWE-400"],
        average_severity: "high",
        average_score: 7.5,
        status: "affected",
        context: {
          cpe: "cpe:/a:redhat:quarkus:2.13:*:el8:*",
        },
        packages: [
          {
            id: "SPDXRef-21db41a7-5d44-46b7-87fc-95f3417a784a",
            name: "netty-codec-http2",
            group: null,
            version: "4.1.86.Final-redhat-00002",
            purl: [
              {
                uuid: "b5d0e298-efc7-55b5-a7dd-b78996689fb7",
                purl: "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00002?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "ef580dbe-9fdf-522f-93a7-aef4219fb71a",
                  purl: "pkg:maven/io.netty/netty-codec-http2",
                },
                version: {
                  uuid: "9accb509-993f-5f93-a36c-cf507582f098",
                  purl: "pkg:maven/io.netty/netty-codec-http2@4.1.86.Final-redhat-00002",
                  version: "4.1.86.Final-redhat-00002",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:266e85e3-39cd-437e-97fb-096512e0d70c",
    identifier: "https://www.redhat.com/#CVE-2023-34454",
    document_id: "CVE-2023-34454",
    issuer: {
      id: "c187f598-3c71-4977-b547-7e388a7c9db9",
      name: "Red Hat Product Security",
      cpe_key: null,
      website: null,
    },
    published: "2023-06-15T00:00:00Z",
    modified: "2023-11-14T21:46:49Z",
    withdrawn: null,
    title: "snappy-java: Integer overflow in compress leads to DoS",
    labels: {
      type: "csaf",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2023-34454",
        title: "snappy-java: Integer overflow in compress leads to DoS",
        description: null,
        reserved: null,
        published: "2023-06-15T16:27:45.467Z",
        modified: "2024-08-02T16:10:07.3Z",
        withdrawn: null,
        discovered: "2023-06-15T00:00:00Z",
        released: "2023-06-15T00:00:00Z",
        cwes: ["CWE-190"],
        average_severity: "medium",
        average_score: 5.9,
        status: "affected",
        context: {
          cpe: "cpe:/a:redhat:quarkus:2:*:*:*",
        },
        packages: [
          {
            id: "SPDXRef-56a5a9f5-326a-499f-85de-50f5e2a9de25",
            name: "snappy-java",
            group: null,
            version: "1.1.8.4-redhat-00003",
            purl: [
              {
                uuid: "52790975-79ce-5ad4-babc-2ad798f2d34f",
                purl: "pkg:maven/org.xerial.snappy/snappy-java@1.1.8.4-redhat-00003?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "ea6b0587-4f6f-5b25-861b-32b62f7d3751",
                  purl: "pkg:maven/org.xerial.snappy/snappy-java",
                },
                version: {
                  uuid: "368c08c8-54b3-5b6e-8a0c-7e5ca22eb6fb",
                  purl: "pkg:maven/org.xerial.snappy/snappy-java@1.1.8.4-redhat-00003",
                  version: "1.1.8.4-redhat-00003",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:e7d1ef7d-1732-490c-8f90-5d98fce8051a",
    identifier: "GHSA-mv64-86g8-cqq7",
    document_id: "GHSA-mv64-86g8-cqq7",
    issuer: null,
    published: "2024-04-25T18:30:39Z",
    modified: "2024-04-25T23:34:44Z",
    withdrawn: null,
    title:
      "Quarkus: security checks in resteasy reactive may trigger a denial of service",
    labels: {
      type: "osv",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2024-1726",
        title:
          "Quarkus: security checks in resteasy reactive may trigger a denial of service",
        description:
          "A flaw was discovered in the RESTEasy Reactive implementation in Quarkus. Due to security checks for some JAX-RS endpoints being performed after serialization, more processing resources are consumed while the HTTP request is checked. In certain configurations, if an attacker has knowledge of any POST, PUT, or PATCH request paths, they can potentially identify vulnerable endpoints and trigger excessive resource usage as the endpoints process the requests. This can result in a denial of service.",
        reserved: null,
        published: "2024-04-25T16:29:04.615Z",
        modified: "2025-03-15T04:10:46.621Z",
        withdrawn: null,
        discovered: null,
        released: null,
        cwes: [],
        average_severity: "medium",
        average_score: 5.3,
        status: "affected",
        context: null,
        packages: [
          {
            id: "SPDXRef-7fc7c15b-8c3c-4573-8287-23bfde8997a6",
            name: "resteasy-reactive",
            group: null,
            version: "2.13.8.Final-redhat-00004",
            purl: [
              {
                uuid: "dccda6ae-0f2f-5a0a-ab47-6c03ef2d7b74",
                purl: "pkg:maven/io.quarkus.resteasy.reactive/resteasy-reactive@2.13.8.Final-redhat-00004?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "89c6538e-8f5c-5dc4-8bed-e6ed0fc7d21b",
                  purl: "pkg:maven/io.quarkus.resteasy.reactive/resteasy-reactive",
                },
                version: {
                  uuid: "fab2ee4f-2315-5ad0-bf0a-037f4545a2b6",
                  purl: "pkg:maven/io.quarkus.resteasy.reactive/resteasy-reactive@2.13.8.Final-redhat-00004",
                  version: "2.13.8.Final-redhat-00004",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:35bc6f4b-7d70-4c04-b00c-2a008003604d",
    identifier: "https://www.redhat.com/#CVE-2023-34455",
    document_id: "CVE-2023-34455",
    issuer: {
      id: "c187f598-3c71-4977-b547-7e388a7c9db9",
      name: "Red Hat Product Security",
      cpe_key: null,
      website: null,
    },
    published: "2023-06-16T00:00:00Z",
    modified: "2023-11-14T21:49:01Z",
    withdrawn: null,
    title: "snappy-java: Unchecked chunk length leads to DoS",
    labels: {
      type: "csaf",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2023-34455",
        title: "snappy-java: Unchecked chunk length leads to DoS",
        description: null,
        reserved: null,
        published: "2023-06-15T17:15:00.311Z",
        modified: "2024-08-02T16:10:07.032Z",
        withdrawn: null,
        discovered: "2023-06-16T00:00:00Z",
        released: "2023-06-16T00:00:00Z",
        cwes: ["CWE-1285"],
        average_severity: "medium",
        average_score: 6.7,
        status: "affected",
        context: {
          cpe: "cpe:/a:redhat:quarkus:2:*:*:*",
        },
        packages: [
          {
            id: "SPDXRef-56a5a9f5-326a-499f-85de-50f5e2a9de25",
            name: "snappy-java",
            group: null,
            version: "1.1.8.4-redhat-00003",
            purl: [
              {
                uuid: "52790975-79ce-5ad4-babc-2ad798f2d34f",
                purl: "pkg:maven/org.xerial.snappy/snappy-java@1.1.8.4-redhat-00003?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "ea6b0587-4f6f-5b25-861b-32b62f7d3751",
                  purl: "pkg:maven/org.xerial.snappy/snappy-java",
                },
                version: {
                  uuid: "368c08c8-54b3-5b6e-8a0c-7e5ca22eb6fb",
                  purl: "pkg:maven/org.xerial.snappy/snappy-java@1.1.8.4-redhat-00003",
                  version: "1.1.8.4-redhat-00003",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:6ad6d65e-1322-4911-97fa-bdddd26ef930",
    identifier: "https://www.redhat.com/#CVE-2023-34453",
    document_id: "CVE-2023-34453",
    issuer: {
      id: "c187f598-3c71-4977-b547-7e388a7c9db9",
      name: "Red Hat Product Security",
      cpe_key: null,
      website: null,
    },
    published: "2023-06-15T00:00:00Z",
    modified: "2023-11-14T21:37:42Z",
    withdrawn: null,
    title: "snappy-java: Integer overflow in shuffle leads to DoS",
    labels: {
      type: "csaf",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2023-34453",
        title: "snappy-java: Integer overflow in shuffle leads to DoS",
        description: null,
        reserved: null,
        published: "2023-06-15T16:12:34.119Z",
        modified: "2024-08-02T16:10:07.005Z",
        withdrawn: null,
        discovered: "2023-06-15T00:00:00Z",
        released: "2023-06-15T00:00:00Z",
        cwes: ["CWE-190"],
        average_severity: "medium",
        average_score: 5.9,
        status: "affected",
        context: {
          cpe: "cpe:/a:redhat:quarkus:2:*:*:*",
        },
        packages: [
          {
            id: "SPDXRef-56a5a9f5-326a-499f-85de-50f5e2a9de25",
            name: "snappy-java",
            group: null,
            version: "1.1.8.4-redhat-00003",
            purl: [
              {
                uuid: "52790975-79ce-5ad4-babc-2ad798f2d34f",
                purl: "pkg:maven/org.xerial.snappy/snappy-java@1.1.8.4-redhat-00003?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "ea6b0587-4f6f-5b25-861b-32b62f7d3751",
                  purl: "pkg:maven/org.xerial.snappy/snappy-java",
                },
                version: {
                  uuid: "368c08c8-54b3-5b6e-8a0c-7e5ca22eb6fb",
                  purl: "pkg:maven/org.xerial.snappy/snappy-java@1.1.8.4-redhat-00003",
                  version: "1.1.8.4-redhat-00003",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:75ee725d-38f5-483b-a4f7-f646f1239c60",
    identifier: "GHSA-5jpm-x58v-624v",
    document_id: "GHSA-5jpm-x58v-624v",
    issuer: null,
    published: "2024-03-25T19:40:50Z",
    modified: "2024-06-22T00:30:55Z",
    withdrawn: null,
    title: "Netty's HttpPostRequestDecoder can OOM",
    labels: {
      type: "osv",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2024-29025",
        title: "Netty's HttpPostRequestDecoder can OOM",
        description:
          "### Summary\nThe `HttpPostRequestDecoder` can be tricked to accumulate data. I have spotted currently two attack vectors \n\n### Details\n1. While the decoder can store items on the disk if configured so, there are no limits to the number of fields the form can have, an attacher can send a chunked post consisting of many small fields that will be accumulated in the `bodyListHttpData` list.\n2. The decoder cumulates bytes in the `undecodedChunk` buffer until it can decode a field, this field can cumulate data without limits\n\n### PoC\n\nHere is a Netty branch that provides a fix + tests : https://github.com/vietj/netty/tree/post-request-decoder\n\n\nHere is a reproducer with Vert.x (which uses this decoder) https://gist.github.com/vietj/f558b8ea81ec6505f1e9a6ca283c9ae3\n\n### Impact\nAny Netty based HTTP server that uses the `HttpPostRequestDecoder` to decode a form.",
        reserved: null,
        published: null,
        modified: null,
        withdrawn: null,
        discovered: null,
        released: null,
        cwes: [],
        average_severity: "medium",
        average_score: 5.3,
        status: "affected",
        context: null,
        packages: [
          {
            id: "SPDXRef-9af60960-e683-45e0-8b17-a51483f95706",
            name: "netty-codec-http",
            group: null,
            version: "4.1.86.Final-redhat-00002",
            purl: [
              {
                uuid: "82ba94c0-71df-584b-86e7-2139624ad86a",
                purl: "pkg:maven/io.netty/netty-codec-http@4.1.86.Final-redhat-00002?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "045c6e1d-aa20-5e7c-94f1-21b64e3eca51",
                  purl: "pkg:maven/io.netty/netty-codec-http",
                },
                version: {
                  uuid: "d54f383c-04df-52c4-bae2-7e9c3cdf9a02",
                  purl: "pkg:maven/io.netty/netty-codec-http@4.1.86.Final-redhat-00002",
                  version: "4.1.86.Final-redhat-00002",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:6819701f-a0dd-4797-af0c-51ecd0e4a976",
    identifier: "https://www.redhat.com/#CVE-2023-24815",
    document_id: "CVE-2023-24815",
    issuer: {
      id: "c187f598-3c71-4977-b547-7e388a7c9db9",
      name: "Red Hat Product Security",
      cpe_key: null,
      website: null,
    },
    published: "2023-02-09T00:00:00Z",
    modified: "2023-11-14T21:13:41Z",
    withdrawn: null,
    title:
      "vertx-web: StaticHandler disclosure of classpath resources on Windows when mounted on a wildcard route",
    labels: {
      type: "csaf",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2023-24815",
        title:
          "vertx-web: StaticHandler disclosure of classpath resources on Windows when mounted on a wildcard route",
        description: null,
        reserved: null,
        published: "2023-02-09T17:36:32.589Z",
        modified: "2024-08-02T11:03:19.277Z",
        withdrawn: null,
        discovered: "2023-05-23T00:00:00Z",
        released: "2023-02-09T00:00:00Z",
        cwes: ["CWE-22"],
        average_severity: "medium",
        average_score: 5.05,
        status: "affected",
        context: {
          cpe: "cpe:/a:redhat:quarkus:2:*:*:*",
        },
        packages: [
          {
            id: "SPDXRef-309f41cb-a09f-4575-a0a4-f40ca7d3fb29",
            name: "vertx-web",
            group: null,
            version: "4.3.4.redhat-00008",
            purl: [
              {
                uuid: "3a5c8e1e-17c4-5715-b74c-f8b61c4d7d8c",
                purl: "pkg:maven/io.vertx/vertx-web@4.3.4.redhat-00008?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "d3ff19de-94b7-54bb-830f-3f2dafeaf22c",
                  purl: "pkg:maven/io.vertx/vertx-web",
                },
                version: {
                  uuid: "65c44891-ea76-5c44-aeca-401c36d216a8",
                  purl: "pkg:maven/io.vertx/vertx-web@4.3.4.redhat-00008",
                  version: "4.3.4.redhat-00008",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
  {
    uuid: "urn:uuid:77ced22b-7910-4170-b8d1-8d8afe507776",
    identifier: "https://www.redhat.com/#CVE-2023-0044",
    document_id: "CVE-2023-0044",
    issuer: {
      id: "c187f598-3c71-4977-b547-7e388a7c9db9",
      name: "Red Hat Product Security",
      cpe_key: null,
      website: null,
    },
    published: "2023-01-04T00:00:00Z",
    modified: "2023-11-13T11:31:31Z",
    withdrawn: null,
    title:
      "quarkus-vertx-http: a cross-site attack may be initiated which might lead to the Information Disclosure",
    labels: {
      type: "csaf",
    },
    status: [
      {
        normative: false,
        identifier: "CVE-2023-0044",
        title:
          "quarkus-vertx-http: a cross-site attack may be initiated which might lead to the Information Disclosure",
        description: null,
        reserved: null,
        published: "2023-02-23T00:00:00Z",
        modified: "2024-08-02T04:54:32.575Z",
        withdrawn: null,
        discovered: "2023-01-04T00:00:00Z",
        released: "2023-01-04T00:00:00Z",
        cwes: [],
        average_severity: "medium",
        average_score: 5.3,
        status: "affected",
        context: {
          cpe: "cpe:/a:redhat:quarkus:2:*:*:*",
        },
        packages: [
          {
            id: "SPDXRef-86d9d71d-1c84-4148-a1ce-ea15349aba4d",
            name: "quarkus-vertx-http",
            group: null,
            version: "2.13.8.Final-redhat-00004",
            purl: [
              {
                uuid: "528a575d-5ed9-5aaa-9882-14701d64b51e",
                purl: "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00004?repository_url=https://maven.repository.redhat.com/ga/&type=jar",
                base: {
                  uuid: "e883632e-4401-5912-a5c7-de4c7af2ae01",
                  purl: "pkg:maven/io.quarkus/quarkus-vertx-http",
                },
                version: {
                  uuid: "c040304d-22b4-5d85-9b32-55ae9bfffa52",
                  purl: "pkg:maven/io.quarkus/quarkus-vertx-http@2.13.8.Final-redhat-00004",
                  version: "2.13.8.Final-redhat-00004",
                },
                qualifiers: {
                  repository_url: "https://maven.repository.redhat.com/ga/",
                  type: "jar",
                },
              },
            ],
            cpe: [],
            licenses: [],
            licenses_ref_mapping: [],
          },
        ],
      },
    ],
  },
];
