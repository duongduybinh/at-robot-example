*** Settings ***
Library     Browser
Library         OperatingSystem
Library    RequestsLibrary
Library    JSONLibrary
Resource    ../../keywords/vtiger.robot
Suite Setup     Start Session    USER=${USER}    PASS=${PASS}
Suite Teardown  End Session

*** Variables ***
${BROWSER}   chromium
${HOME}    https://fecredit-uat.od1.vtiger.ws/
${USER}    createnew6@gmail.com
${PASS}    Crm@0123
${API_USER}    createnew7@gmail.com
${API_PASS}    N2n7vlqrILWB8TQc
${DATA_PATH}    ${CURDIR}/../../../run/plntb-data.json

*** Test Cases ***
Call To Customer
    Go Page    ${HOME}index.php?module=vtcmplntb&view=List&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/pre-submit/select-filter.js
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/pre-submit/filter-and-select-customer.js
    Wait For Title    PL NTB - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    Inject Script With Retry   ${CURDIR}/../../libs/tests/plntb/pre-submit/call-customer.js
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}
    

Follow Lead
    Go Page    ${HOME}index.php?module=vtcmplntb&view=List&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Inject Script With Retry   ${CURDIR}/../../libs/tests/plntb/pre-submit/filter-and-select-customer.js
    Wait For Title    PL NTB - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    Inject Script With Retry   ${CURDIR}/../../libs/tests/plntb/pre-submit/change-sales-stage.js    retries=30    timeoutMs=5000    delayBetweenRetries=5000
    Wait For Title    PL NTB - ${lastName[0]}
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}

*** Keywords ***