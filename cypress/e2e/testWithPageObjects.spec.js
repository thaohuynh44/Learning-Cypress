import { navigateTo } from "../support/page_objects/navigationPage";
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { onDatepickerPage } from "../support/page_objects/DatepickerPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

describe("Test with Page Objects", () => {
  beforeEach("Open application", () => {
    cy.visit("/");
  });

  it("Verify navigations across the pages", () => {
    navigateTo.formLayoutsPage();
    navigateTo.datePickerPage();
    navigateTo.smartTablePage();
    navigateTo.toolTipPage();
    navigateTo.toasterPage();
  });

  it.only("should submit Inline and Basic form and select tomorrow date in the calendar", () => {
    navigateTo.formLayoutsPage();
    onFormLayoutsPage.submitInlineFormWithNameAndEmail("Thao", "test@test.com");
    onFormLayoutsPage.submitBasicFormWithEmailAndPassword(
      "test@test.com",
      "password"
    );

    navigateTo.datePickerPage();
    onDatepickerPage.selectCommonDatepickerFromToday(3);
    onDatepickerPage.selectDatepickerWithRangeFromToday(7, 11);

    navigateTo.smartTablePage();
    onSmartTablePage.addNewRecordWithFirstAndLastName("Thao", "Huynh");
    onSmartTablePage.updateAgeByFirstName("Thao", "24");
    onSmartTablePage.deleteRowByIndex(1);
  });
});
