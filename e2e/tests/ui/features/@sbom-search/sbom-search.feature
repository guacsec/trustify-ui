Feature: SBOM Search Page
    Background: Authentication
        Given User is authenticated

    Scenario Outline: Verify Vulnerabilities
        Given An ingested SBOM "<sbomName>" is available
        Given An ingested SBOM "<sbomName>" containing Vulnerabilities

        Examples:
            | sbomName    |
            | quarkus-bom |
