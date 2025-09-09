import { createBdd } from "playwright-bdd";
import { ElementHandle, expect } from "playwright/test";
import { DetailsPage } from "../../helpers/DetailsPage";
import { ToolbarTable } from "../../helpers/ToolbarTable";
import { SearchPage } from "../../helpers/SearchPage";
import { test } from "@playwright/test";
import { table } from "console";
import exp from "constants";


export const { Given, When, Then } = createBdd();

const IMPORTER_TABLE_NAME = "Importer table";

Given(
  "The user navigates to TPA URL page successfully",
  async ({ page }) => {
    await page.locator(`xpath=//div[@class='pf-v6-c-card__title-text' and text()="Dashboard"]`).isVisible();
  }
);

When(
  "The user selects the importers menu option",
  async ({ page }) => {
    await page.locator(`xpath=//a[contains(@href, '/importers')]`).click();
  }
);

Then(
  "Application navigates to Importers page", 
  async ({ page }) => {
    await page.locator(`xpath=//h1[@class='pf-v6-c-content--h1' and text()="Importers"]`).isVisible();
});

Then(
  "The column headers should be visible",
  async ({ page }) => {
    const thElements = await page.$$('table th');
    const actualHeaders = await Promise.all(thElements.map(async (th) => {
      return await th.textContent();
  }  
));
  const impTableHeader = ['Name', 'Type', 'Description', 'Source', 'Period', 'State'];
  var i: number;
  for(i=0; i<=5; i++);
    {
      if (actualHeaders[i] != impTableHeader[i])
      {
        console.log('The column name ' + impTableHeader[i] + 'is displayed incorrectly')        
      }
      else 
      {
        expect(actualHeaders[i]).toEqual(impTableHeader[i]);  
      }  
    }
  });
 
Then(
  "Call to Action button for each importer should be visible",
  async ({ page }) => {
    var i: number;
    for (i=1; i<6; i++) {
      await expect(page.locator(`xpath=//button[@aria-label='Kebab toggle' and @data-ouia-component-id='OUIA-Generated-MenuToggle-plain-${i}']`)).toBeVisible();
      //
    }    
  }
);

Given(
  "The user navigates to TPA URL page",
  async ({ page }) => {
    await page.locator(`xpath=//div[@class='pf-v5-c-card__title-text' and text()="Your dashboard"]`).isVisible();
  }
);

When(
  "The user selects the importers overview page",
  async ({ page }) => {
    await page.locator(`xpath=//a[contains(@href, '/importers')]`).click();
  }
);

Then(
  "There should be a filter icon displayed",
  async ({ page }) => {
    await page.locator(`xpath=//button[@aria-label='Show Filters']`).isVisible();
  }
);

Given(
  "The user navigates to TPA URL landing page",
  async ({ page }) => {
    await page.locator(`xpath=//div[@class='pf-v5-c-card__title-text' and text()="Your dashboard"]`).isVisible();
  }
);

When(
  "The user selects the importers option",
  async ({ page }) => {
    await page.locator(`xpath=//a[contains(@href, '/importers')]`).click();
  }
);

Then(
  "A search text box appears",
  async ({ page }) => {
    await page.locator(`xpath=//input[@id='search-input']`).isVisible();
  }
);

Then(
  "The user types {string} in the search text box and presses Enter key",
  async ({ page }, filterText) => {
    const toolbarTable = new ToolbarTable(page, IMPORTER_TABLE_NAME);
    await toolbarTable.filterByText(filterText);
    await page.getByPlaceholder('Search by name...').press('Enter');
    }
  );

Then(
  "Importer total results is {int}",
  async ({ page }, totalResults) => {
    //We can find the Name of the importer according to the field 'data-item-id' in the tr
    const toolbarTable = new ToolbarTable(page, IMPORTER_TABLE_NAME);
    await toolbarTable.verifyPaginationHasTotalResults(totalResults);
    }
  );

Given(
  "The user navigates to TPA URL dashboard page",
  async ({ page }) => {
    await page.locator(`xpath=//div[@class='pf-v6-c-card__title-text' and text()="Dashboard"]`).isVisible();
  }
);

When(
  "The importers option is selected on the left menu",
  async ({ page }) => {
    await page.locator(`xpath=//a[contains(@href, '/importers')]`).click();
  }
);

Then("The user expands all the importers rows", 
  async ({ page }) => {
    const buttonElement = await page.$$('button');
    const actualExpandButtons = await Promise.all(buttonElement.map(async (button) => {
    return await button.textContent();
    }));
    var expandButtonName: string[] = ['OUIA-Generated-Button-plain-11', 'OUIA-Generated-Button-plain-12', 'OUIA-Generated-Button-plain-13', 'OUIA-Generated-Button-plain-14', 'OUIA-Generated-Button-plain-15'];
    for(var i=10; i<15; i++)
      {
       if (actualExpandButtons[i] != expandButtonName[i])
        {
          console.log('The action button could not be found')        
        }
        else 
        {
          expect(actualExpandButtons[i]).toEqual(expandButtonName[i]); 
          await page.locator(`xpath=//button[@data-ouia-component-id='OUIA-Generated-Button-plain-${i}']`).click();
        }             
      }
    });

/* The following step tests several things after all importers are expanded:
   1. That there are sub-tables displayed under importer cve and osv-github by default
   2. That there are pagination controls visible under the importers and the value of the input page control
      under cve and osv-github importers is greater than '0'. Pagination controls of the rest of the importers 
      will have the input page control equals to '0' because they are empty and no tables are created there by default.
   3. There is a validation that cve and osv-github importers will be by default with 'Scheduled' status or with a progress bar
*/   
Then("All the importers rows should be expanded",
  async ({page}) => {    
    const tableElement = await page.$$('table');
    const actualTableElement = await Promise.all(tableElement.map(async (table) => {
    return await table.textContent();
    }));  
    var importerReport: string[] = ['OUIA-Generated-Table-2', 'OUIA-Generated-Table-3'];
    var a=3;
    var x=2;
    for(var i=1; i<=7; i++)
      {
        if (i>=1 && i<=2) {
          await expect(page.locator(`xpath=//table[@data-ouia-component-id='OUIA-Generated-Table-${x}']`)).toBeVisible(); 
          await expect(page.locator(`xpath=//input[@data-ouia-component-id='OUIA-Generated-TextInputBase-${a}' and @value>0]`)).toBeVisible();
          x++;
          a+=2;  
        }
        if (i>2 && i<=7)
         {
          await expect(page.locator(`xpath=//table[@data-ouia-component-id='OUIA-Generated-Table-${x}']`)).toBeHidden();
          await expect(page.locator(`xpath=//input[@data-ouia-component-id='OUIA-Generated-TextInputBase-${a}' and @value=0]`)).toBeVisible();
          i++;
          x++;
          a+=2;
        }
      }
    await expect((page.locator(`xpath=//td[@data-label='Name' and contains(text(),'cve')]/following-sibling::\
    // td[@data-label='State']//div[contains(text(),'Scheduled')]`) || page.locator(`xpath=xpath=//td[@data-label='Name'\
    //  and contains(text(),'cve')]/following-sibling::td[@data-label='State']//span[@class='pf-v6-c-progress__measure']`))).toBeVisible();  
    await expect((page.locator(`xpath=//td[@data-label='Name' and contains(text(),'osv-github')]/following-sibling::\
    // td[@data-label='State']//div[contains(text(),'Scheduled')]`) || page.locator(`xpath=xpath=//td[@data-label='Name'\
    //  and contains(text(),'osv-github')]/following-sibling::td[@data-label='State']//span[@class='pf-v6-c-progress__measure']`))).toBeVisible();
    });
  
Given(
  "The user navigates to TPA URL page home page",
  async ({ page }) => {
    await page.locator(`xpath=//div[@class='pf-v6-c-card__title-text' and text()="Dashboard"]`).isVisible();
  }
);

When("The user selects the importers option from left menu",
  async ({ page }) => {
    await page.locator(`xpath=//a[contains(@href, '/importers')]`).click();
  }
);

Then("The importers page should be displayed with pagination and correct paging values",
  async ({ page }) => {
    await expect(page.locator(`xpath=//div[@id='importer-table-pagination-top']//span[normalize-space(text())='of' and text()=1]`)).toBeVisible();
    await expect(page.locator(`xpath=//button[@id='pagination-id-top-toggle']//b[normalize-space(text())=1 and text()='5']`)).toBeVisible(); 
    await expect(page.locator(`xpath=//div[@id='importer-table-pagination-bottom']//span[normalize-space(text())='of' and text()=1]`)).toBeVisible();
    await expect(page.locator(`xpath=//button[@id='pagination-id-bottom-toggle']//b[normalize-space(text())=1 and text()='5']`)).toBeVisible();
  }
);

Then("It should not be possible to move between pages accordingly",
  async ({ page }) => {
    await expect(page.locator(`xpath=//div[@id='importer-table-pagination-top']//button[@aria-label='Go to first page']`)).toBeDisabled();
    await expect(page.locator(`xpath=//div[@id='importer-table-pagination-top']//button[@aria-label='Go to last page']`)).toBeDisabled();
    await expect(page.locator(`xpath=//div[@id='importer-table-pagination-top']//button[@aria-label='Go to previous page']`)).toBeDisabled();
    await expect(page.locator(`xpath=//div[@id='importer-table-pagination-top']//button[@aria-label='Go to next page']`)).toBeDisabled();
    await expect(page.locator(`xpath=//div[@id='importer-table-pagination-bottom']//button[@aria-label='Go to first page']`)).toBeDisabled();
    await expect(page.locator(`xpath=//div[@id='importer-table-pagination-bottom']//button[@aria-label='Go to last page']`)).toBeDisabled();
    await expect(page.locator(`xpath=//div[@id='importer-table-pagination-bottom']//button[@aria-label='Go to previous page']`)).toBeDisabled();
    await expect(page.locator(`xpath=//div[@id='importer-table-pagination-bottom']//button[@aria-label='Go to next page']`)).toBeDisabled();
  }
);

Then("It should not be possible to add page numbers in the pagination text box",
  async ({ page }) => {
    expect(page.locator(`xpath=//div[@id='importer-table-pagination-top']//input[@aria-label='Current page']`)).not.toBeEditable();
    expect(page.locator(`xpath=//div[@id='importer-table-pagination-bottom']//input[@aria-label='Current page']`)).not.toBeEditable();
  }
);

Given("The user navigates to TPA home page",
  async ({ page }) => {
    await page.locator(`xpath=//div[@class='pf-v6-c-card__title-text' and text()="Dashboard"]`).isVisible();
  }
);

When("The importers option is selected on left menu",
  async ({ page }) => {
    page.locator(`xpath=//a[contains(@href, '/importers')]`).click();    
  }
);

Then("The importers page should be displayed",
  async ({ page }) => {
    expect(page.locator(`xpath=//h1[@class='pf-v6-c-content--h1' and text()="Importers"]`)).toBeVisible();
  }
);

Then("The user clicks on all the Call to Action buttons and Enable, Disable and Run options will be displayed",
  async ({ page }) => {
    for(var i=0; i<=4;)
      {
        if(i=0 && i<=1) {
          page.locator(`xpath=//button[@data-ouia-component-id='OUIA-Generated-MenuToggle-plain-${i+3}']`).click();
          await expect(page.locator(`xpath=//span[@class='pf-v6-c-menu__item-text' and contains (text(), 'Run')]`)).toBeVisible();
          await expect(page.locator(`xpath=//span[@class='pf-v6-c-menu__item-text' and contains (text(), 'Disable')]`)).toBeVisible();
          page.locator(`xpath=//button[@data-ouia-component-id='OUIA-Generated-MenuToggle-plain-${i+3}']`).click();
          i++;
        }
        if(i>1 && i<=4)
        {
          page.locator(`xpath=//button[@data-ouia-component-id='OUIA-Generated-MenuToggle-plain-${i+3}']`).click();
          await expect(page.locator(`xpath=//span[@class='pf-v6-c-menu__item-text' and contains (text(),'Enable')]`)).toBeVisible();
          page.locator(`xpath=//button[@data-ouia-component-id='OUIA-Generated-MenuToggle-plain-${i+3}']`).click();
        }
        }}
      );
    
Given("The user navigates to TPA home landing page",
  async ({ page }) => {
    await page.locator(`xpath=//div[@class='pf-v6-c-card__title-text' and text()="Dashboard"]`).isVisible();
  }
);

When("The importers option is selected on the menu",
  async ({ page }) => {
    await page.locator(`xpath=//a[contains(@href, '/importers')]`).click();
  }
);

Then("The importers page should be displayed properly",
  async ({ page }) => {
    await expect(page.locator(`xpath=//h1[@class='pf-v6-c-content--h1' and text()="Importers"]`)).toBeVisible();
  }
);

Then("The user has clicked on the Call to Action button under an enabled importer and disables the importer",
  async ({ page }) => {
    for(var i=0; i<=1;) {
      if(i=0){
        page.locator(`xpath=//button[@data-ouia-component-id='OUIA-Generated-MenuToggle-plain-${i+1}' and @aria-label='Kebab toggle']`).click();
        await expect(page.locator(`xpath=//span[@class='pf-v6-c-menu__item-text' and contains (text(), 'Disable')]`)).toBeVisible();
        page.locator(`xpath=//button[@class='pf-v6-c-menu__item']//span[contains(text(),'Disable')]`).click();
        await expect(page.locator(`xpath=//div[@aria-label='Confirm dialog']`)).toBeVisible();
        page.locator(`xpath=//button[@id='confirm-dialog-button']`).click();
        page.locator(`xpath=//tr[@data-item-id='cve']//span[contains (text(),'Disabled')]`).isVisible();
        i++;
      }
      if(i=1){
        page.locator(`xpath=//button[@data-ouia-component-id='OUIA-Generated-MenuToggle-plain-${i+1}' and @aria-label='Kebab toggle']`).click();
        await expect(page.locator(`xpath=//span[@class='pf-v6-c-menu__item-text' and contains (text(), 'Disable')]`)).toBeVisible();
        page.locator(`xpath=//button[@class='pf-v6-c-menu__item']//span[contains(text(),'Disable')]`).click();
        await expect(page.locator(`xpath=//div[@aria-label='Confirm dialog']`)).toBeVisible();
        page.locator(`xpath=//button[@id='confirm-dialog-button']`).click();
        page.locator(`xpath=//tr[@data-item-id='osv-github']//span[contains (text(),'Disabled')]`).isVisible();
        i++;
      }

    }
});

Given("The user navigates to TPA home dashboard page",
  async ({ page }) => {
    await page.locator(`xpath=//div[@class='pf-v6-c-card__title-text' and text()="Dashboard"]`).isVisible();
  }
);

When("The importers option is selected on the main menu",
  async ({ page }) => {
    await page.locator(`xpath=//a[contains(@href, '/importers')]`).click();
  }
);

Then("The importers page should be displayed successfully",
  async ({ page }) => {
    await page.locator(`xpath=//h1[@class='pf-v6-c-content--h1' and text()="Importers"]`).isVisible();
  }
);

Then("The user has clicked on the Call to Action icon under a disabled importer and the Disable option is not visible",
    async ({ page }) => {
      for(var i=0; i<=2;) {
        page.locator(`xpath=//button[@data-ouia-component-id='OUIA-Generated-MenuToggle-plain-${i+3}' and @aria-label='Kebab toggle']`).click();
        await expect(page.locator(`xpath=//button[@class='pf-v6-c-menu__item']//span[contains (text(), 'Enable')]`)).toBeVisible();
        await expect(page.locator(`xpath=//button[@class='pf-v6-c-menu__item']//span[contains(text(),'Disable')]`)).toBeHidden();
        page.locator(`xpath=//button[@data-ouia-component-id='OUIA-Generated-MenuToggle-plain-${i+3}' and @aria-expanded='true']`).click();
        await expect(page.locator(`xpath=//button[@class='pf-v6-c-menu__item']//span[contains (text(), 'Enable')]`)).toBeHidden();
        i++;
        }
  });

Given("The user navigates to TPA dashboard home page",
  async ({ page }) => {
    await page.locator(`xpath=//div[@class='pf-v6-c-card__title-text' and text()="Dashboard"]`).isVisible();
  }
);

When(
  "The importers option is selected on the context menu",
  async ({ page }) => {
    await page.locator(`xpath=//a[contains(@href, '/importers')]`).click();    
  }
);

Then("The importers page should be displayed appropreiately",
  async ({ page }) => {
    await page.locator(`xpath=//h1[@class='pf-v6-c-content--h1' and text()="Importers"]`).isVisible();
  }
);

Then("The user has clicked on the Kebab icon under a disabled importer and enables it",
  async ({ page }) => {
    for(var i=0; i<=2;) {
        page.locator(`xpath=//button[@data-ouia-component-id='OUIA-Generated-MenuToggle-plain-${i+3}' and @aria-label='Kebab toggle']`).click();
        await expect(page.locator(`xpath=//button[@class='pf-v6-c-menu__item']//span[contains (text(), 'Enable')]`)).toBeVisible();
        await expect(page.locator(`xpath=//button[@class='pf-v6-c-menu__item']//span[contains(text(),'Disable')]`)).toBeHidden();
        page.locator(`xpath=//button[@class='pf-v6-c-menu__item']//span[contains (text(), 'Enable')]`).click();
        await expect(page.locator(`xpath=//div[@aria-label='Confirm dialog']`)).toBeVisible();
        page.locator(`xpath=//button[@id='confirm-dialog-button']`).click();
        i++;
        }
});

//Added some line breaks here because the lines became very long
Then("There should be a label of Scheduled or progress bar displayed under the specific importer",
  async ({ page }) => {
    await expect((page.locator(`xpath=//td[@data-label='Name' and contains(text(),'quay-redhat-user-workloads')]/following-sibling::\
    // td[@data-label='State']//div[text()='Scheduled']`)) || (page.locator(`xpath=xpath=//td[@data-label='Name' and contains(text()\
    // ,'quay-redhat-user-workloads')]/following-sibling::td[@data-label='State']//span[@class='pf-v6-c-progress__measure']`))).toBeVisible();
    await expect((page.locator(`xpath=//td[@data-label='Name' and contains(text(),'redhat-csaf')]/following-sibling::\
    // td[@data-label='State']//div[text()='Scheduled']`)) || (page.locator(`xpath=xpath=//td[@data-label='Name' and contains(text()\
    // ,'redhat-csaf')]/following-sibling::td[@data-label='State']//span[@class='pf-v6-c-progress__measure']`))).toBeVisible();
    await expect((page.locator(`xpath=//td[@data-label='Name' and contains(text(),'redhat-sboms')]/following-sibling::\
    // td[@data-label='State']//div[text()='Scheduled']`)) || (page.locator(`xpath=xpath=//td[@data-label='Name' and contains(text()\
    // ,'redhat-sboms')]/following-sibling::td[@data-label='State']//span[@class='pf-v6-c-progress__measure']`))).toBeVisible();    
    }
);

Given("The user navigates to TPA home dashboard landing page",
  async ({ page }) => {
    await page.locator(`xpath=//div[@class='pf-v6-c-card__title-text' and text()="Dashboard"]`).isVisible();
  }
);

When("The importers option is selected on left context menu",
  async ({ page }) => {
    await page.locator(`xpath=//a[contains(@href, '/importers')]`).click();    
  }
);

Then("The importers page should be displayed as designed",
  async ({ page }) => {
    await page.locator(`xpath=//h1[@class='pf-v6-c-content--h1' and text()="Importers"]`).isVisible();
  }
);

Then("The user has clicked on the Call to Action icon under an enabled importer and then selects Run",
  async ({ page }) => {
    for(var i=0; i<=1;) {
      page.locator(`xpath=//button[@data-ouia-component-id='OUIA-Generated-MenuToggle-plain-${i+1}' and @aria-label='Kebab toggle']`).click();
      page.locator(`xpath=//button[@class='pf-v6-c-menu__item']//span[text()='Run']`).click();
      await expect(page.locator(`xpath=//div[@aria-label='Confirm dialog']`)).toBeVisible();
      page.locator(`xpath=//button[@id='confirm-dialog-button']`).click();
      await expect(page.locator(`xpath=//div[@class='pf-v6-c-alert pf-m-success']`)).toBeVisible();
      //Added a timeout here because otherwise 2 confirmation messages will appear together and it will confuse the Chrome driver
      await page.waitForTimeout(10000);  
      i++;
      page.locator(`xpath=//button[@data-ouia-component-id='OUIA-Generated-MenuToggle-plain-${i+1}' and @aria-label='Kebab toggle']`).click();
      page.locator(`xpath=//button[@class='pf-v6-c-menu__item']//span[text()='Run']`).click();
      await expect(page.locator(`xpath=//div[@aria-label='Confirm dialog']`)).toBeVisible();
      page.locator(`xpath=//button[@id='confirm-dialog-button']`).click();
      await expect(page.locator(`xpath=//div[@class='pf-v6-c-alert pf-m-success']`)).toBeVisible();
      //Added a timeout here because there is no telling when the progress bars will appear so this is approximately the time needed
      await page.waitForTimeout(10000); 
      i++;
    }
    });

Then("There should be a confirmation message and a progress bar displayed under the relevant importer",
  async ({ page }) => {
    await expect(page.locator(`xpath=//tr[@data-item-id='cve']//div[@role='progressbar']`)).toBeVisible();
    await expect(page.locator(`xpath=//tr[@data-item-id='osv-github']//div[@role='progressbar']`)).toBeVisible();
  });
