
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
    And User clears all filters on SBOM Groups page
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
    Then Success notification "1" is displayed
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
    And User clears all filters on SBOM Groups page
    Then The SBOM Groups table shows all groups

  Scenario Outline: Add SBOM to group from SBOM list page
    Given User navigates to SBOM Groups page
    And A group "<groupName>" exists
    Given An ingested SBOM "<sbomName>" is available
    When User navigates to SBOM list page
    And User selects SBOM "<sbomName>" for bulk action
    And User clicks "Add to group" button
    And User selects group "<groupName>" in the modal
    And User submits add to group form
    Then Success notification "1" is displayed
    When User navigates to SBOM Groups page
    And User clicks on group "<groupName>"
    Then The SBOM "<sbomName>" is visible in the group member list

    Examples:
      | groupName        | sbomName     |
      | Critical Group   | openssl-3  |

  Scenario: Add multiple SBOMs to group from SBOM list page
    Given User navigates to SBOM Groups page
    And A group "Multi SBOM Group" exists
    When User navigates to SBOM list page
    And User picks 2 SBOMs from the list for bulk action
    And User clicks "Add to group" button
    And User selects group "Multi SBOM Group" in the modal
    And User submits add to group form
    Then Success notification "2" is displayed
    When User navigates to SBOM Groups page
    And User clicks on group "Multi SBOM Group"
    Then The picked SBOMs are visible in the group member list

  # Product label filtering
  Scenario: Product label badge appears for product groups
    Given User navigates to SBOM Groups page
    When User clicks "Create group" button
    And User fills group name with unique timestamp
    And User fills group description with "Product group test"
    And User fills group product status with "Yes"
    And User submits the group form
    Then The group creation is successful
    When User filters the created group by name
    Then The "Product" label badge is visible for the created group

  # Hierarchical tree display
  Scenario: Expand and collapse hierarchical tree nodes
    Given User navigates to SBOM Groups page
    And A parent group "Tree Parent" with child group "Tree Child" exists
    When User filters groups by name "Tree Parent"
    Then The group "Tree Parent" is visible in the table
    When User expands the tree node for "Tree Parent"
    Then The child group "Tree Child" is visible under "Tree Parent"
    When User collapses the tree node for "Tree Parent"
    Then The child group "Tree Child" is not visible

  # Parent group selection in create
  Scenario: Create child group with parent selection
    Given User navigates to SBOM Groups page
    And A group "Parent For Child" exists
    When User clicks "Create group" button
    And User fills group name with "Child Of Parent"
    And User selects parent group "Parent For Child" in the form
    And User submits the group form
    Then The group "Child Of Parent" creation notification is displayed
    When User filters groups by name "Parent For Child"
    And User expands the tree node for "Parent For Child"
    Then The child group "Child Of Parent" is visible under "Parent For Child"

  # Invalid group ID handling
  Scenario: Navigate to invalid group ID shows error
    When User navigates to group details with invalid ID
    Then An error state is displayed for the invalid group

  # SBOM count in group list
  Scenario: SBOM count is displayed for groups with SBOMs
    Given User navigates to SBOM Groups page
    And A group "Count Test Group" exists
    Given An ingested SBOM "curl" is available
    When User navigates to SBOM list page
    And User selects SBOM "curl" for bulk action
    And User clicks "Add to group" button
    And User selects group "Count Test Group" in the modal
    And User submits add to group form
    Then Success notification "1" is displayed
    When User navigates to SBOM Groups page
    And User filters groups by name "Count Test Group"
    Then The SBOM count is displayed for group "Count Test Group"

  # Product badge on group detail page
  Scenario: Product badge is displayed on group detail page
    Given User navigates to SBOM Groups page
    And A product group "Product Detail Badge" exists
    When User clicks on group "Product Detail Badge"
    Then The group details page is displayed
    And The "Product" badge is visible on the detail page

  # Edit group to change parent
  Scenario: Edit group to assign a parent
    Given User navigates to SBOM Groups page
    And A group "New Parent Group" exists
    And A group "Orphan Child" exists
    When User clicks kebab menu for group "Orphan Child"
    And User selects "Edit" action
    And User selects parent group "New Parent Group" in the form
    And User submits the group form
    And User clears all filters on SBOM Groups page
    And User filters groups by name "New Parent Group"
    And User expands the tree node for "New Parent Group"
    Then The child group "Orphan Child" is visible under "New Parent Group"

  # Edit group to remove parent
  Scenario: Edit group to remove parent makes it a root group
    Given User navigates to SBOM Groups page
    And A parent group "Detach Parent" with child group "Detach Child" exists
    When User filters groups by name "Detach Parent"
    And User expands the tree node for "Detach Parent"
    And User clicks kebab menu for child group "Detach Child"
    And User selects "Edit" action
    And User clears parent group selection in the form
    And User submits the group form
    And User clears all filters on SBOM Groups page
    And User filters groups by name "Detach Child"
    Then The group "Detach Child" is visible as a root group

  # Breadcrumb navigation
  Scenario: Breadcrumb navigation on group detail page
    Given User navigates to SBOM Groups page
    And A group "Breadcrumb Test" exists with description "Breadcrumb test group"
    When User clicks on group "Breadcrumb Test"
    Then The group details page is displayed
    And The breadcrumb shows "Groups" and "Group details"
    When User clicks the "Groups" breadcrumb link
    Then The SBOM Groups table is visible

  # Sorting on group list
  Scenario: Sort groups by name
    Given User navigates to SBOM Groups page
    When User clicks the name column header to sort
    Then The groups table is sorted by name ascending
    When User clicks the name column header to sort
    Then The groups table is sorted by name descending
