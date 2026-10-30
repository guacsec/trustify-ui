@vendor-remediation
Feature: Vendor (LW/RHLW) Remediation Recommendations
    As a security analyst
    I want to see vendor backport and upstream remediation recommendations across the SBOM and package views
    So that I can identify which fixed versions resolve each vulnerability

    Background: Authentication
        Given User is authenticated

    @TC-6486 @TC-6489
    @slow
    Scenario Outline: Remediation recommendations are surfaced across SBOM and package views
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        When User selects the Tab "Packages"
        Then The Packages tab shows the "Remediations" column
        Then The Packages tab lists package "<packageName>" version "<packageVersion>"
        Given User is on the Vulnerabilities tab with "100" rows per page for SBOM "<sbomName>"
        Then The Vulnerabilities tab shows the "Remediations" column
        Then Expanding vulnerability "<targetCve>" shows remediations "<targetChips>" for package "<packageName>" version "<packageVersion>"
        When User visits the Package list filtered by "<packageName>"
        Then The Package list shows the "Remediations" column
        Then The Package list lists package "<packageName>" version "<packageVersion>"
        Given User visits Vulnerability details Page of "<targetCve>"
        Then The SBOM "<sbomName>" is listed as "Affected" under the vulnerability

        Examples:
            | sbomName                            | packageName   | packageVersion    | targetCve      | targetChips                    |
            | springmvc-cve-2023-20860-scenario1  | spring-webmvc | 5.3.15            | CVE-2023-20860 | 5.3.18.rhlw-00010,5.3.26,6.0.7 |
            | springmvc-cve-2023-20860-scenario2  | spring-webmvc | 5.3.18            | CVE-2023-20860 | 5.3.18.rhlw-00010,5.3.26,6.0.7 |
            | springmvc-cve-2023-20860-scenario3  | spring-webmvc | 5.3.22            | CVE-2023-20860 | 5.3.26,6.0.7                   |
            | springmvc-cve-2023-20860-scenario4  | spring-webmvc | 5.2.22            | CVE-2023-20860 | 5.3.18.rhlw-00010              |
            | springmvc-cve-2023-20860-scenario5  | spring-webmvc | 5.3.27            | CVE-2024-38816 | 6.1.13                         |
            | springmvc-cve-2023-20860-scenario5a | spring-webmvc | 6.0.8             | CVE-2024-38816 | 6.1.13                         |
            | springmvc-cve-2023-20860-scenario7  | spring-webmvc | 5.3.15            | CVE-2023-20860 | 5.3.18.rhlw-00010,5.3.26,6.0.7 |
            | springmvc-cve-2023-20860-scenario6  | spring-webmvc | 5.3.18.rhlw-00010 | CVE-2024-38819 | 6.1.14                         |

    @TC-6602
    Scenario Outline: Two-package SBOM correlates remediations to each affected dependency
        Given User is on the Vulnerabilities tab with "100" rows per page for SBOM "<sbomName>"
        Then Expanding vulnerability "<targetCve>" shows remediations "<firstChips>" for package "<firstPackage>" version "<firstVersion>"
        Then Expanding vulnerability "<targetCve>" shows remediations "<secondChips>" for package "<secondPackage>" version "<secondVersion>"

        Examples:
            | sbomName                           | targetCve      | firstPackage  | firstVersion | firstChips                     | secondPackage | secondVersion | secondChips  |
            | springmvc-cve-2023-20860-scenario7 | CVE-2023-20860 | spring-webmvc | 5.3.15       | 5.3.18.rhlw-00010,5.3.26,6.0.7 | spring        | 5.3.15        | 5.3.26,6.0.7 |

    @TC-6604 @TC-6667
    Scenario Outline: Only the upstream fix is recommended for CVEs the vendor backport does not address
        Given User is on the Vulnerabilities tab with "100" rows per page for SBOM "<sbomName>"
        Then Expanding vulnerability "<cve>" shows remediations "<chips>" for package "spring-webmvc" version "<packageVersion>"

        Examples:
            | sbomName                            | cve            | packageVersion    | chips  |
            | springmvc-cve-2023-20860-scenario6  | CVE-2024-38819 | 5.3.18.rhlw-00010 | 6.1.14 |
            | springmvc-cve-2023-20860-scenario6  | CVE-2025-41242 | 5.3.18.rhlw-00010 | 6.2.10 |

    @TC-6603 @TC-6604 @TC-6667
    Scenario Outline: Package details shows the per-CVE remediation recommendation
        When User visits the Vulnerabilities tab of package "<packageName>" version "<packageVersion>"
        Then The package Vulnerabilities tab shows the "Remediations" column
        Then The package Vulnerabilities tab shows per-CVE remediations "<perCveRemediations>" for version "<packageVersion>"

        Examples:
            | packageName   | packageVersion    | perCveRemediations                                                                                                                                                     |
            | spring-webmvc | 5.3.15            | CVE-2022-22965=5.2.20.RELEASE,5.3.18;CVE-2023-20860=5.3.18.rhlw-00010,5.3.26,6.0.7;CVE-2024-38816=5.3.18.rhlw-00010,6.1.13;CVE-2024-38819=6.1.14;CVE-2025-41242=6.2.10 |
            | spring-webmvc | 5.3.22            | CVE-2023-20860=5.3.26,6.0.7;CVE-2024-38816=6.1.13;CVE-2024-38819=6.1.14;CVE-2025-41242=6.2.10                                                                          |
            | spring-webmvc | 5.2.22            | CVE-2023-20860=5.3.18.rhlw-00010;CVE-2024-38816=5.3.18.rhlw-00010;CVE-2024-38819=6.1.14                                                                                |
            | spring-webmvc | 5.3.27            | CVE-2024-38816=6.1.13;CVE-2024-38819=6.1.14;CVE-2025-41242=6.2.10                                                                                                      |
            | spring-webmvc | 6.0.8             | CVE-2024-38816=6.1.13;CVE-2024-38819=6.1.14;CVE-2025-41242=6.2.10                                                                                                      |
            | spring-webmvc | 5.3.18.rhlw-00010 | CVE-2023-20860=Applied;CVE-2024-38816=Applied;CVE-2024-38819=6.1.14;CVE-2025-41242=6.2.10                                                                              |
            | spring-webmvc | 5.3.18            | CVE-2023-20860=5.3.18.rhlw-00010,5.3.26,6.0.7;CVE-2024-38816=5.3.18.rhlw-00010,6.1.13;CVE-2024-38819=6.1.14;CVE-2025-41242=6.2.10                                      |

    @TC-6487 @TC-6663 @TC-6872
    Scenario Outline: Remediation report impact summary and package recommendations
        Given An ingested SBOM "<sbomName>" is available
        When User navigates to remediation report for SBOM "<sbomName>"
        Then The report shows "<sbomsWithRemediations>" SBOM with remediations out of "1" total
        Then The report shows "<addressablePackages>" addressable packages
        Then The report shows "<coverage>" percent coverage
        Then The packages table has "<tableRows>" rows
        Then The packages table shows package "<packageName>" version "<currentVersion>" recommended "<recommendedVersion>" addressing "<cves>" found in "<foundIn>"
        Then The Vendor Remediation Alert is "<alertStatus>"

        Examples:
            | sbomName                            | sbomsWithRemediations | addressablePackages | coverage | tableRows | packageName   | currentVersion    | recommendedVersion    | cves                             | foundIn                             | alertStatus |
            | springmvc-cve-2023-20860-scenario2  | 1                     | 1                   | 100      | 1         | spring-webmvc | 5.3.18            | 5.3.18.rhlw-00010     | CVE-2023-20860,CVE-2024-38816    | springmvc-cve-2023-20860-scenario2  | Visible     |
            | springmvc-cve-2023-20860-scenario1  | 0                     | 0                   | 0        | 0         |               |                   |                       |                                  |                                     | NotVisible  |
            | springmvc-cve-2023-20860-scenario3  | 0                     | 0                   | 0        | 0         |               |                   |                       |                                  |                                     | NotVisible  |
            | springmvc-cve-2023-20860-scenario4  | 0                     | 0                   | 0        | 0         |               |                   |                       |                                  |                                     | NotVisible  |
            | springmvc-cve-2023-20860-scenario5  | 0                     | 0                   | 0        | 0         |               |                   |                       |                                  |                                     | NotVisible  |
            | springmvc-cve-2023-20860-scenario5a | 0                     | 0                   | 0        | 0         |               |                   |                       |                                  |                                     | NotVisible  |
            | springmvc-cve-2023-20860-scenario6  | 1                     | 1                   | 100      | 1         | spring-webmvc | 5.3.18.rhlw-00010 | Applied               | CVE-2023-20860,CVE-2024-38816    | springmvc-cve-2023-20860-scenario6  | Visible     |
            | springmvc-cve-2023-20860-scenario7  | 0                     | 0                   | 0        | 0         |               |                   |                       |                                  |                                     | NotVisible  |

    @TC-6487 @TC-6663 @TC-6872
    @slow
    Scenario: Remediation report aggregates impact across a batch of SBOMs
        Given An ingested SBOM "springmvc-cve-2023-20860-scenario2" is available
        Given An ingested SBOM "springmvc-cve-2023-20860-scenario6" is available
        When User navigates to remediation report for SBOMs "springmvc-cve-2023-20860-scenario2,springmvc-cve-2023-20860-scenario6"
        Then The report shows "2" SBOM with remediations out of "2" total
        Then The report shows "2" addressable packages
        Then The report shows "100" percent coverage
        Then The packages table has "2" rows
        Then The packages table shows package "spring-webmvc" version "5.3.18" recommended "5.3.18.rhlw-00010" addressing "CVE-2023-20860,CVE-2024-38816" found in "springmvc-cve-2023-20860-scenario2"
        Then The packages table shows package "spring-webmvc" version "5.3.18.rhlw-00010" recommended "Applied" addressing "CVE-2023-20860,CVE-2024-38816" found in "springmvc-cve-2023-20860-scenario6"

    @TC-6487 @TC-6663 @TC-6872
    @slow
    Scenario: Remediation report shows fractional coverage when only some selected SBOMs have remediations
        Given An ingested SBOM "springmvc-cve-2023-20860-scenario2" is available
        Given An ingested SBOM "springmvc-cve-2023-20860-scenario1" is available
        When User navigates to remediation report for SBOMs "springmvc-cve-2023-20860-scenario2,springmvc-cve-2023-20860-scenario1"
        Then The report shows "1" SBOM with remediations out of "2" total
        Then The report shows "1" addressable packages
        Then The report shows "50" percent coverage
        Then The packages table has "1" rows
        Then The packages table shows package "spring-webmvc" version "5.3.18" recommended "5.3.18.rhlw-00010" addressing "CVE-2023-20860,CVE-2024-38816" found in "springmvc-cve-2023-20860-scenario2"
