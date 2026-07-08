Feature: Search - Verify No Upload Advisory Button
	As a Devsecops Engineer
	I want to verify that Upload Advisory button does not appear on Search page
	So that the Search page only shows appropriate actions

# Related to TC-3248: Upload Advisory button should not appear on Search page
Scenario: Verify Upload Advisory button is not displayed on Search page
	When User navigates to Search results page
	And Clicks on Advisories tab
	Then "Upload Advisory" button should not be displayed
