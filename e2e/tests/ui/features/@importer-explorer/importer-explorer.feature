Feature: Importer Explorer - View importers details
    Background: Authentication
        Given User is authenticated

    Scenario: The user navigates to Importers Explorer page
        Given The user navigates to TPA URL page successfully
        When The user selects the importers menu option
        Then Application navigates to Importers page
        Then Call to Action button for each importer should be visible

    Scenario: The user can see that the filter icon appears in importers page
        Given The user navigates to TPA URL page 
        When The user selects the importers overview page
        Then The column headers should be visible
        Then There should be a filter icon displayed

    Scenario: The user can search a text in search text box with pressing 'Enter' in the keyboard 
        Given The user navigates to TPA URL landing page
        When The user selects the importers option
        Then A search text box appears
        Then The user types "<importerName>" in the search text box and presses Enter key
        Then Importer total results is 1
    
        Examples:
            | importerName |
            | cve |
    
    Scenario: The user can expand all importers to see their logs
        Given The user navigates to TPA URL dashboard page
        When The importers option is selected on the left menu
        Then The user expands all the importers rows
        Then All the importers rows should be expanded
        
    Scenario: Pagination controls on importer explorer page
        Given The user navigates to TPA URL page home page
        When The user selects the importers option from left menu
        Then The importers page should be displayed with pagination and correct paging values
        And It should not be possible to move between pages accordingly
        And It should not be possible to add page numbers in the pagination text box

    Scenario: When the user clicks on the Call to Action button he can see the relevant options
        Given The user navigates to TPA home page
        When The importers option is selected on left menu
        Then The importers page should be displayed
        Then The user clicks on all the Call to Action buttons and Enable, Disable and Run options will be displayed
        

    Scenario: The user is able to disable an enabled importer
        Given The user navigates to TPA home landing page
        When The importers option is selected on the menu
        Then The importers page should be displayed properly
        Then The user has clicked on the Call to Action button under an enabled importer and disables the importer
        
       
    Scenario: The user is not able to disable an already disabled importer
        Given The user navigates to TPA home dashboard page
        When The importers option is selected on the main menu
        Then The importers page should be displayed successfully
        Then The user has clicked on the Call to Action icon under a disabled importer and the Disable option is not visible
       
    Scenario: The user is able to enable a disabled importer
        Given The user navigates to TPA dashboard home page
        When The importers option is selected on the context menu 
        Then The importers page should be displayed appropreiately 
        Then The user has clicked on the Kebab icon under a disabled importer and enables it
        Then There should be a label of Scheduled or progress bar displayed under the specific importer

    Scenario: The user can run an enabled importer
        Given The user navigates to TPA home dashboard landing page
        When The importers option is selected on left context menu
        Then The importers page should be displayed as designed
        Then The user has clicked on the Call to Action icon under an enabled importer and then selects Run
        Then There should be a confirmation message and a progress bar displayed under the relevant importer

    
    

    