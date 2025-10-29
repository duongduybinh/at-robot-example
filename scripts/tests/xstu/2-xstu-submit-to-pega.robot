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
Submit XSTU Case to Pega
    ${recordId}=    Get Test Data    $.recordId
    Go Page    ${HOME}index.php?module=vtcmcrcxstu&view=Detail&record=${recordId[0]}&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${fullName}=    Get Test Data    $.fullName
    Wait For Title    XSTU - ${fullName[0]}
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/xstu/submit/change-sales-stage.js
    Take Screenshot
    Load And Init Libs
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}

Send App to Pega
    ${recordId}=    Get Test Data    $.recordId
    Go Page    ${HOME}index.php?module=vtcmcrcxstu&view=Detail&record=${recordId[0]}&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${fullName}=    Get Test Data    $.fullName
    Wait For Title    XSTU - ${fullName[0]}
    Take Screenshot
    TRY
        Inject Script With Retry    ${CURDIR}/../../libs/tests/xstu/submit/goto-data-entry.js
    EXCEPT    Error: page.evaluate: Execution context was destroyed, most likely because of a navigation.
        Wait For Load State    domcontentloaded
        Take Screenshot
    END
    Wait For Title    Data Entry - ${fullName[0]}
    Load And Init Libs
    Take Screenshot
    TRY
        Execute Script With Retry    $('#FecDataEntry_detailView_basicAction_LBL_EDIT').click()
    EXCEPT    Error: page.evaluate: Execution context was destroyed, most likely because of a navigation.
        Wait For Load State    domcontentloaded
        Take Screenshot
    END   
    Wait For Title    Data Entry - ${fullName[0]} 
    Load And Init Libs
    Take Screenshot
    TRY
        Inject Script With Retry   ${CURDIR}/../../libs/tests/xstu/submit/send-app-to-pega.js    retries=5    timeoutMs=30000    delayBetweenRetries=1000
    EXCEPT    Error: page.evaluate: Execution context was destroyed, most likely because of a navigation.
        Take Screenshot
    END
    Load And Init Libs
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}

Send App Successfully to Pega
    ${recordId}=    Get Test Data    $.recordId
    Go Page    ${HOME}index.php?module=vtcmcrcxstu&view=Detail&record=${recordId[0]}&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${fullName}=    Get Test Data    $.fullName
    Wait For Title    XSTU - ${fullName[0]}
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/xstu/submit/goto-data-entry.js
    Wait For Title    Data Entry - ${fullName[0]}
    Load And Init Libs
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/xstu/submit/check-pega-info.js    retries=50    timeoutMs=2000    delayBetweenRetries=2000
    Sleep    1s
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/xstu/submit/check-workflow.js    retries=50    timeoutMs=2000    delayBetweenRetries=2000
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}