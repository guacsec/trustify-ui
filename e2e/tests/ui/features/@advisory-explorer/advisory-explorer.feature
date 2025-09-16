Feature: Advisory Explorer
    Background: Authentication
        Given User is authenticated

# Search for advisories
    Scenario: Search for an advisory using the general search bar
        
        When User searches for an advisory named "<advisoryID>" in the general search bar
        
        Then The advisory "<advisoryID>" shows in the results

        Examples:
            | advisoryID      |
            | CVE-2024-26308  |
    
    Scenario: Search for an advisory using the dedicated search bar

        When User searches for "<advisoryID>" in the dedicated search bar
        
        Then The advisory "<advisoryID>" shows in the results

        Examples:
            | advisoryID      |
            | CVE-2024-26308  |

    # Advisory Explorer
    Scenario: Display an overview of an advisory

        When User visits Advisory details Page of "<advisoryID>"

        Then The page title is "<advisoryID>"
        Then The "Download" action is available

        Examples:
            | advisoryID      |
            | CVE-2024-26308  |

    Scenario: Download an advisory

        When User visits Advisory details Page of "<advisoryID>"

        Then "Download Advisory" action is invoked and downloaded filename is "<fileName>"

        Examples:
            | advisoryID      | fileName            |
            | CVE-2024-26308  | CVE-2024-26308.json |

    Scenario: Display the Info tab

        When User visits Advisory details Page of "<advisoryID>"

        Then The "Overview" panel is visible
        Then The "Publisher" panel is visible
        Then The "Tracking" panel is visible

        Examples:
            | advisoryID      |
            | CVE-2024-26308  |

# Advisory Vulnerabilities
Scenario: Display vulnerabilities tied to a single advisory
    Given User visits Advisory details Page of "<advisoryName>" with type "<advisoryType>"
    Then User navigates to the Vulnerabilities tab on the Advisory Overview page
    Then Pagination of Vulnerabilities list works
    Then A list of all active vulnerabilites tied to the advisory should display
    And The "ID, Title, Discovery, Release, Score, CWE" information should be visible for each vulnerability
    And The vulnerabilities should be sorted by ID by default
    And User visits Vulnerability details Page of "<vulnerabilityID>" by clicking it

    Examples:
        | advisoryName    | vulnerabilityID | advisoryType |
        | CVE-2023-3223   | CVE-2023-3223   |     csaf     |
