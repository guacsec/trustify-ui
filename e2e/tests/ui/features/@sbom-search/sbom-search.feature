Feature: SBOM Search Page
    Background: Authentication
        Given User is authenticated

    Scenario Outline: Verify Vulnerabilities
        Given An ingested SBOM "<sbomName>" is available
        Given An ingested SBOM "<sbomName>" containing Vulnerabilities

        Examples:
            | sbomName    |
            | quarkus-bom |

     Scenario Outline: Add Labels to SBOM from SBOM List Page
        Given An ingested SBOM "<sbomName>" is available
        When User Adds Labels "<Labels>" to "<sbomName>" SBOM from List Page
        Then The Label list "<Labels>" added to the SBOM "<sbomName>" on List Page
        Examples:
        | sbomName    |     Labels    |
        | quarkus-bom | RANDOM_LABELS |
