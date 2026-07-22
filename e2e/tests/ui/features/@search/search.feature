Feature: Search Page
	As a user
	I want the Search page to only display relevant actions
	So that I am not confused by buttons that don't apply to the current context

# Related to TC-3248: Upload Advisory button should not appear on Search page
Scenario: Verify Upload Advisory button is not displayed on Search page
	When User navigates to "Search" page
	And User clicks on "Advisories" tab
	Then "Upload Advisory" button should not be displayed
