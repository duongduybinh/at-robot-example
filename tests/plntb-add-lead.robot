*** Settings ***
Library     Browser
Library         OperatingSystem
Library    RequestsLibrary
Library    JSONLibrary
Resource    ../keywords/vtiger.robot
Suite Setup     Start Session    USER=${USER}    PASS=${PASS}
Suite Teardown  End Session

*** Variables ***
${BROWSER}   chromium
${HOME}    https://fecredit-uat.od1.vtiger.ws/
${USER}    createnew6@gmail.com
${PASS}    Crm@0123
${API_USER}    createnew7@gmail.com
${API_PASS}    N2n7vlqrILWB8TQc
${DATA_PATH}    ${CURDIR}/../data/data.json

*** Test Cases ***
Create a New lead on Module Lead Succesfully
    Go Page    https://fecredit-uat.od1.vtiger.ws/index.php?module=FecLead&view=Edit&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../libs/tests/plntb/add-lead/add-lead.js
    Wait For Title    Leads - ${lastName[0]}
    Load And Init Libs
    Inject Script With Retry    ${CURDIR}/../libs/tests/plntb/add-lead/check-workflow.js    retries=15    timeoutMs=5000    delayBetweenRetries=10000
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}

Create a PLNTB Record Succesfully
    Go Page    https://fecredit-uat.od1.vtiger.ws/index.php?module=FecLead&view=List&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    Take Screenshot
    ${lastName}=    Get Test Data    $.lastName
    Log    ${lastName}
    Inject Script With Retry    ${CURDIR}/../libs/tests/plntb/add-lead/open-lead.js
    Wait For Title    Leads - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../libs/tests/plntb/add-lead/check-workflow-2.js    retries=15    timeoutMs=5000    delayBetweenRetries=5000
    Take Screenshot
    Inject Script With Retry   ${CURDIR}/../libs/tests/plntb/add-lead/check-plntb.js    retries=10    timeoutMs=5000    delayBetweenRetries=10000
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}

*** Keywords ***