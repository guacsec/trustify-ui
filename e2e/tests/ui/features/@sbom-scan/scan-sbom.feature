Feature: Scan SBOM - To Generate Vulnerability Report for SBOM
    As an RHTPA user
    I want to be able to scan an SBOM so that I can review the vulnerabilities within the SBOM without having to ingest

Background: Authentication
    Given User is authenticated

Scenario: Verify Generate Vulnerability Report option
    When User Navigates to SBOMs List page
    When User Clicks Generate Vulnerability Button
    Then The Application should navigate to Generate Vulnerability Report screen
    Then The Page should contain Browse files option and instruction to Drag and drop files

Scenario: Generate Vulnerability Report For SBOM without any vulnerabilities
    Given User Navigated to Generate Vulnerability Report screen
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then "No Vulnerabilities found" header should be displayed
    #Bug: TC-2985
    #Then "The "<fileName>" was analyzed and found no vulnerabilities report" message should be displayed
    Then "Try another file" button should be displayed 
    When User Clicks on "Try another file" button
    Then Application navigates to Generate Vulnerability Report screen
    Examples:
        |               fileName            |              filePath           |
        |  example_product_quarkus.json.bz2 |   /tests/common/assets/sbom/    |
        |  ubi9-minimal-9.3-1361.json.bz2   |   /tests/common/assets/sbom/    |

Scenario: Cancel Generate vulnerability report
    Given User Navigated to Generate Vulnerability Report screen
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then The Page should have a spinner with "<header>" message and "<cancelLabel>" option while processing the SBOM
    When User Clicks on "<cancelLabel>" link 
    Then Application navigates to Generate Vulnerability Report screen
    Examples:
        |               fileName                     |              filePath              |              header             |   cancelLabel   |
        |  example_component_quarkus.json.bz2        |    /tests/common/assets/sbom/      | Generating vulnerability report |  Cancel Report  |

Scenario: Generate Vulnerability Report for supported SBOM file extensions
    Given User Navigated to Generate Vulnerability Report screen
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then On the successful report generation the Application should render Vulnerability Report for the SBOM
    Examples:
    |        fileName          |               filePath            |
    |    examples_sbom.json    |    /tests/common/assets/sbom/     |
    |   exhort_mvn.json.bz2    |    /tests/common/assets/sbom/     |

Scenario: Verify Generate Vulnerability Report Screen
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then On the successful report generation the Application should render Vulnerability Report for the SBOM
    Then The title should be Vulnerability report with text "This is a temporary vulnerability report"
    Then Filtering drop down should be visible with drop down values "<filters>"
    Then Tooltip on the "Published" column should display "The date when information about this vulnerability was first made available"
    Then Tooltip on the "Updated" column should display "The date when information about this vulnerability was most recently revised"
    Then "Actions" button should be visible with dropdown options "<ActionsOptions>"
    Examples:
        |                        fileName              |              filePath             |                         filters                    |              ActionsOptions         |
        |     quarkus-bom-3.8.3.redhat-00003.json.bz2  |   /tests/common/assets/sbom/      |      Vulnerability ID, Importer, Severity  |   Generate new report, Download as CSV |
        |               exhort_mvn.json.bz2            |   /tests/common/assets/sbom/      |      Vulnerability ID, Importer, Severity  |   Generate new report, Download as CSV |

Scenario: Verify Vulnerabilities on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then On the successful report generation the Application should render Vulnerability Report for the SBOM
    Then The Vulnerabilities on the Vulnerability ID column should match with "<Vulnerabilities>"
    Examples:
        |                        fileName              |              filePath             |     Vulnerabilities |
        |     quarkus-bom-3.8.3.redhat-00003.json.bz2  |   /tests/common/assets/sbom/      |    CVE-2024-2700,CVE-2024-29025,CVE-2025-48924,CVE-2025-49574,CVE-2025-55163     |
        |               exhort_mvn.json.bz2            |   /tests/common/assets/sbom/      |    CVE-2022-45787,CVE-2023-0481,CVE-2023-1584,CVE-2023-4853,CVE-2024-2700,CVE-2024-29025,CVE-2025-48924,CVE-2025-48988,CVE-2025-48989,CVE-2025-49128,CVE-2025-49574,CVE-2025-52520,CVE-2025-53506,CVE-2025-55163,CVE-2025-55668 |

Scenario: Verify Vulnerability Details on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then On the successful report generation the Application should render Vulnerability Report for the SBOM
    When User Applies "Vulnerability ID" filter with "<Vulnerability>" on the Vulnerability Report
    When User Enters "<Vulnerability>" in the Vulnerability ID Textbox
    When User Clicks on More option if visible on Severity column of the "<Vulnerability>"
    # Bug: TC-3002 Importer value to Unknown
    Then The Severity column of the "<Vulnerability>" should match with "<severity:Importer>"
    Then The "Description" column of the "<Vulnerability>" should match with "<Description>"
    Then The "Status" column of the "<Vulnerability>" should match with "<status>"
    Then The "Affected packages" column of the "<Vulnerability>" should match with "<affectedcount>"
    Then The "Published" column of the "<Vulnerability>" should match with "<Published>"
    Then The "Updated" column of the "<Vulnerability>" should match with "<Updated>"
    Examples:
        |                   fileName                   |             filePath              |   Vulnerability    |                                            Description                             |                                               severity:Importer                        |  status  |  affectedcount  |     Published   |      Updated      |
        |     quarkus-bom-3.8.3.redhat-00003.json.bz2  |   /tests/common/assets/sbom/      |   CVE-2024-29025   |                       Netty HttpPostRequestDecoder can OOM                         |  Medium(5.3): Unknown,Medium(5.3): Unknown,Medium(5.3): Unknown,Medium(5.3): Unknown   | Affected |        1        |   Mar 25, 2024  |    Feb 13, 2025   |
        |               exhort_mvn.json.bz2            |   /tests/common/assets/sbom/      |   CVE-2023-0481    |  In RestEasy Reactive implementation of Quarkus the insecure File.createTempFile() |                  Medium(5.3): Unknown,Low(3.3): Unknown,Medium(5.3): Unknown           | Affected |        1        |   Feb 24, 2023  |    Mar 12, 2025   |

Scenario: Verify Affected package list on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then On the successful report generation the Application should render Vulnerability Report for the SBOM
    When User Applies "Vulnerability ID" filter with "<Vulnerability>" on the Vulnerability Report
    When User Enters "<Vulnerability>" in the Vulnerability ID Textbox
    When User Clicks on Affected package count button of the "<Vulnerability>"
    Then Affected Package table should expand
    Then The "Type" column of the "<Vulnerability>" affected package should match with "<Type>"
    Then The "Namespace" column of the "<Vulnerability>" affected package should match with "<Namespace>"
    Then The "Name" column of the "<Vulnerability>" affected package should match with "<Name>"
    Then The "Version" column of the "<Vulnerability>" affected package should match with "<Version>"
    Then The "Path" column of the "<Vulnerability>" affected package should match with "<Path>"
    Then The "Qualifiers" column of the "<Vulnerability>" affected package should match with "<Qualifiers>"
    Examples:
        |                   fileName                   |             filePath              |   Vulnerability    |  Type  |          Namespace           |               Name        |           Version         | Path |                                Qualifiers                      |
        |     quarkus-bom-3.8.3.redhat-00003.json.bz2  |   /tests/common/assets/sbom/      |   CVE-2024-29025   |  maven |          io.netty            |       netty-codec-http    | 4.1.107.Final-redhat-00001|      |repository_url=https://maven.repository.redhat.com/ga/,type=jar |
        |               exhort_mvn.json.bz2            |   /tests/common/assets/sbom/      |   CVE-2023-0481    |  maven | io.quarkus.resteasy.reactive | resteasy-reactive-common  |           2.13.7.Final    |      |                                                                |

Scenario: Verify Actions on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Clicks on "Actions" button
    Then The Actions dropdown should have options "Generate new report" and "Download as CSV"
    When User Clicks on "Generate new report" option from the Actions dropdown
    Then Application navigates to Generate Vulnerability Report screen
    Examples:
        |                        fileName              |              filePath             |
        |     quarkus-bom-3.8.3.redhat-00003.json.bz2  |   /tests/common/assets/sbom/      |
        |               exhort_mvn.json.bz2            |   /tests/common/assets/sbom/      |


Scenario: Verify Download as CSV on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen        
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Clicks on "Actions" button
    Then The Actions dropdown should have options "Generate new report" and "Download as CSV"
    Then User Downloads CSV with default filename "<fileName>" by clicking on "Download as CSV" option
    Examples:
        |                        fileName              |              filePath             |
        |     quarkus-bom-3.8.3.redhat-00003.json.bz2  |   /tests/common/assets/sbom/      |
        |               exhort_mvn.json.bz2            |   /tests/common/assets/sbom/      |

Scenario: Verify Download and Leave on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Enters "<Vulnerability>" in the Vulnerability ID Textbox
    When User Clicks on "<Vulnerability>" from the Vulnerability ID column
    Then A modal window should open with "Leave Vulnerability Report?" message
    When User Downloads CSV with default filename "<fileName>" and Leaves by clicking on "Download and Leave" button from the modal window
    Then Application navigates to Vulnerability Explorer screen of "<Vulnerability>"
    Examples:
        |                        fileName              |              filePath             | Vulnerability  |
        |     quarkus-bom-3.8.3.redhat-00003.json.bz2  |   /tests/common/assets/sbom/      | CVE-2025-48924 |
        |               exhort_mvn.json.bz2            |   /tests/common/assets/sbom/      | CVE-2023-1584 |

Scenario: Verify Leave without Downloading on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Enters "<Vulnerability>" in the Vulnerability ID Textbox
    When User Clicks on "<Vulnerability>" from the Vulnerability ID column
    Then A modal window should open with "Leave Vulnerability Report?" message
    When User Clicks on "Leave without Downloading" button from the modal window
    Then Application navigates to Vulnerability Explorer screen of "<Vulnerability>"
    Examples:
        |                        fileName              |              filePath             | Vulnerability  |
        |     quarkus-bom-3.8.3.redhat-00003.json.bz2  |   /tests/common/assets/sbom/      | CVE-2025-48924 |
        |               exhort_mvn.json.bz2            |   /tests/common/assets/sbom/      | CVE-2023-1584 |

Scenario: Verify Cancel on Leave Vulnerability Report modal window
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Enters "<Vulnerability>" in the Vulnerability ID Textbox
    When User Clicks on "<Vulnerability>" from the Vulnerability ID column
    Then A modal window should open with "Leave Vulnerability Report?" message
    When User Clicks on "Cancel" button from the modal window
    Then Application should remain on the Generate Vulnerability Report screen
    Examples:
        |                        fileName              |              filePath             | Vulnerability  |
        |     quarkus-bom-3.8.3.redhat-00003.json.bz2  |   /tests/common/assets/sbom/      | CVE-2025-48924 |
        |               exhort_mvn.json.bz2            |   /tests/common/assets/sbom/      | CVE-2023-1584  |

Scenario: Verify Filtering on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then On the successful report generation the Application should render Vulnerability Report for the SBOM
    When User Applies "<filter>" filter with "<value>" on the Vulnerability Report
    Then Applied "<filter>" should be visible with "<value>" on the filter bar
    Then The Vulnerabilities on the Vulnerability ID column should match with "<Vulnerabilities>"
    When User Applies "Vulnerability ID" filter with "<Vulnerability>" on the Vulnerability Report
    When User Enters "<Vulnerability>" in the Vulnerability ID Textbox
    Then The "Severity" of the "<Vulnerability>" should match with "<severity:importer>"
    Examples:
        |                      fileName                |             filePath              |     filter         |      value     |                                                   Vulnerabilities                                       |  Vulnerability  |                        severity:importer                     |
        |                examples_sbom.json            |   /tests/common/assets/sbom/      |    Severity        |      Medium    |                                          CVE-2025-48795,CVE-2025-48924                                  | CVE-2025-48924  |                     Medium(6.5): Unknown                     |
        |               exhort_mvn.json.bz2            |   /tests/common/assets/sbom/      |    Severity        |      Medium    |CVE-2022-45787,CVE-2023-0481,CVE-2024-29025,CVE-2025-48924,CVE-2025-49128,CVE-2025-49574,CVE-2025-55668  |  CVE-2023-0481  |   Medium(5.3): Unknown,Low(3.3): Unknown,Medium(5.3): Unknown|
        |     quarkus-bom-3.8.3.redhat-00003.json.bz2  |   /tests/common/assets/sbom/      |    Severity        |       High     |                                          CVE-2024-2700,CVE-2025-55163                                   |  CVE-2024-2700  |                         High(7): Unknown                     |

Scenario: Verify Pagination on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then Pagination of Vulnerability list works
    Examples:
        |                        fileName              |              filePath             |
        |               exhort_mvn.json.bz2            |   /tests/common/assets/sbom/      |

Scenario: Verify Sorting on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then Sorting of "<sortableColumns>" Columns Works
    Examples:
    |                        fileName              |              filePath             |                        sortableColumns                    |
    |                exhort_mvn.json.bz2           |   /tests/common/assets/sbom/      |    Vulnerability ID,Affected packages,Published,Updated   |