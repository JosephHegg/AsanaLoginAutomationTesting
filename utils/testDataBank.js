import * as textBank from './fieldValidationTextValues.js';

export const TEST_CASE_ID_IDENTIFIER = "id";
export const TEST_CASE_NAME_IDENTIFIER = "name";
export const TEST_CASE_LEFTNAV_IDENTIFIER = "leftNav";
export const TEST_CASE_COLUMN_IDENTIFIER = "column";
export const TEST_CASE_TASK_CARD_TITLE_IDENTIFIER = "card_title";
export const TEST_CASE_TAGS_IDENTIFIER = "tags";
export const TEST_CASE_BOARD_CARD_TASK_ID = "data-task-id";

export const testCases = [
    {
        TEST_CASE_ID_IDENTIFIER: 1,
        TEST_CASE_NAME_IDENTIFIER: "Test Case 1",
        TEST_CASE_LEFTNAV_IDENTIFIER: textBank.CROSS_FUNCTIONAL_PROJECT,
        TEST_CASE_COLUMN_IDENTIFIER: textBank.TO_DO_COLUMN,
        TEST_CASE_TASK_CARD_TITLE_IDENTIFIER: textBank.DRAFT_PROJECT_TASK,
        TEST_CASE_TAGS_IDENTIFIER: [
            textBank.NON_PRIORITY_TAG,
            textBank.ON_TRACK_TAG
        ],
        TEST_CASE_BOARD_CARD_TASK_ID: "1205367008167080"
    },
    // {
    //     TEST_CASE_ID_IDENTIFIER: 2,
    //     TEST_CASE_NAME_IDENTIFIER: "Test Case 2",
    //     TEST_CASE_LEFTNAV_IDENTIFIER: textBank.CROSS_FUNCTIONAL_PROJECT,
    //     TEST_CASE_COLUMN_IDENTIFIER: textBank.TO_DO_COLUMN,
    //     TEST_CASE_TASK_CARD_TITLE_IDENTIFIER: textBank.SCHEDULE_KICKOFF_TASK,
    //     TEST_CASE_TAGS_IDENTIFIER: [
    //         textBank.MEDIUM_TAG,
    //         textBank.AT_RISK_TAG
    //     ],
    //     TEST_CASE_BOARD_CARD_TASK_ID: "1206802979202482"
    // },
    // {
    //     TEST_CASE_ID_IDENTIFIER: 3,
    //     TEST_CASE_NAME_IDENTIFIER: "Test Case 3",
    //     TEST_CASE_LEFTNAV_IDENTIFIER: textBank.CROSS_FUNCTIONAL_PROJECT,
    //     TEST_CASE_COLUMN_IDENTIFIER: textBank.TO_DO_COLUMN,
    //     TEST_CASE_TASK_CARD_TITLE_IDENTIFIER: textBank.SHARE_TIMELINE_TASK,
    //     TEST_CASE_TAGS_IDENTIFIER: [
    //         textBank.HIGH_TAG,
    //         textBank.OFF_TRACK_TAG
    //     ],
    //     TEST_CASE_BOARD_CARD_TASK_ID: "1205367008167084"
    // },
    // {
    //     TEST_CASE_ID_IDENTIFIER: 4,
    //     TEST_CASE_NAME_IDENTIFIER: "Test Case 4",
    //     TEST_CASE_LEFTNAV_IDENTIFIER: textBank.WORK_REQUESTS,
    //     TEST_CASE_COLUMN_IDENTIFIER: textBank.NEW_REQUEST_COLUMN,
    //     TEST_CASE_TASK_CARD_TITLE_IDENTIFIER: textBank.LAPTOP_SETUP_TASK,
    //     TEST_CASE_TAGS_IDENTIFIER: [
    //         textBank.MEDIUM_PRIORITY_TAG,
    //         textBank.LOW_EFFORT_TAG,
    //         textBank.NEW_HARDWARE_TAG,
    //         textBank.NOT_STARTED_TAG
    //     ],
    //     TEST_CASE_BOARD_CARD_TASK_ID: "1205367008167113"

    // },
    // {
    //     TEST_CASE_ID_IDENTIFIER: 5,
    //     TEST_CASE_NAME_IDENTIFIER: "Test Case 5",
    //     TEST_CASE_LEFTNAV_IDENTIFIER: textBank.WORK_REQUESTS,
    //     TEST_CASE_COLUMN_IDENTIFIER: textBank.IN_PROGRESS_COLUMN,
    //     TEST_CASE_TASK_CARD_TITLE_IDENTIFIER: textBank.PASSWORD_NOT_WORKING_TASK,
    //     TEST_CASE_TAGS_IDENTIFIER: [
    //         textBank.LOW_PRIORITY_TAG,
    //         textBank.LOW_EFFORT_TAG,
    //         textBank.PASSWORD_RESET_TAG,
    //         textBank.WAITING_TAG
    //     ],
    //     TEST_CASE_BOARD_CARD_TASK_ID: "1205367008167114"
    // },
    // {
    //     TEST_CASE_ID_IDENTIFIER: 6,
    //     TEST_CASE_NAME_IDENTIFIER: "Test Case 6",
    //     TEST_CASE_LEFTNAV_IDENTIFIER: textBank.WORK_REQUESTS,
    //     TEST_CASE_COLUMN_IDENTIFIER: textBank.COMPLETED_COLUMN,
    //     TEST_CASE_TASK_CARD_TITLE_IDENTIFIER: textBank.NEW_KEYCARD_DANIELA_TASK,
    //     TEST_CASE_TAGS_IDENTIFIER: [
    //         textBank.HIGH_PRIORITY_TAG,
    //         textBank.LOW_EFFORT_TAG,
    //         textBank.NEW_HARDWARE_TAG,
    //         textBank.DONE_TAG
    //     ],
    //     TEST_CASE_BOARD_CARD_TASK_ID: "1205367008167115"
    // }
];