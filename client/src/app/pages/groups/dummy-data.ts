// TODO: Delete this once there's actual data
import type { TGroupDD } from "@app/queries/groups";
export const dummyData: {
  total: number;
  items: TGroupDD[];
} = {
  total: 30,
  items: [
    {
      id: "uuid-1",
      parent: null,
      name: "root-group",
      labels: {
        Product: null,
        owner: "platform",
      },
    },
    {
      id: "uuid-2",
      parent: "uuid-1",
      name: "frontend",
      labels: {
        team: "web",
        environment: "production",
      },
    },
    {
      id: "uuid-3",
      parent: "uuid-1",
      name: "backend",
      labels: {
        team: "api",
        environment: "production",
      },
    },
    {
      id: "uuid-4",
      parent: "uuid-1",
      name: "infra",
      labels: {
        team: "platform",
        priority: "high",
      },
    },
    {
      id: "uuid-5",
      parent: "uuid-2",
      name: "frontend-auth",
      labels: {
        source: "sbom",
        environment: "staging",
      },
    },
    {
      id: "uuid-6",
      parent: "uuid-2",
      name: "frontend-ui",
      labels: {
        source: "manual",
        priority: "medium",
      },
    },
    {
      id: "uuid-7",
      parent: "uuid-3",
      name: "backend-auth",
      labels: {
        source: "sbom",
        environment: "production",
      },
    },
    {
      id: "uuid-8",
      parent: "uuid-3",
      name: "backend-payments",
      labels: {
        source: "sbom",
        priority: "high",
      },
    },
    {
      id: "uuid-9",
      parent: "uuid-4",
      name: "kubernetes",
      labels: {
        team: "platform",
        environment: "production",
      },
    },
    {
      id: "uuid-10",
      parent: "uuid-4",
      name: "ci-cd",
      labels: {
        team: "platform",
        source: "manual",
      },
    },
    {
      id: "uuid-11",
      parent: "uuid-5",
      name: "login-page",
      labels: {
        component: "ui",
        priority: "low",
      },
    },
    {
      id: "uuid-12",
      parent: "uuid-5",
      name: "oauth-client",
      labels: {
        component: "security",
        priority: "high",
      },
    },
    {
      id: "uuid-13",
      parent: "uuid-6",
      name: "design-system",
      labels: {
        component: "ui",
        source: "manual",
      },
    },
    {
      id: "uuid-14",
      parent: "uuid-7",
      name: "token-service",
      labels: {
        component: "security",
        environment: "production",
      },
    },
    {
      id: "uuid-15",
      parent: "uuid-7",
      name: "session-store",
      labels: {
        component: "storage",
        priority: "medium",
      },
    },
    {
      id: "uuid-16",
      parent: "uuid-8",
      name: "billing-engine",
      labels: {
        component: "finance",
        priority: "high",
      },
    },
    {
      id: "uuid-17",
      parent: "uuid-8",
      name: "invoice-generator",
      labels: {
        component: "finance",
        source: "sbom",
      },
    },
    {
      id: "uuid-18",
      parent: "uuid-9",
      name: "cluster-addons",
      labels: {
        environment: "production",
        scope: "cluster",
      },
    },
    {
      id: "uuid-19",
      parent: "uuid-9",
      name: "networking",
      labels: {
        component: "network",
        priority: "high",
      },
    },
    {
      id: "uuid-20",
      parent: "uuid-10",
      name: "build-pipelines",
      labels: {
        component: "ci",
        environment: "staging",
      },
    },
    {
      id: "uuid-21",
      parent: "uuid-10",
      name: "release-pipelines",
      labels: {
        component: "cd",
        environment: "production",
      },
    },
    {
      id: "uuid-22",
      parent: "uuid-10",
      name: "security-scans",
      labels: {
        component: "security",
        source: "sbom",
      },
    },
    {
      id: "uuid-23",
      parent: "uuid-4",
      name: "observability",
      labels: {
        component: "monitoring",
        priority: "medium",
      },
    },
    {
      id: "uuid-24",
      parent: "uuid-23",
      name: "metrics",
      labels: {
        component: "metrics",
        environment: "production",
      },
    },
    {
      id: "uuid-25",
      parent: "uuid-23",
      name: "logging",
      labels: {
        component: "logging",
        environment: "production",
      },
    },
    {
      id: "uuid-26",
      parent: "uuid-23",
      name: "tracing",
      labels: {
        component: "tracing",
        priority: "low",
      },
    },
    {
      id: "uuid-27",
      parent: "uuid-1",
      name: "experimental",
      labels: {
        environment: "dev",
        priority: "low",
      },
    },
    {
      id: "uuid-28",
      parent: "uuid-27",
      name: "poc-feature-a",
      labels: {
        source: "manual",
        scope: "poc",
      },
    },
    {
      id: "uuid-29",
      parent: "uuid-27",
      name: "poc-feature-b",
      labels: {
        source: "manual",
        scope: "poc",
      },
    },
    {
      id: "uuid-30",
      parent: null,
      name: "root-group-2",
      labels: {
        scope: "local",
        owner: "forum",
      },
    },
  ],
};
