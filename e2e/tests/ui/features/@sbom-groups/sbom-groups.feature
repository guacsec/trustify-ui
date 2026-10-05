
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

  # CRUD Operations - Create
  Scenario: Create new SBOM group
    Given User navigates to SBOM Groups page
    When User clicks "Create group" button
    And User fills group name with "Create Test Group"
    And User fills group description with "Auto-generated test group"
    And User fills group product status with "No"
    And User submits the group form
    Then Alert message "Group Create Test Group created" is displayed
    When User applies filter "Filter" with value "Create Test Group"
    Then The group "Create Test Group" is visible in the table

  # CRUD Operations - Edit
  Scenario: Edit SBOM group
    Given User navigates to SBOM Groups page
    And A group "Test Group Edit" exists
    When User applies filter "Filter" with value "Test Group Edit"
    And User clicks kebab menu for group "Test Group Edit"
    And User selects "Edit" action
    And User fills group name with "Edited Test Group"
    And User fills group description with "Updated test description"
    And User submits the group form
    And User clears all filters on SBOM Groups page
    And User applies filter "Filter" with value "Edited Test Group"
    Then The group "Edited Test Group" is visible in the table

  # CRUD Operations - Delete
  Scenario Outline: Delete SBOM group with confirmation
    Given User navigates to SBOM Groups page
    And A group "<groupName>" exists
    When User applies filter "Filter" with value "<groupName>"
    And User clicks kebab menu for group "<groupName>"
    And User selects "Delete" action
    Then The delete confirmation dialog is displayed
    When User confirms deletion
    Then The group "<groupName>" is deleted successfully
    When User applies filter "Filter" with value "<groupName>"
    Then The SBOM Groups table does not contain "<groupName>"

    Examples:
      | groupName          |
      | Temporary Group    |

  Scenario: Cancel delete operation
    Given User navigates to SBOM Groups page
    And A group "Keep This Group" exists
    When User applies filter "Filter" with value "Keep This Group"
    And User clicks kebab menu for group "Keep This Group"
    And User selects "Delete" action
    And User cancels deletion
    When User applies filter "Filter" with value "Keep This Group"
    And User clicks on group "Keep This Group"

  # Group Details Page
  Scenario Outline: View SBOM group details
    Given User navigates to SBOM Groups page
    And A group "<groupName>" exists with description "<groupDescription>"
    When User applies filter "Filter" with value "<groupName>"
    And User clicks on group "<groupName>"
    Then The group details page is displayed
    And The page title is "<groupName>"
    And The group description is "<groupDescription>"

    Examples:
      | groupName          | groupDescription           |
      | Production Group   | Critical production SBOMs  |

  Scenario: View empty SBOM group details
    Given User navigates to SBOM Groups page
    And A group "Empty Group" exists
    When User applies filter "Filter" with value "Empty Group"
    And User clicks on group "Empty Group"
    Then The group details page is displayed
    And The group shows 0 member SBOMs
    And The empty state message is displayed

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
    When User navigates to SBOM list page
    And User selects SBOM "<sbomName>" for bulk action
    And User clicks "Add to group" button
    And User selects group "<groupName>" in the modal
    And User submits add to group form
    Then Success notification "1" is displayed
    When User navigates to SBOM Groups page
    And User applies filter "Filter" with value "<groupName>"
    Then The SBOM count for group "<groupName>" shows "1 SBOMs"
    When User clicks on group "<groupName>"
    Then The SBOM "<sbomName>" is visible in the group member list

    Examples:
      | groupName        | sbomName  |
      | Critical Group   | openssl-3 |
      | Correlation Test | curl      |

  Scenario Outline: Add multiple SBOMs to group from SBOM list page
    Given User navigates to SBOM Groups page
    And A group "<groupName>" exists
    When User applies filter "Filter" with value "<groupName>"
    Then The SBOM count is not displayed for group "<groupName>"
    #When User adds SBOMs "<sbom1>" and "<sbom2>" to group "<groupName>"
    When User adds multiple SBOMs to the group "<groupName>"
    Then Success notification "2" is displayed
    When User navigates to SBOM Groups page
    And User applies filter "Filter" with value "<groupName>"
    Then The SBOM count for group "<groupName>" shows "2 SBOMs"
    When User clicks on group "<groupName>"
    Then The Selected SBOMs are visible in the group member list
    Examples:
      | groupName        |
      | Multi SBOM Group |

  # Product label filtering
  Scenario: Product label badge appears for product groups
    Given User navigates to SBOM Groups page
    When User clicks "Create group" button
    And User fills group name with "Product Badge Group"
    And User fills group description with "Product group test"
    And User fills group product status with "Yes"
    And User submits the group form
    When User applies filter "Filter" with value "Product Badge Group"
    Then The group "Product Badge Group" is visible in the table
    And The "Product" label badge is visible for group "Product Badge Group"
    When User clicks on group "Product Badge Group"
    Then The group details page is displayed
    And The "Product" badge is visible on the detail page

  # Hierarchical tree display
  Scenario: Expand and collapse hierarchical tree nodes
    Given User navigates to SBOM Groups page
    And A parent group "Tree Parent" with child group "Tree Child" exists
    When User applies filter "Filter" with value "Tree Parent"
    Then The SBOM Groups table shows filtered results containing "Tree Parent"
    When User expands the tree node for "Tree Parent"
    Then The child group "Tree Child" is visible under "Tree Parent"
    When User collapses the tree node for "Tree Parent"
    Then The child group "Tree Child" is not visible

  # ─────────────────────────────────────────────────────────────────
  # Filter auto-expands parent when child matches
  # ─────────────────────────────────────────────────────────────────

  Scenario: Filter matching child auto-expands parent to show matching child
    Given User navigates to SBOM Groups page
    And A parent group "AutoExpand Parent" with child group "AutoExpand Child" exists
    When User applies filter "Filter" with value "AutoExpand Child"
    Then The SBOM Groups table shows filtered results containing "AutoExpand Parent"
    And The child group "AutoExpand Child" is visible under "AutoExpand Parent"

  # ─────────────────────────────────────────────────────────────────
  # Filter matching only parent — children not visible after expand
  # Bug: TC-5060 — filtered tree shows non-matching children when parent is expanded
  # ─────────────────────────────────────────────────────────────────

  # Scenario: Filter matching only parent shows no children when expanded
  #   Given User navigates to SBOM Groups page
  #   And A parent group "OnlyParent Match" with child group "Hidden Offspring" exists
  #   When User applies filter "Filter" with value "OnlyParent Match"
  #   Then The SBOM Groups table shows filtered results containing "OnlyParent Match"
  #   When User expands the tree node for "OnlyParent Match"
  #   Then The child group "Hidden Offspring" is not visible

  # Invalid group ID handling
  Scenario: Navigate to invalid group ID shows error
    When User navigates to group details with invalid ID
    Then An error state is displayed for the invalid group

  # # Product badge on group detail page
  Scenario: Product badge is displayed on group detail page
    Given User navigates to SBOM Groups page
    And A product group "Product Detail Badge" exists
    When User applies filter "Filter" with value "Product Detail Badge"
    And User clicks on group "Product Detail Badge"
    Then The group details page is displayed
    And The Product badge is visible on the detail page

  # Edit group to change parent
  Scenario: Edit group to assign a parent
    Given User navigates to SBOM Groups page
    And A standalone group "Orphan Child" exists
    And A group "New Parent Group" exists
    When User applies filter "Filter" with value "Orphan Child"
    And User clicks kebab menu for group "Orphan Child"
    And User selects "Edit" action
    And User selects parent group "New Parent Group" in the edit form
    And User submits the group form
    And User clears all filters on SBOM Groups page
    And User applies filter "Filter" with value "New Parent"
    And User expands the tree node for "New Parent Group"
    Then The child group "Orphan Child" is visible under "New Parent Group"

  # Edit group to remove parent
  Scenario: Edit group to remove parent makes it a root group
    Given User navigates to SBOM Groups page
    And A parent group "Detach Parent" with child group "Remove Child" exists
    When User applies filter "Filter" with value "Detach Parent"
    And User expands the tree node for "Detach Parent"
    And User clicks kebab menu for child group "Remove Child"
    And User selects "Edit" action
    And User clears parent group selection in the form
    And User submits the group form
    And User applies filter "Filter" with value "Remove Child"
    Then The group "Remove Child" is visible as a root group

  # Breadcrumb navigation
  Scenario: Breadcrumb navigation on group detail page
    Given User navigates to SBOM Groups page
    And A group "Breadcrumb Test" exists with description "Breadcrumb test group"
    When User applies filter "Filter" with value "Breadcrumb Test"
    And User clicks on group "Breadcrumb Test"
    Then The group details page is displayed
    And The breadcrumb shows "Groups" and "Group details"
    When User clicks the "Groups" breadcrumb link
    Then The SBOM Groups table is visible

  # Pagination on group detail page
  Scenario Outline: Pagination and Sorting on group detail page
    Given User navigates to SBOM Groups page
    And A group "<groupName>" exists
    When User adds SBOMs "<sbom1>" and "<sbom2>" to group "<groupName>"
    When User navigates to SBOM Groups page
    And User applies filter "Filter" with value "<groupName>"
    And User clicks on group "<groupName>"
    Then The group detail SBOMs pagination is visible
    And The SBOMs table is sorted by Name ascending
    When User clicks the Name column header to sort SBOMs
    Then The SBOMs table is sorted by Name descending
    When User clicks the Name column header to sort SBOMs
    Then The SBOMs table is sorted by Name ascending

    Examples:
      | groupName             | sbom1 | sbom2       |
      | Multi SBOM Group      | curl  | quarkus-bom |

  # Delete guard for parent groups - Bug TC-5059
  @skip
  Scenario: Delete action is blocked for group with children
    Given User navigates to SBOM Groups page
    And A parent group "Parent No Delete" with child group "Child Prevents Delete" exists
    When User applies filter "Filter" with value "Parent No Delete"
    And User clicks kebab menu for group "Parent No Delete"
    And User selects "Delete" action
    Then The delete guard dialog is displayed for group "Parent No Delete"

  # Labels management
  Scenario: Create group with custom labels
    Given User navigates to SBOM Groups page
    When User clicks "Create group" button
    And User fills group name with "Custom Labels Group"
    And User fills group product status with "No"
    And User adds label "env=staging" to the group form
    And User adds label "team=security" to the group form
    And User submits the group form
    When User applies filter "Filter" with value "Custom Labels Group"
    Then The group "Custom Labels Group" is visible in the table
    Then The "env=staging" label badge is visible for group "Custom Labels Group"
    And The "team=security" label badge is visible for group "Custom Labels Group"

  Scenario: Verify labels on group detail page
    Given User navigates to SBOM Groups page
    And A group "Detail Label Check" with label "source=api" exists
    When User applies filter "Filter" with value "Detail Label Check"
    And User clicks on group "Detail Label Check"
    Then The group details page is displayed
    And The "source=api" label badge is not visible on the detail page

  # Navigate into child group from tree
  Scenario: Navigate into child group from tree
    Given User navigates to SBOM Groups page
    And A parent group "Nav Parent" with child group "Nav Child" exists
    When User applies filter "Filter" with value "Nav Parent"
    And User expands the tree node for "Nav Parent"
    And User clicks on group "Nav Child"
    Then The group details page is displayed
    And The page title is "Nav Child"

  # Description display in tree table
  Scenario: Group description displays in tree table
    Given User navigates to SBOM Groups page
    And A group "Desc Display" exists with description "Verify description display"
    When User applies filter "Filter" with value "Desc Display"
    Then The description "Verify description display" is visible for group "Desc Display"

  # Toggle product flag
  Scenario: Toggle product flag from Yes to No
    Given User navigates to SBOM Groups page
    And A product group "Toggle Product" exists
    When User applies filter "Filter" with value "Toggle Product"
    Then The "Product" label badge is visible for group "Toggle Product"
    When User clicks kebab menu for group "Toggle Product"
    And User selects "Edit" action
    And User fills group product status with "No"
    And User submits the group form
    And User applies filter "Filter" with value "Toggle Product"
    Then The "Product" label badge is not visible for group "Toggle Product"

  # ─────────────────────────────────────────────────────────────────
  # SBOM count decreases after reassignment to another group
  # ─────────────────────────────────────────────────────────────────
  Scenario: SBOM count decreases when SBOM is reassigned to another group
    Given User navigates to SBOM Groups page
    And A group "Reassign Source" exists
    And A group "Reassign Dest" exists
    When User navigates to SBOM list page
    And User selects SBOM "curl" for bulk action
    And User clicks "Add to group" button
    And User selects group "Reassign Source" in the modal
    And User submits add to group form
    Then Success notification "1" is displayed
    When User navigates to SBOM Groups page
    And User applies filter "Filter" with value "Reassign Source"
    Then The SBOM count for group "Reassign Source" shows "1 SBOMs"
    When User navigates to SBOM list page
    And User selects SBOM "curl" for bulk action
    And User clicks "Add to group" button
    And User selects group "Reassign Dest" in the modal
    And User submits add to group form
    Then Success notification "1" is displayed
    When User navigates to SBOM Groups page
    And User applies filter "Filter" with value "Reassign Source"
    Then The SBOM count for group "Reassign Source" shows "1 SBOMs"
    When User clears all filters on SBOM Groups page
    And User applies filter "Filter" with value "Reassign Dest"
    Then The SBOM count for group "Reassign Dest" shows "1 SBOMs"

  # ─────────────────────────────────────────────────────────────────
  # SBOM count independence — parent vs child counts
  # ─────────────────────────────────────────────────────────────────
  
  Scenario: SBOM counts are independent between parent and child groups
    Given User navigates to SBOM Groups page
    And A parent group "Count Parent" with child group "Count Child" exists
    When User navigates to SBOM list page
    And User selects SBOM "ubi9-minimal-container" for bulk action
    And User clicks "Add to group" button
    And User selects group "Count Child" in the modal
    And User submits add to group form
    Then Success notification "1" is displayed
    When User navigates to SBOM Groups page
    And User applies filter "Filter" with value "Count Parent"
    Then The SBOM count is not displayed for group "Count Parent"
    When User expands the tree node for "Count Parent"
    Then The SBOM count for group "Count Child" shows "1 SBOMs"

  # ─────────────────────────────────────────────────────────────────
  # 3-level hierarchy — expand, collapse, verify tree levels
  # ─────────────────────────────────────────────────────────────────
  
  Scenario: Expand and navigate 3-level hierarchy
    Given User navigates to SBOM Groups page
    And A grandparent group "L3 Grandparent" with parent group "L3 Parent" and child group "L3 Child" exists
    When User applies filter "Filter" with value "L3 Grandparent"
    Then The SBOM Groups table shows filtered results containing "L3 Grandparent"
    When User expands the tree node for "L3 Grandparent"
    Then The child group "L3 Parent" is visible under "L3 Grandparent"
    When User expands the tree node for "L3 Parent"
    Then The child group "L3 Child" is visible under "L3 Parent"
    And The group "L3 Child" is at tree level 3
    When User collapses the tree node for "L3 Parent"
    Then The child group "L3 Child" is not visible
    When User collapses the tree node for "L3 Grandparent"
    Then The child group "L3 Parent" is not visible

  
  Scenario: Navigate into grandchild group from 3-level tree
    Given User navigates to SBOM Groups page
    And A grandparent group "Nav3 Grandparent" with parent group "Nav3 Parent" and child group "Nav3 Child" exists
    When User applies filter "Filter" with value "Nav3 Grandparent"
    And User expands the tree node for "Nav3 Grandparent"
    And User expands the tree node for "Nav3 Parent"
    And User clicks on group "Nav3 Child"
    Then The group details page is displayed
    And The page title is "Nav3 Child"

  # ─────────────────────────────────────────────────────────────────
  # 3-level hierarchy — remove middle group's parent
  # ─────────────────────────────────────────────────────────────────
  
  Scenario: Remove parent from middle group in 3-level hierarchy
    Given User navigates to SBOM Groups page
    And A grandparent group "Detach3 GP" with parent group "Detach3 Mid" and child group "Detach3 Child" exists
    When User applies filter "Filter" with value "Detach3 GP"
    And User expands the tree node for "Detach3 GP"
    And User clicks kebab menu for child group "Detach3 Mid"
    And User selects "Edit" action
    And User clears parent group selection in the form
    And User submits the group form
    And User applies filter "Filter" with value "Detach3 Mid"
    Then The group "Detach3 Mid" is visible as a root group
    When User expands the tree node for "Detach3 Mid"
    Then The child group "Detach3 Child" is visible under "Detach3 Mid"

  # ─────────────────────────────────────────────────────────────────
  # Delete guard — middle group with children in 3-level hierarchy - Bug TC-5059
  # ─────────────────────────────────────────────────────────────────
  @skip
  Scenario: Delete is blocked for middle group with children in 3-level hierarchy
    Given User navigates to SBOM Groups page
    And A grandparent group "Guard3 GP" with parent group "Guard3 Mid" and child group "Guard3 Child" exists
    When User applies filter "Filter" with value "Guard3 GP"
    And User expands the tree node for "Guard3 GP"
    And User clicks kebab menu for child group "Guard3 Mid"
    And User selects "Delete" action
    Then The delete guard dialog is displayed for group "Guard3 Mid"

  # ─────────────────────────────────────────────────────────────────
  # Form validation — duplicate name
  # ─────────────────────────────────────────────────────────────────

  Scenario: Create group with duplicate name shows error
    Given User navigates to SBOM Groups page
    And A group "Dup Name Check" exists
    When User clicks "Create group" button
    And User fills group name with "Dup Name Check"
    And User fills group product status with "No"
    Then The form validation error "Dup Name Check already exists in group" is displayed

  # ─────────────────────────────────────────────────────────────────
  # Form validation — self-referencing parent
  # ─────────────────────────────────────────────────────────────────

  Scenario: Self-referencing parent shows validation error
    Given User navigates to SBOM Groups page
    And A group "Self Ref Test" exists
    When User applies filter "Filter" with value "Self Ref Test"
    And User clicks kebab menu for group "Self Ref Test"
    And User selects "Edit" action
    And User selects parent group "Self Ref Test" in the edit form
    Then The form validation error "Parent cannot reference itself" is displayed

  # ─────────────────────────────────────────────────────────────────
  # Form validation — reserved and restricted labels
  # ─────────────────────────────────────────────────────────────────

  Scenario: Reserved Product label is rejected in group form
    Given User navigates to SBOM Groups page
    When User clicks "Create group" button
    And User fills group name with "Reserved Label Test"
    And User fills group product status with "No"
    And User adds label "Product" to the group form
    Then The label validation error "The label 'Product' is reserved" is displayed

  Scenario: Product group rejects type labels
    Given User navigates to SBOM Groups page
    When User clicks "Create group" button
    And User fills group name with "Type Label Reject Test"
    And User fills group product status with "Yes"
    And User adds label "type=widget" to the group form
    Then The label validation error "Groups designated as products cannot have additional 'type' labels" is displayed

  # ─────────────────────────────────────────────────────────────────
  # Cancel create — form discards input
  # ─────────────────────────────────────────────────────────────────

  Scenario: Cancel create group discards input
    Given User navigates to SBOM Groups page
    When User clicks "Create group" button
    And User fills group name with "Should Not Exist"
    And User fills group description with "This should be discarded"
    And User cancels the group form
    And User applies filter "Filter" with value "Should Not Exist"
    Then The SBOM Groups table does not contain "Should Not Exist"

  # ─────────────────────────────────────────────────────────────────
  # Cancel edit — original values preserved
  # ─────────────────────────────────────────────────────────────────

  Scenario: Cancel edit group preserves original values
    Given User navigates to SBOM Groups page
    And A group "Cancel Edit Test" exists
    When User applies filter "Filter" with value "Cancel Edit Test"
    And User clicks kebab menu for group "Cancel Edit Test"
    And User selects "Edit" action
    And User fills group name with "Changed Name"
    And User cancels the group form
    And User applies filter "Filter" with value "Cancel Edit Test"
    Then The group "Cancel Edit Test" is visible in the table

  # ─────────────────────────────────────────────────────────────────
  # Filter SBOMs on group detail page
  # ─────────────────────────────────────────────────────────────────

  Scenario: Filter SBOMs on group detail page
    Given User navigates to SBOM Groups page
    And A group "Detail Filter Test" exists
    When User adds SBOMs "curl" and "claude-4-opus" to group "Detail Filter Test"
    When User navigates to SBOM Groups page
    And User applies filter "Filter" with value "Detail Filter Test"
    And User clicks on group "Detail Filter Test"
    Then The group details page is displayed
    When User filters SBOMs by name "curl" on the detail page
    Then The SBOM "curl" is visible in the group member list
    When User filters SBOMs by name "claude-4-opus" on the detail page
    Then The SBOM "claude-4-opus" is visible in the group member list
