Feature: Page Title Updates
	As a user
	I want the browser page title to change based on the page I'm viewing
	So that I can distinguish between multiple tabs and use browser history effectively

# Related to TC-3370: Page title does not change based on viewed page
# The fix ensures page titles update when navigating to different pages
Scenario: Verify page title changes when navigating to Search page
	When User navigates to Search results page
	Then the page title should contain "Search"

# Note: Tabs within the Search page all show "Search" in the title
# because you're still on the Search page - just viewing different result types
Scenario: Verify page title remains "Search" when switching between tabs
	When User navigates to Search results page
	Then the page title should contain "Search"
	When Clicks on Advisories tab
	Then the page title should contain "Search"
	When User clicks on "SBOMs" tab
	Then the page title should contain "Search"
	When User clicks on "Packages" tab
	Then the page title should contain "Search"
