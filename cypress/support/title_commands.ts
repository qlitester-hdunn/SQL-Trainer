import { titles, PrismaClient } from "@prisma/client"
import cypress from "cypress";

type TitleData = {
    emp_no: number,
    title: string,
    from_date: Date,
    to_date?: Date,
}

Cypress.Commands.add("addTitle", (titleData: titles) => {
    return cy.task("addTitle", titleData)
});

Cypress.Commands.add("findTitle", (empNo: titles) => {
    return cy.task("findTitle", empNo)
});

Cypress.Commands.add("updateTitle", (titleData: titles) => {
    return cy.task("updateTitle", titleData)
});

Cypress.Commands.add("getLatestAddedTitleEmpNo", () => {
    return cy.task("getLatestAddedTitleEmpNo")
});

Cypress.Commands.add("deleteTitle", (empNo: titles) => {
    return cy.task("deleteTitle", empNo)
});