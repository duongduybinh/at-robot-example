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
Add Lead
    Go Page    ${HOME}index.php?module=vtcmcrcxstu&view=List&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Inject Script    ${CURDIR}/../libs/tests/xstu/select-filter.js
    Take Screenshot
    Inject Script    ${CURDIR}/../libs/tests/plntb/pre-submit/filter-and-select-customer.js
    Wait For Title    XSTU - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}

Change Sales Stage
    Go Page    https://fecredit-uat.od1.vtiger.ws/index.php?module=FecLead&view=List&app=SALES    wait_until=load
    Load And Init Libs
    Sleep    2s
    ${dataJson}=    Load JSON From File    ${CURDIR}/../data/data.json
    ${lastName}=    Get Value From Json    ${dataJson}    $.lastName
    Log    ${lastName}
    Execute Script    $('[name="feclead_lastname"]').val('${lastName[0]}')
    Execute Script    $('[data-trigger="listSearch"]').click()
    Sleep    5s
    Execute Script    Tester.listView.selectAndOpen('${lastName[0]}')
    Wait For Title    Leads - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    Inject Script    ${CURDIR}/../libs/tests/add-lead/change-sales-stage.js
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many       ${logs}
    Sleep    1s
    Wait For Load State    load    timeout=300s
    Take Screenshot


*** Keywords ***