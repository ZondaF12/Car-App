export interface MotData {
    registration: string;
    make: string;
    model: string;
    firstUsedDate: string;
    fuelType: string;
    primaryColour: string;
    motTests: MotTest[];
}

export interface MotTest {
    completedDate: string;
    testResult: TestResult;
    expiryDate?: string;
    odometerValue: string;
    odometerUnit: OdometerUnit;
    motTestNumber: string;
    rfrAndComments: RfrAndComment[];
}

export enum OdometerUnit {
    Mi = "mi",
}

export interface RfrAndComment {
    text: string;
    type: Type;
}

export enum Type {
    Advisory = "ADVISORY",
    Fail = "FAIL",
    Minor = "MINOR",
    Prs = "PRS",
}

export enum TestResult {
    Failed = "FAILED",
    Passed = "PASSED",
}
