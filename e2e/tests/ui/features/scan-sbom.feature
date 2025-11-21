Feature: Scan SBOM - To Generate Vulnerability Report for SBOM
    As an RHTPA user
    I want to be able to scan an SBOM so that I can review the vulnerabilities within the SBOM without having to ingest

Background: Authentication
    Given User is authenticated


#Bug TC-2985
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

#Bug TC-2985
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

#Bug TC-2985
Scenario: Generate Vulnerability Report for SBOM with License issues
    Given User Navigated to Generate Vulnerability Report screen
    When User Selects SBOM "<fileName>" from "<filePath>" on the file explorer dialog window
    Then The report generation failed with error "Report failed"
    Then "The "<fileName>" file could not be analyzed. The file might be corrupted or an unsupported format" message should displayed 
    Then "<Error Message>" message should be displayed  under "Show details" section
    Then "Try another file" button should be displayed 
    Examples:
        |                          fileName                    |              filePath             |                                                                       Error Message                                                         |
        |  quarkus-bom-2.13.8.Final-redhat-00004.json.bz2      |    /tests/common/assets/sbom/     | error parsing the expression: Parsing for expression `Parsing for expression `ORACLE-FREE-USE-TERMS AND CONDITIONS-(FUTC)` failed.` failed. |
        
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

# Placeholders like <fileName>, <filePath>, <column>, and <order> should be replaced in the Examples table above