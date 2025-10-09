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
${DATA_PATH}    ${CURDIR}/../../../run/xstu-data.json

*** Test Cases ***
Call To Customer
    ${recordId}=    Get Test Data    $.recordId
    Go Page    ${HOME}index.php?module=vtcmcrcxstu&view=Detail&record=${recordId[0]}&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${fullName}=    Get Test Data    $.fullName
    Wait For Title    XSTU - ${fullName[0]}
    Take Screenshot
    Inject Script With Retry   ${CURDIR}/../../libs/tests/xstu/pre-submit/call-customer.js
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}


Follow Lead
    ${recordId}=    Get Test Data    $.recordId
    Go Page    ${HOME}index.php?module=vtcmcrcxstu&view=Detail&record=${recordId[0]}&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${fullName}=    Get Test Data    $.fullName
    Take Screenshot
    Inject Script With Retry   ${CURDIR}/../../libs/tests/xstu/pre-submit/change-sales-stage.js    retries=30    timeoutMs=5000    delayBetweenRetries=5000
    Wait For Title    XSTU - ${fullName[0]}
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}



*** Keywords ***