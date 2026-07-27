Feature: SBOM Upload - Upload SBOM documents to Trustify
    As a Trustify user
    I want to upload SBOM documents
    So that I can manage and analyze my software supply chain

    Background: Authentication
        Given User is authenticated

    Scenario: Navigate to Upload SBOM page from SBOM list
        When User navigates to the SBOM list page
        When User clicks Upload SBOM action from the toolbar
        Then The application navigates to the Upload SBOM page
        And The upload page heading is "Upload SBOM"
        And The breadcrumb shows "SBOMs" link and "Upload SBOM" as active item

    Scenario: Verify Upload SBOM page layout
        Given User is on the Upload SBOM page
        Then The upload page heading is "Upload SBOM"
        And The supported formats description mentions "CycloneDX" and "SPDX"
        And The upload area displays "Drag and drop files here"
        And The upload area displays "Accepted file types: .json, .bz2"
        And The Upload button is visible in the upload area

    Scenario Outline: Upload a valid SBOM file
        Given User is on the Upload SBOM page
        When User uploads file "<fileName>" from "<filePath>"
        Then The upload summary shows "1 of 1 files uploaded"
        And The uploaded file "<fileName>" shows "success" status

        Examples:
            | fileName                         | filePath                   |
            | examples_sbom.json               | /tests/common/assets/sbom/ |
            | example_product_quarkus.json.bz2 | /tests/common/assets/sbom/ |

    Scenario: Upload an invalid SBOM file
        Given User is on the Upload SBOM page
        When User uploads file "invalid-file.json" from "/tests/common/assets/"
        Then The uploaded file "invalid-file.json" shows "danger" status

    Scenario: Reject file with unsupported extension
        Given User is on the Upload SBOM page
        When User uploads file "invalid-file.txt" from "/tests/common/assets/"
        Then The unsupported file modal is displayed containing "invalid-file.txt"

    Scenario: Upload multiple SBOM files simultaneously
        Given User is on the Upload SBOM page
        When User uploads files "examples_sbom.json, example_product_quarkus.json.bz2" from "/tests/common/assets/sbom/"
        Then The upload summary shows "2 of 2 files uploaded"
        And The uploaded file "examples_sbom.json" shows "success" status
        And The uploaded file "example_product_quarkus.json.bz2" shows "success" status

    Scenario: Upload mix of valid and invalid files
        Given User is on the Upload SBOM page
        When User uploads file "examples_sbom.json" from "/tests/common/assets/sbom/"
        When User uploads file "invalid-file.json" from "/tests/common/assets/"
        Then The upload summary shows "1 of 2 files uploaded"
        And The uploaded file "examples_sbom.json" shows "success" status
        And The uploaded file "invalid-file.json" shows "danger" status

    Scenario: Remove file from upload list
        Given User is on the Upload SBOM page
        When User uploads files "examples_sbom.json, example_product_quarkus.json.bz2" from "/tests/common/assets/sbom/"
        Then The upload summary shows "2 of 2 files uploaded"
        When User removes file "examples_sbom.json" from the upload list
        Then The upload summary shows "1 of 1 files uploaded"
