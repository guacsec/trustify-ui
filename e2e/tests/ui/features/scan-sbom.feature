Feature: Scan SBOM - To Generate Vulnerability Report for SBOM
    As an RHTPA user
    I want to be able to scan an SBOM so that I can review the vulnerabilities within the SBOM without having to ingest

Background: Authentication
    Given User is authenticated

Scenario: Verify Generate Vulnerability Report Screen
    When User Navigates to SBOMs List page
    When User Clicks Generate Vulnerability Button
    Then The Application should navigate to Generate Vulnerability Report screen
    Then The Page should contain Browse files option and instruction to Drag and drop files

Scenario: Generate Vulnerability Report for unsupported SBOM file extensions
    Given User Navigated to Generate Vulnerability Report screen
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then The report generation failed with error "Report failed"
    Then "The "<fileName>" file could not be analyzed. The file might be corrupted or an unsupported format" message should be displayed 
    Then "Try another file" button should be displayed 
    When User Clicks on "Try another file" button
    Then Application navigates to Generate Vulnerability Report screen
    Examples:
        |      fileName   | filePath|
        |    <tarfile>    |         |

Scenario: Generate Vulnerability Report for unsupported SBOM format
    Given User Navigated to Generate Vulnerability Report screen
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then The report generation failed with error "Report failed"
    Then "The "<fileName>" file could not be analyzed. The file might be corrupted or an unsupported format" message should displayed 
    Then "Try another file" button should be displayed 
    Examples:
        |      fileName         | filePath|
        |    <SPDX 2.2>         |         |
        |    <CycloneDX 1.4>    |         |
        |    <CycloneDX 1.5>    |         |

Scenario: Generate Vulnerability Report For SBOM without any vulnerabilities
    Given User Navigated to Generate Vulnerability Report screen
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then "No Vulnerabilities found" message should be displayed
    Then "The "<fileName>" was analyzed and found no vulnerabilities report" message should be displayed
    Then "Try another file" button should be displayed 
    When User Clicks on "Try another file" button
    Then Application navigates to Generate Vulnerability Report screen
    Examples:
        |      fileName     | filePath|
        |  <CycloneDX>      |         |
        |  <SPDX>           |         |

Scenario: Cancel Generate vulnerability report
    Given User Navigated to Generate Vulnerability Report screen
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then The Page should have a spinner with "Generating vulnerability report" message and "Cancel Report" option while processing the SBOM
    When User Clicks on "Cancel Report" link 
    Then Application navigates to Generate Vulnerability Report screen
    Examples:
    |      fileName     | filePath|
    |  <BigSBOMFile>    |         |

Scenario: Generate Vulnerability Report for supported SBOM file extensions
    Given User Navigated to Generate Vulnerability Report screen
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then On the successful report generation the Application should render Vulnerability Report for the SBOM
    Examples:
    |    fileName   | filePath|
    |    <json>     |         |
    |     <bz2>     |         |

Scenario: Verify Generate Vulnerability Report Screen
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then On the successful report generation the Application should render Vulnerability Report for the SBOM
    Then The title should be Vulnerability report with text "This is a temporary vulnerability report"
    Then The Vulnerabilities list should be filtered by 'Affected' status by default
    Then Filtering drop down should be visible with drop down values "Status" and "Importer"
    Then Clear filters option should be visible and enabled
    Then Tooltip on the "Published" column should display "The date when informartion about this vulnerability was first made available"
    Then Tooltip on the "Updated" column should display "The date when information about this vulnerability was most recently changed"
    Then "Actions" button should be visible with dropdown options "Generate new report" and "Download CSV"
    Examples:
        |      fileName     | filePath|
        |  <CycloneDX>      |         |
        |  <SPDX>           |         |

Scenario: Verify Vulnerabilities on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then On the successful report generation the Application should render Vulnerability Report for the SBOM
    Then The Vulnerabilities on the Vulnerability ID column should match with "<Vulnerabilities>"
    Examples:
        |      fileName     | filePath|  Vulnerabilities |
        |  <CycloneDX>      |         |   <vuln list>    |
        |  <SPDX>           |         |   <vuln list>    |

Scenario: Verify Vulnerability Details on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then On the successful report generation the Application should render Vulnerability Report for the SBOM
    Then The "Description" column of the "<Vulnerability>" should match with "<severity:Importer>"
    Then The "Severity" column of the "<Vulnerability>" should match with "<severity:Importer>"
    Then The "Status" column of the "<Vulnerability>" should match with "<status>"
    Then The "Affected packages" column of the "<Vulnerability>" should match with "<affectedcount>"
    Then The "Published" column of the "<Vulnerability>" should match with "<Published>"
    Then The "Updated" column of the "<Vulnerability>" should match with "<Updated>"
    Examples:
        |      fileName     | filePath|  Vulnerability |  Description   |  severity:Importer  |    status     |  Published |   Updated   |
        |  <CycloneDX>      |         |   <vuln ID>    |  <Description> |  <severity: source> | <csaf_status> |    <date>  |    <date>   |
        |  <SPDX>           |         |   <vuln ID>    |  <Description> |  <severity: source> | <csaf_status> |    <date>  |    <date>   |

Scenario: Verify Affected package list on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Clicks on Affected package count button of the "<Vulnerability>"
    Then Affected Package list should expand
    Then The "Type" column of the "<Vulnerability>" affected package should match with "<Type>"
    Then The "Namespace" column of the "<Vulnerability>" affected package should match with "<Namespace>"
    Then The "Name" column of the "<Vulnerability>" affected package should match with "<Name>"
    Then The "Path" column of the "<Vulnerability>" affected package should match with "<Path>"
    Then The "Qualifiers" column of the "<Vulnerability>" affected package should match with "<Qualifiers>"
    Examples:
        |      fileName     | filePath|  Vulnerability |  Type   | Namespace   | Name  |  Path | Qualifiers |
        |  <CycloneDX>      |         |   <vuln ID>    |  <Type> | <Namespace> | <Name>| <Path>|<Qualifiers>|
        |  <SPDX>           |         |   <vuln ID>    |  <Type> | <Namespace> | <Name>| <Path>|<Qualifiers>|

Scenario: Verify Filtering on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Applies "<filter>" filter with "<value>" on the Vulnerability Report
    Then Applied "<filter>" should be visible with "<value>" on the filter bar
    Then The Vulnerabilities on the Vulnerability ID column should match with "<Vulnerabilities>"
    When User Clicks on "Clear filters" option
    Then All the applied filters should be cleared
    Examples:
        |      fileName     | filePath|  filter         |  value   | Vulnerabilities |
        |  <CycloneDX>      |         |  Status         |  <value> |     <vuln list>    |
        |  <CycloneDX>      |         |  Status         |  <value> |     <vuln list>    |
        |  <SPDX>           |         |  Status         |  <value> |    <vuln list>    |
        |  <SPDX>           |         |  Status         |  <value> |    <vuln list>    |
        |  <CycloneDX>      |         |  Importer       |  <value> |     <vuln list>    |
        |  <SPDX>           |         |  Importer       |  <value> |     <vuln list>    |
        |  <SPDX>           |         |  Vulnerability ID   |  <value> |     <vuln list>    |

Scenario: Verify Severity on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Applies "<filter>" filter with "<value>" on the Vulnerability Report  
    Then Applied "<filter>" should be visible with "<value>" on the filter bar
    Then The Vulnerabilities on the Vulnerability ID column should match with "<Vulnerabilities>"
    Then The "Severity" of the "<Vulnerability>" should match with "<severity:importer>" 
    Examples:
        |      fileName     | filePath|  filter   |  value    | Vulnerabilities | Vulnerability |      severity:importer      |
        |  <CycloneDX>      |         | Severity  |   Low     |   <vuln list>  |   <vuln ID>    |   <severity: importer>      |
        |  <CycloneDX>      |         | Severity  |   Medium  |   <vuln list>  |   <vuln ID>    |   <severity: importer>      |
        |  <CycloneDX>      |         | Severity  |   High    |   <vuln list>  |   <vuln ID>    |   <severity: importer>      |
        |  <CycloneDX>      |         | Severity  |  Critical |   <vuln list>  |   <vuln ID>    |   <severity: importer>      |
        |  <SPDX>           |         | Severity  |   Low     |   <vuln list>  |   <vuln ID>    |   <severity: importer>      |
        |  <SPDX>           |         | Severity  |   Medium  |   <vuln list>  |   <vuln ID>    |   <severity: importer>      |
        |  <SPDX>           |         | Severity  |   High    |   <vuln list>  |   <vuln ID>    |   <severity: importer>      |
        |  <SPDX>           |         | Severity  |  Critical |   <vuln list>  |   <vuln ID>    |   <severity: importer>      |

Scenario: Verify Multiple filtering on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Applies "<filter1>" filter with "<value1>" on the Vulnerability Report
    When User Applies "<filter2>" filter with "<value2>" on the Vulnerability Report
    Then Applied "<filter1>" should be visible with "<value1>" on the filter bar
    Then Applied "<filter2>" should be visible with "<value2>" on the filter bar
    Then The Vulnerabilities on the Vulnerability ID column should match with "<Vulnerabilities>"
    Then The "Severity" of the "<Vulnerability>" should match with "<severity:importer>" 
    Examples:
        |      fileName     | filePath|  filter1   |  value1   |  filter2   |  value2   | Vulnerabilities | Vulnerability | severity:importer |
        |  <CycloneDX>      |         | Severity   |   Low     | Status     | Affected  | <vuln list>     | <vuln ID>     | <severity: importer> |
        |  <CycloneDX>      |         | Severity   |   Medium  | Importer   | OSV       | <vuln list>     | <vuln ID>     | <severity: importer> |
        |  <SPDX>           |         | Severity   |   High    | Status     | Fixed     | <vuln list>     | <vuln ID>     | <severity: importer> |
        |  <SPDX>           |         | Severity   | Critical  | Importer   | CVE       | <vuln list>     | <vuln ID>     | <severity: importer> |

Scenario: Verify Actions on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Clicks on "Actions" button
    Then The "Actions" dropdown should have options "Generate new report" and "Download CSV"
    When User Clicks on "Generate new report" option from the "Actions" dropdown
    Then Application navigates to Generate Vulnerability Report screen
    Examples:
        |      fileName     | filePath|
        |  <CycloneDX>      |         |
        |  <SPDX>           |         | 

Scenario: Verify Download CSV on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen        
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Clicks on "Actions" button
    Then The "Actions" dropdown should have options "Generate new report" and "Download CSV"
    When User Clicks on "Download CSV" option from the "Actions" dropdown
    Then The Vulnerability report CSV file should be downloaded
    Examples:
        |      fileName     | filePath|
        |  <CycloneDX>      |         |
        |  <SPDX>           |         |

Scenario: Verify Download and Leave on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Clicks on "<Vulnerability>" from the Vulnerability ID column
    Then A modal window should open with "Leave Vulnerability Report?" message
    When User Clicks on "Download and Leave" button from the modal window
    Then The Vulnerability report CSV file should be downloaded
    Then Application navigates to Vulnerability Explorer screen
    Examples:
        |      fileName     | filePath| Vulnerability  |
        |  <CycloneDX>      |         | <vuln ID>      |
        |  <SPDX>           |         | <vuln ID>      |

Scenario: Verify Leave without Downloading on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Clicks on "<Vulnerability>" from the Vulnerability ID column
    Then A modal window should open with "Leave Vulnerability Report?" message
    When User Clicks on "Leave without Downloading" button from the modal window
    Then Application navigates to Vulnerability Explorer screen
    Examples:
        |      fileName     | filePath| Vulnerability  |
        |  <CycloneDX>      |         | <vuln ID>      |
        |  <SPDX>           |         | <vuln ID>      |

Scenario: Verify Cancel on Leave Vulnerability Report modal window
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Clicks on "<Vulnerability>" from the Vulnerability ID column
    Then A modal window should open with "Leave Vulnerability Report?" message
    When User Clicks on "Cancel" button from the modal window
    Then Application should remain on the Generate Vulnerability Report screen
    Examples:
        |      fileName     | filePath| Vulnerability  |
        |  <CycloneDX>      |         | <vuln ID>      |
        |  <SPDX>           |         | <vuln ID>      |

Scenario: Verify Pagination on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then Pagination of Vulnerability list works
    Examples:
        |      fileName     | filePath|
        |  <BigSBOMFile>    |         |

Scenario: Generate Vulnerability Report for BigSBOMFile
    Given User Navigated to Generate Vulnerability Report screen
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then On the successful report generation the Application should render Vulnerability Report for the SBOM
    Examples:
    |    fileName     | filePath|
    |  <BigSBOMFile>  |         |

Scenario: Generate Vulnerability Report with Drag and Drop
    Given User Navigated to Generate Vulnerability Report screen
    When User Drags and Drops SBOM "<fileName>" from "<filePath>" to the Drop area
    Then On the successful report generation the Application should render Vulnerability Report for the SBOM
    Examples:
    |      fileName     | filePath|
    |  <CycloneDX>      |         |
    |  <SPDX>           |         |
    |    <json>        |         |
    |     <bz2>        |         |
    |  <BigSBOMFile>   |         |

Scenario: Verify Sorting on Generate Vulnerability Report for an SBOM
    Given User Navigated to Generate Vulnerability Report screen
    When User Clicks on Browse files Button
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    When User Sorts the "<column>" column in "<order>" order
    Then The Values on the "<column>" column should be sorted in "<order>" order
    Examples:
    |      fileName     | filePath|    column     |   order   | 
    |  <fileName>      |         |   Severity    |  Ascending|
    |  <fileName>      |         |   Severity    | Descending|

# Placeholders like <fileName>, <filePath>, <column>, and <order> should be replaced in the Examples table above