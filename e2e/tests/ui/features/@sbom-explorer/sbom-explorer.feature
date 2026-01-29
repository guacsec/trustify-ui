Feature: SBOM Explorer - View SBOM details
    Background: Authentication
        Given User is authenticated

    Scenario Outline: View SBOM Overview
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        Then The page title is "<sbomName>"
        And Tab "Info" is visible
        And Tab "Packages" is visible
        And Tab "Vulnerabilities" is visible
        But Tab "Dependency Analytics Report" is not visible

        Examples:
            | sbomName    |
            | quarkus-bom |

    Scenario Outline: View SBOM Info (Metadata)
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        Then Tab "Info" is selected
        Then "SBOM's name" is visible
        And "SBOM's namespace" is visible
        And "SBOM's license" is visible
        And "SBOM's creation date" is visible
        And "SBOM's supplier" is visible

        Examples:
            | sbomName    |
            | quarkus-bom |

    Scenario Outline: Downloading SBOM file
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        Then "Download SBOM" action is invoked and downloaded filename is "<expectedSbomFilename>"
        Then "Download License Report" action is invoked and downloaded filename is "<expectedLicenseFilename>"

        Examples:
            | sbomName    | expectedSbomFilename | expectedLicenseFilename     |
            | quarkus-bom | quarkus-bom.json     | quarkus-bom_licenses.tar.gz |

    Scenario Outline: View list of SBOM Packages
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        When User selects the Tab "Packages"
        # confirms its visible for all tabs
        Then The page title is "<sbomName>"
        Then The Package table is sorted by "Name"
        When Search by FilterText "<packageName>"
        Then The Package table is sorted by "Name"
        Then The Package table total results is 1
        Then The "Name" column of the Package table table contains "<packageName>"
        When Search by FilterText "nothing matches"
        Then The Package table total results is 0
        When User clear all filters
        Then The Package table total results is greather than 1

        Examples:
            | sbomName    | packageName |
            | quarkus-bom | jdom        |

    Scenario Outline: View SBOM Vulnerabilities
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        When User selects the Tab "Vulnerabilities"
        When User Clicks on Vulnerabilities Tab Action
        Then Vulnerability Popup menu appears with message
        Then Vulnerability Risk Profile circle should be visible
        Then Vulnerability Risk Profile shows summary of vulnerabilities
        Then SBOM Name "<sbomName>" should be visible inside the tab
        Then SBOM Version should be visible inside the tab
        Then SBOM Creation date should be visible inside the tab
        Then List of related Vulnerabilities should be sorted by "Id" in ascending order

        Examples:
            | sbomName    |
            | quarkus-bom |

    @slow
    Scenario Outline: Pagination of SBOM Vulnerabilities table
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        When User selects the Tab "Vulnerabilities"
        Then Pagination of "Vulnerability" table works

        Examples:
            | sbomName    |
            | quarkus-bom |

    @slow
    Scenario Outline: View paginated list of SBOM Packages
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        When User selects the Tab "Packages"
        Then Pagination of "Package" table works

        Examples:
            | sbomName               |
            | ubi9-minimal-container |

    Scenario Outline: Check Column Headers of SBOM Explorer Vulnerabilities table
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        When User selects the Tab "Vulnerabilities"
        Then List of Vulnerabilities has column "Id"
        Then List of Vulnerabilities has column "Description"
        Then List of Vulnerabilities has column "CVSS"
        Then List of Vulnerabilities has column "Affected dependencies"
        Then List of Vulnerabilities has column "Published"
        Then List of Vulnerabilities has column "Updated"

        Examples:
            | sbomName    |
            | quarkus-bom |

    @slow
    Scenario Outline: Sorting SBOM Vulnerabilities
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        When User selects the Tab "Vulnerabilities"
        Then Table column "Description" is not sortable
        Then Sorting of "Vulnerability" table for "Id, CVSS, Affected dependencies, Published, Updated" columns works

        Examples:
            | sbomName    |
            | quarkus-bom |

    Scenario Outline: Add Labels to SBOM from SBOM Explorer Page
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        When User Adds Labels "<Labels>" to "<sbomName>" SBOM from Explorer Page
        Then The Label list "<Labels>" added to the SBOM "<sbomName>" on Explorer Page

        Examples:
            | sbomName               | Labels        |
            | ubi9-minimal-container | RANDOM_LABELS |

    Scenario Outline: Delete SBOM from SBOM Explorer Page
        Given An ingested SBOM "<sbomName>" is available
        When User visits SBOM details Page of "<sbomName>"
        When User Clicks on Actions button and Selects Delete option from the drop down
        When User select Delete button from the Permanently delete SBOM model window
        Then The SBOM deleted message is displayed
        And Application Navigates to SBOM list page
        And The "<sbomName>" should not be present on SBOM list page as it is deleted

        Examples:
            | sbomName    |
            | MRG-M-3.0.0 |

    Scenario Outline: Delete SBOM from SBOM List Page
        When User Deletes "<sbomName>" using the toggle option from SBOM List Page
        When User select Delete button from the Permanently delete SBOM model window
        Then The SBOM deleted message is displayed
        And Application Navigates to SBOM list page
        And The "<sbomName>" should not be present on SBOM list page as it is deleted

        Examples:
            | sbomName      |
            | rhn_satellite |

    Scenario Outline: SBOM Explorer Vulnerability Correlation with Affected Advisory
        Given User is on the Vulnerabilities tab with "100" rows per page for SBOM "<sbomName>"
        When User clicks on the vulnerability row with ID "<vulnerabilityID>"
        Then The Application navigates to the Vulnerability details Page of "<vulnerabilityID>"
        And The Related SBOMs tab loaded with SBOM "<sbomName>" with status "<status>"

        Examples:
            | sbomName    | vulnerabilityID | status   |
            | quarkus-bom | CVE-2023-0044   | Affected |

    Scenario Outline: SBOM Explorer Vulnerability Correlation with Fixed Advisory
        Given User is on the Vulnerabilities tab with "100" rows per page for SBOM "<sbomName>"
        Then The vulnerability "<vulnerabilityID>" does not show in the Vulnerabilities table
        Given User visits Vulnerability details Page of "<vulnerabilityID>"
        Then The Related SBOMs tab loaded with SBOM "<sbomName>" with status "<status>"

        Examples:
            | sbomName    | vulnerabilityID | status |
            | quarkus-bom | CVE-2023-1584   | Fixed  |

    Scenario Outline: SBOM Explorer Package Correlation with SBOM
        Given User is on the Vulnerabilities tab with "100" rows per page for SBOM "<sbomName>"
        When User clicks on Affected dependencies count button of the "<vulnerabilityID>"
        And User clicks on the package name "<packageName>" link on the expanded table
        Then The Application navigates to the Package details Page of "<packageName>"
        And Vulnerability "<vulnerabilityID>" visible under Vulnerabilities tab
        And The SBOMs using package tab loaded with SBOM "<sbomName>"

        Examples:
            | sbomName    | vulnerabilityID | packageName        |
            | quarkus-bom | CVE-2023-0044   | quarkus-vertx-http |
