
Feature: SBOM Groups - Manage SBOM groups
  As a security analyst
  I want to organize SBOMs into groups
  So that I can better manage and track related SBOMs

  Background: Authentication
    Given User is authenticated

  # Navigation and List Display
  Scenario: Navigate to SBOM Groups page
    When User navigates to SBOM Groups page
    Then The page title is "Groups"
    And The SBOM Groups table is visible

  Scenario: Display SBOM Groups table structure
    Given User navigates to SBOM Groups page
    Then The SBOM Groups table is visible
    And The SBOM Groups table shows group data

  # CRUD Operations - Create
  Scenario: Create new SBOM group with unique name
    Given User navigates to SBOM Groups page
    When User clicks "Create group" button
    And User fills group name with unique timestamp
    And User fills group description with "Auto-generated test group"
    And User fills group product status with "No"
    And User submits the group form
    Then The group creation is successful

  # CRUD Operations - Edit
  Scenario: Edit SBOM group with unique name
    Given User navigates to SBOM Groups page
    And A group "Test Group Edit" exists
    When User clicks kebab menu for group "Test Group Edit"
    And User selects "Edit" action
    And User fills group name with unique timestamp for edit
    And User fills group description with "Updated test description"
    And User submits the group form
    And User clears all filters
    Then The group edit is successful

  # CRUD Operations - Delete
  Scenario Outline: Delete SBOM group with confirmation
    Given User navigates to SBOM Groups page
    And A group "<groupName>" exists
    When User clicks kebab menu for group "<groupName>"
    And User selects "Delete" action
    Then The delete confirmation dialog is displayed
    When User confirms deletion
    Then The group "<groupName>" is deleted successfully
    And The SBOM Groups table does not contain "<groupName>"

    Examples:
      | groupName          |
      | Temporary Group    |

  Scenario: Cancel delete operation
    Given User navigates to SBOM Groups page
    And A group "Keep This Group" exists
    When User clicks kebab menu for group "Keep This Group"
    And User selects "Delete" action
    And User cancels deletion
    Then The SBOM Groups table contains "Keep This Group"

  # Group Details Page
  Scenario Outline: View SBOM group details
    Given User navigates to SBOM Groups page
    And A group "<groupName>" exists with description "<groupDescription>"
    When User clicks on group "<groupName>"
    Then The group details page is displayed
    And The page title is "<groupName>"
    And The group description is "<groupDescription>"

    Examples:
      | groupName          | groupDescription           |
      | Production Group   | Critical production SBOMs  |

  Scenario: View empty SBOM group details
    Given User navigates to SBOM Groups page
    And A group "Empty Group" exists with 0 SBOMs
    When User clicks on group "Empty Group"
    Then The group details page is displayed
    And The group shows 0 member SBOMs
    And The empty state message is displayed

  Scenario: Verify SBOM appears in group after adding
    Given User navigates to SBOM Groups page
    And A group "<groupName>" exists
    Given An ingested SBOM "<sbomName>" is available
    When User navigates to SBOM list page
    And User selects SBOM "<sbomName>" for bulk action
    And User clicks "Add to group" button
    And User selects group "<groupName>" in the modal
    And User submits add to group form
    When User navigates to SBOM Groups page
    And User clicks on group "<groupName>"
    Then The SBOM "<sbomName>" is visible in the group member list
    When User navigates back to SBOM Groups page
    And User clicks on group "<groupName>"
    Then The SBOM "<sbomName>" is still visible in the group member list

    Examples:
      | groupName        | sbomName     |
      | Correlation Test   | curl |

  # Filtering and Search
  Scenario: Filter SBOM groups by name
    Given User navigates to SBOM Groups page
    And A group "Filter Group name" exists
    When User applies filter "Filter" with value "Filter Group name"
    Then The SBOM Groups table shows filtered results containing "Filter Group name"

  Scenario: Search SBOM groups by name
    Given User navigates to SBOM Groups page
    And A group "Searchable Group" exists
    When User searches for group "Searchable"
    Then The SBOM Groups table contains "Searchable Group"

  Scenario: Clear filter shows all groups
    Given User navigates to SBOM Groups page
    And A group "Filter Group name" exists
    When User applies filter "Filter" with value "Filter Group name"
    Then The SBOM Groups table shows filtered results containing "Filter Group name"
    And User clears all filters
    Then The SBOM Groups table shows all groups

  # JIRA Bug: https://redhat.atlassian.net/browse/TC-4012
  # Scenario Outline: Add SBOM to group from SBOM list page
  #   Given User navigates to SBOM Groups page
  #   And A group "<groupName>" exists
  #   Given An ingested SBOM "<sbomName>" is available
  #   When User navigates to SBOM list page
  #   And User selects SBOM "<sbomName>" for bulk action
  #   And User clicks "Add to group" button
  #   And User selects group "<groupName>" in the modal
  #   And User submits add to group form
  #   Then Success notification "added to the group" is displayed
  #   When User navigates to SBOM Groups page
  #   And User clicks on group "<groupName>"
  #   Then The SBOM "<sbomName>" is visible in the group member list

  #   Examples:
  #     | groupName        | sbomName     |
  #     | Critical Group   | curl  |

  # Issue: https://github.com/guacsec/trustify-ui/issues/977
  # Scenario Outline: Add multiple SBOMs to group from SBOM list page
  #   Given User navigates to SBOM Groups page
  #   And A group "Multi SBOM Group" exists
  #   Given An ingested SBOM "<sbomName1>" is available
  #   And An ingested SBOM "<sbomName2>" is available
  #   When User navigates to SBOM list page
  #   And User selects SBOM "<sbomName1>" for bulk action
  #   And User selects SBOM "<sbomName2>" for bulk action
  #   And User clicks "Add to group" button
  #   And User selects group "Multi SBOM Group" in the modal
  #   And User submits add to group form
  #   Then Success notification "added to the group" is displayed
  #   When User navigates to SBOM Groups page
  #   And User clicks on group "Multi SBOM Group"
  #   Then The SBOM "<sbomName1>" is visible in the group member list
  #   And The SBOM "<sbomName2>" is visible in the group member list

  #   Examples:
  #     | groupName        | sbomName1 | sbomName2 |
  #     | Multi SBOM Group   | curl  | liboqs  |
