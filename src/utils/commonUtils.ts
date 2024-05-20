import { faker } from "@faker-js/faker/locale/en_US";
import { error } from "node:console";
import fs from "node:fs";

const getEnvironment = (): string => {
    return process.env.env || "dev";
}

let formatDate = (date: Date): string => {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
}

export let calculateDate = (offsetInput: string): string => {
    const offset = parseInt(offsetInput);

    if (isNaN(offset)) {
        return "Invalid input. Please provide a numeric offset like '+6' or '-6'.";
    }

    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + offset);
    return formatDate(currentDate);
}

export let getEpochTime = (date: string) => {
    let dateParts = date.split("/");
    let month = parseInt(dateParts[0]) - 1; // Months are zero-based in JavaScript
    let day = parseInt(dateParts[1]);
    let year = parseInt(dateParts[2]);

    // Create a new Date object
    let myDate = new Date(year, month, day);

    // Get the Epoch time in milliseconds
    let epochTime = myDate.getTime();

    // Convert to seconds (optional, depending on your needs)
    let epochTimeInSeconds = Math.floor(epochTime);

    // Convert to string
    return epochTimeInSeconds.toString();
}

export const getRandomAlphaNumericString = (length: number): string => {
    return faker.string.alphanumeric(length);
}

const getRandomAlphabeticString = (length: number): string => {
    return faker.string.alpha(length);
}

export const getRandomPhoneNumber = (): string => {
    return `(${String(faker.number.int()).substring(0, 3)}) ${String(faker.number.int()).substring(0, 3)}-${String(faker.number.int()).substring(0, 4)}`;
}

export const getRandomNumber=(length:number)=>{
    return faker.string.numeric(length)
    
}

export const updateStat = () => {
    let agencyFile: string = "";
    let accountFile: string = "";
    let policyFile: string = "";

    try {
        agencyFile = fs.readFileSync(`${process.cwd()}/resources/api/agency/CreatedAgencyDataFromAPI.json`, { encoding: "utf-8" });
        accountFile = fs.readFileSync(`${process.cwd()}/resources/api/account/CreatedAccountDataFromAPI.json`, { encoding: "utf-8" });
        policyFile = fs.readFileSync(`${process.cwd()}/resources/api/policy/CreatedPolicyDataFromAPI.json`, { encoding: "utf-8" });

    } catch (error) {
        console.log('Unable to Read File: ', error);
    }

    const regex = new RegExp("timeStamp", "gi");
    const agencyMatches = agencyFile.match(regex);
    const accountMatches = accountFile.match(regex);
    const policyMatches = policyFile.match(regex);

    const data = {
        "agencyCount": agencyMatches ? agencyMatches.length : 0,
        "accountCount": accountMatches ? accountMatches.length : 0,
        "policyCount": policyMatches ? policyMatches.length : 0
    }

    try {
        fs.writeFileSync("stats.json", `${JSON.stringify(data, null, 2)}\n\n`);
    } catch (error) {
        console.log("Failed to write: ", error);
    }

    return data;
}

let getRandomElementFromArray = (arr: any[]) => {
    // Generate a random index within the array length
    const randomIndex = Math.floor(Math.random() * arr.length);

    // Return the element at the random index
    return arr[randomIndex];
}

let readFile = (filePath: string): string => {
    let fileContent: string = "";
    try {
        fileContent = fs.readFileSync(filePath, { encoding: "utf8" });
    } catch (error) {
        console.log("Not able to read file: ", error)
    }
    return fileContent;
}

export const commonUtils = {
    getEnvironment,
    updateStat,
    formatDate,
    calculateDate,
    getEpochTime,
    getRandomAlphabeticString,
    getRandomAlphaNumericString,
    getRandomPhoneNumber,
    getRandomElementFromArray,
    readFile
}