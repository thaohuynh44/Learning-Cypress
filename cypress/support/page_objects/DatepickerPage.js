function selectDayFromCurrent(day) {
  let date = new Date();
  date.setDate(date.getDate() + day);
  let futureDate = date.getDate();
  let futureMonth = date.toLocaleDateString("en-US", { month: "short" });
  let futureYear = date.getFullYear();
  let dateToAssert = `${futureMonth} ${futureDate}, ${futureYear}`;
  cy.get("nb-calendar-navigation")
    .invoke("attr", "ng-reflect-date")
    .then((dateAttribute) => {
      if (
        !dateAttribute.includes(futureMonth) ||
        !dateAttribute.includes(futureYear)
      ) {
        cy.get("nb-calendar-pageable-navigation")
          .find('[ng-reflect-icon="chevron-right-outline"]')
          .click();
        selectDayFromCurrent(day);
      } else {
        cy.get(".day-cell").not(".bounding-month").contains(futureDate).click();
      }
    });
  return dateToAssert;
}

export class DatepickerPage {
  selectCommonDatepickerFromToday(dayFromToday) {
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        const dateToAssert = selectDayFromCurrent(dayFromToday);
        cy.wrap(input).invoke("prop", "value").should("contain", dateToAssert);
        cy.wrap(input).should("have.value", dateToAssert);
      });
  }

  selectDatepickerWithRangeFromToday(firstDay, secondDay) {
    cy.contains("nb-card", "Datepicker With Range")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        let dateAssertFirst = selectDayFromCurrent(firstDay);
        let dateToAssertSecond = selectDayFromCurrent(secondDay);
        const finalDate = dateAssertFirst + " - " + dateToAssertSecond;
        cy.wrap(input).invoke("prop", "value").should("contain", finalDate);
        cy.wrap(input).should("have.value", finalDate);
      });
  }
}

export const onDatepickerPage = new DatepickerPage();
