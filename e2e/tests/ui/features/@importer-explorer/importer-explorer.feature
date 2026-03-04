Feature: Importer Explorer - View importers details
    Background: Authentication
        Given User is authenticated

    Scenario: Navigate to Importers page and verify basic elements
        When User navigates to Importers page
        Then The page title is "Importers"
        Then The importers table should be visible
        Then Action menu buttons should be visible for all importers

    Scenario: Verify table structure and filtering capability
        When User navigates to Importers page
        Then The importers table should have columns "Name, Type, Description, Source, Period, State"
        Then The toolbar should be visible
        And The filter toggle button should be available

    Scenario: Filter importers by name using search
        When User navigates to Importers page
        And User applies filter "Filter text" with value "<importerName>"
        Then The importers table shows <expectedCount> row(s)

        Examples:
            | importerName | expectedCount |
            | cve          | 2             |
    
    Scenario: Expand importers to view detailed information
        When User navigates to Importers page
        And User expands all importer rows
        Then All importer rows should show expanded content
        
    Scenario: Verify pagination controls on first page
        When User navigates to Importers page
        Then Pagination controls should be displayed
        And Pagination should be on first page with disabled navigation
        And The page number input should be editable

    Scenario Outline: Verify action menu options for enabled and disabled importers
        When User navigates to Importers page
        Then Importers with state "<importerState>" should have "<actionOptions>" action options

        Examples:
            | importerState | actionOptions |
            | enabled       | Run, Disable  |
            | disabled      | Enable        |
        

    Scenario Outline: Disable an enabled importer
        When User navigates to Importers page
        And User disables the "<importerName>" importer
        Then A confirmation dialog should appear
        And User confirms the action
        Then The "<importerName>" importer state should be "Disabled"

        Examples:
            | importerName |
            | cve          |
        

    Scenario: Verify disabled importer does not show Disable option
        When User navigates to Importers page
        And User opens action menu for a disabled importer
        Then The "Enable" option should be visible
        And The "Disable" option should not be visible

    Scenario Outline: Enable a disabled importer
        When User navigates to Importers page
        And User enables a disabled importer "<importerName>"
        Then A confirmation dialog should appear
        And User confirms the action
        Then The "<importerName>" importer should show "Scheduled" state or progress indicator

        Examples:
            | importerName                |
            | clearly-defined-curations   |

    Scenario Outline: Run an enabled importer
        When User navigates to Importers page
        And User runs the "<importerName>" importer
        Then A confirmation dialog should appear
        And User confirms the action
        Then A success message should be displayed
        And The "<importerName>" importer should show progress indicator

        Examples:
            | importerName |
            | cve          |
               