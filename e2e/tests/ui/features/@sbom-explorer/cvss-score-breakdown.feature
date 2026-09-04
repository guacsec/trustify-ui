Feature: CVSS Score Breakdown Popover
    As a Developer or DevSecOps Engineer
    I want to view the CVSS score breakdown for each vulnerability in an SBOM
    So that I can understand which advisory sources contribute scores and identify the highest severity

    Background: Authentication
        Given User is authenticated

    Scenario Outline: Verify CVSS Score Breakdown popover for multi-source vulnerability
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        And User selects the Tab "Vulnerabilities"
        And User clicks the Sources button for vulnerability "<vulnerabilityID>"
        Then The CVSS Score Breakdown popover is visible
        And The CVSS Score Breakdown popover shows highest severity "<highestSeverity>" with score "<highestScore>"
        And The CVSS Score Breakdown table has <expectedSources> rows

        Examples:
            | sbomName                 | vulnerabilityID | expectedSources | highestSeverity | highestScore |
            | multi-advisory-cvss-test | CVE-2020-13936  | 2               | High            | 8.8          |
            | multi-advisory-cvss-test | CVE-2021-44906  | 2               | Critical        | 9.8          |
            | multi-advisory-cvss-test | CVE-2023-28755  | 2               | High            | 7.5          |
            | multi-advisory-cvss-test | CVE-2025-61594  | 2               | High            | 7.5          |

    Scenario Outline: Verify CVSS Score Breakdown table row values
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        And User selects the Tab "Vulnerabilities"
        And User clicks the Sources button for vulnerability "<vulnerabilityID>"
        Then The breakdown table contains a row with score "<score>" severity "<severity>" version "<version>"

        Examples:
            | sbomName                 | vulnerabilityID | score | severity | version |
            | multi-advisory-cvss-test | CVE-2021-44906  | 9.8   | critical | 3.1     |
            | multi-advisory-cvss-test | CVE-2021-44906  | 3.1   | low      | 3.1     |
            | multi-advisory-cvss-test | CVE-2023-28755  | 7.5   | high     | 3.1     |
            | multi-advisory-cvss-test | CVE-2023-28755  | 5.3   | medium   | 3.1     |
