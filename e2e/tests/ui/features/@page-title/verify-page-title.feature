Feature: Page Title Updates
	As a user
	I want the browser page title to change based on the page I'm viewing
	So that I can distinguish between multiple tabs and use browser history effectively

# Related to TC-3370: Page title does not change based on viewed page
# The ensures page titles update when navigating to different pages

# Verify page titles for main application pages
Scenario Outline: Verify page title changes when navigating to <page> page
	When User navigates to "<page>" page
	Then the page title should contain "<expectedTitle>"

	Examples:
		| page            | expectedTitle   |
		| Dashboard       | Home            |
		| Search          | Search          |
		| All SBOMs       | SBOMs           |
		| Advisories      | Advisories      |
		| Vulnerabilities | Vulnerabilities |
		| Packages        | Packages        |
		| Importers       | Importers       |

# Note: Tabs within the Search page all show "Search" in the title
# because you're still on the Search page - just viewing different result types
Scenario Outline: Verify page title remains "Search" when switching to <tabName> tab
	When User navigates to "Search" page
	And User clicks on "<tabName>" tab
	Then the page title should contain "Search"

	Examples:
		| tabName         |
		| Advisories      |
		| SBOMs           |
		| Packages        |
		| Vulnerabilities |
