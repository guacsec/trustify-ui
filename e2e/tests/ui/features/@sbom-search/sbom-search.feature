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
        Then The Label list "<Labels>" is visible on the List Page for SBOM "<sbomName>"

        Examples:
            | sbomName    | Labels        |
            | quarkus-bom | RANDOM_LABELS |

    Scenario Outline: Verify Labels of CBOM on SBOM List Page
        Given An ingested SBOM "<sbomName>" is available
        Then The Label list "<Labels>" is visible on the List Page for SBOM "<sbomName>"

        Examples:
            | sbomName | Labels    |
            | liboqs   | kind=cbom |

    Scenario Outline: Verify Labels of AIBOM on SBOM List Page
        Given An ingested SBOM "<sbomName>" is available
        Then The Label list "<Labels>" is visible on the List Page for SBOM "<sbomName>"

        Examples:
            | sbomName       | Labels     |
            | claude-4-opus  | kind=aibom |

    Scenario Outline: Filter AIBOM on SBOM List Page
        Given An ingested SBOM "<sbomName>" is available
        When User applies "Label" filter with "kind=aibom" on the SBOM List Page
        Then The SBOM List Page shows only SBOMs with label "kind=aibom"

        Examples:
            | sbomName       |
            | claude-4-opus  |

    Scenario Outline: Filter CBOM on SBOM List Page
        Given An ingested SBOM "<sbomName>" is available
        When User applies "Label" filter with "kind=cbom" on the SBOM List Page
        Then The SBOM List Page shows only SBOMs with label "kind=cbom"

        Examples:
            | sbomName |
            | liboqs   |