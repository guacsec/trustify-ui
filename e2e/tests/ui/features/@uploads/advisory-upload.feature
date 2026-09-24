Feature: Advisory Upload - Upload advisory documents to Trustify
    As a Trustify user
    I want to upload advisory documents
    So that I can manage and track security advisories

    Background: Authentication
        Given User is authenticated

    Scenario: Navigate to Upload Advisory page from advisory list
        When User navigates to the advisory list page
        When User clicks Upload Advisory button from the toolbar
        Then The application navigates to the Upload Advisory page
        And The upload page heading is "Upload Advisory"
        And The breadcrumb shows "Advisories" link and "Upload Advisory" as active item

    Scenario: Verify Upload Advisory page layout
        Given User is on the Upload Advisory page
        Then The upload page heading is "Upload Advisory"
        And The supported formats description mentions "CSAF" and "CVE"
        And The upload area displays "Drag and drop files here"
        And The upload area displays "Accepted file types: .json, .bz2"
        And The Upload button is visible in the upload area

    Scenario Outline: Upload a valid advisory file
        Given User is on the Upload Advisory page
        When User uploads file "<fileName>" from "<filePath>"
        Then The upload summary shows "1 of 1 files uploaded"
        And The uploaded file "<fileName>" shows "success" status

        Examples:
            | fileName                  | filePath                        |
            | cve-2022-45787.json.bz2   | /tests/common/assets/advisory/  |
            | cve-2023-0044.json.bz2    | /tests/common/assets/advisory/  |

    Scenario: Upload an invalid advisory file
        Given User is on the Upload Advisory page
        When User uploads file "invalid-file.json" from "/tests/common/assets/"
        Then The uploaded file "invalid-file.json" shows "danger" status

    Scenario: Reject file with unsupported extension
        Given User is on the Upload Advisory page
        When User uploads file "invalid-file.txt" from "/tests/common/assets/"
        Then The unsupported file modal is displayed containing "invalid-file.txt"

    Scenario: Upload multiple advisory files simultaneously
        Given User is on the Upload Advisory page
        When User uploads files "cve-2022-45787.json.bz2, cve-2023-0044.json.bz2" from "/tests/common/assets/advisory/"
        Then The upload summary shows "2 of 2 files uploaded"
        And The uploaded file "cve-2022-45787.json.bz2" shows "success" status
        And The uploaded file "cve-2023-0044.json.bz2" shows "success" status

    Scenario: Upload mix of valid and invalid files
        Given User is on the Upload Advisory page
        When User uploads file "cve-2022-45787.json.bz2" from "/tests/common/assets/advisory/"
        When User uploads file "invalid-file.json" from "/tests/common/assets/"
        Then The upload summary shows "1 of 2 files uploaded"
        And The uploaded file "cve-2022-45787.json.bz2" shows "success" status
        And The uploaded file "invalid-file.json" shows "danger" status

    Scenario: Remove file from upload list
        Given User is on the Upload Advisory page
        When User uploads files "cve-2022-45787.json.bz2, cve-2023-0044.json.bz2" from "/tests/common/assets/advisory/"
        Then The upload summary shows "2 of 2 files uploaded"
        When User removes file "cve-2022-45787.json.bz2" from the upload list
        Then The upload summary shows "1 of 1 files uploaded"
