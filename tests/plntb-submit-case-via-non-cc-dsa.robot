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
Create NTB Entry
    Go Page    https://fecredit-uat.od1.vtiger.ws/index.php?module=vtcmplntb&view=List&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Execute Script With Retry   Tester.listView.selectAndOpen('${lastName[0]}')
    Wait For Load State    load
    Wait For Title    PL NTB - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../libs/tests/plntb/create-ntb/create-ntb.js
    Sleep    2s
    Reload    waitUntil=load
    Load And Init Libs
    ${salesStage}=    Execute Script With Retry    return $('#vtcmplntb_detailView_fieldValue_fld_salestage_3832').text().trim()
    Should Be Equal    ${salesStage}    Cập nhật thông tin Offer
    Take Screenshot
    ${logs}=    Get Console Log    full=True
    Log Many       ${logs}

Submit Short App to Pega
    Go Page    https://fecredit-uat.od1.vtiger.ws/index.php?module=vtcmplntb&view=List&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Execute Script With Retry    Tester.listView.selectAndOpen('${lastName[0]}')
    Wait For Title    PL NTB - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../libs/tests/plntb/create-ntb/change-sales-stage.js
    Wait For Navigation    wait_until=load    timeout=300s
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}
    Load And Init Libs
    Take Screenshot
    Wait For Elements State    id=overlayPageContent    visible
    TRY
        Inject Script    ${CURDIR}/../libs/tests/plntb/create-ntb/submit-short-app-to-pega.js
    EXCEPT    Error: page.evaluate: Execution context was destroyed, most likely because of a navigation.
        Take Screenshot
    END
    Take Screenshot
    Sleep    10s
    ${logs}=    Get Test Logs
    Log Many    ${logs}
    Take Screenshot
    FOR    ${i}    IN RANGE    3
        Reload
        Wait For Load State    load
        Load And Init Libs
        Inject Script    ${CURDIR}/../libs/tests/plntb/create-ntb/goto-ntb-entry.js
        Wait For Load State    load
        ${title}=    Get Title
        Run Keyword If    '${title}' == 'PL NTB - ${lastName[0]}'    Sleep    30s
        ...    ELSE IF    '${title}' == 'NTB Entry - ${lastName[0]}'    Exit For Loop
    END
    Load And Init Libs
    Inject Script    ${CURDIR}/../libs/tests/plntb/create-ntb/check-workflow.js
    Take Screenshot

*** Keywords ***
