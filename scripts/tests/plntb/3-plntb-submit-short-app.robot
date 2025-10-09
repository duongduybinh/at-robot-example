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
Create NTB Entry
    Go Page    ${HOME}index.php?module=vtcmplntb&view=List&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    Wait For Title    PL NTB
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/short-app/filter-and-select-customer.js
    Wait For Load State    load    timeout=300s
    Wait For Title    PL NTB - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/short-app/create-ntb.js
    Sleep    2s
    Reload    waitUntil=load
    Load And Init Libs
    ${salesStage}=    Execute Script With Retry    return $('#vtcmplntb_detailView_fieldValue_fld_salestage_3832').text().trim()
    Should Be Equal    ${salesStage}    Cập nhật thông tin Offer
    Take Screenshot
    ${logs}=    Get Console Log    full=True
    Log Many       ${logs}

Submit Short App to Pega
    Go Page    ${HOME}index.php?module=vtcmplntb&view=List&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/short-app/filter-and-select-customer.js    retries=40    timeoutMs=2000    delayBetweenRetries=2000
    Wait For Title    PL NTB - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/short-app/change-sales-stage.js
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}
    Wait For Elements State    id=overlayPageContent    visible    timeout=300000
    Load And Init Libs
    Take Screenshot
    TRY
        Inject Script With Retry   ${CURDIR}/../../libs/tests/plntb/short-app/submit-short-app-to-pega.js
    EXCEPT    Error: page.evaluate: Execution context was destroyed, most likely because of a navigation.
        Take Screenshot
    END
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}

Validate PLNTB Short App Submitted Successfully
    ${product}=    Get Test Data    $.product
    IF    '${product[0]}' != 'PL NTB'
        Pass Execution    CRC NTB bỏ qua test case này
    END
    Go Page    ${HOME}index.php?module=fecntbentry&view=List&viewname=&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/short-app/ntb-entry-filter-and-select-customer.js    retries=50    timeoutMs=2000    delayBetweenRetries=2000
    Wait For Title    NTB Entry - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    Wait For Load State    load
    Load And Init Libs
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/short-app/check-pega-info.js    retries=50    timeoutMs=2000    delayBetweenRetries=2000
    Sleep    1s
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/short-app/check-workflow.js    retries=50    timeoutMs=2000    delayBetweenRetries=2000
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}


Validate CRCNTB Short App Submitted Successfully
    ${product}=    Get Test Data    $.product
    IF    '${product[0]}' != 'CRC NTB'
        Pass Execution    PL NTB bỏ qua test case này
    END
    Go Page    ${HOME}index.php?module=fecntbentry&view=List&viewname=&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/short-app/ntb-entry-filter-and-select-customer.js    retries=40    timeoutMs=2000    delayBetweenRetries=2000
    Wait For Title    NTB Entry - ${lastName[0]}
    Load And Init Libs
    Take Screenshot