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
Send Short App Successfully to Pega
    Go Page    ${HOME}index.php?module=vtcmplntb&view=List&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    Wait For Title    PL NTB
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/full-app/filter-and-select-customer.js
    Wait For Title    PL NTB - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/full-app/call-api.js
    Wait For Title    NTB Entry - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    ${logs}=    Get Console Log    full=True
    Log Many       ${logs}

Submit Full App to Pega
    Go Page    ${HOME}index.php?module=vtcmplntb&view=List&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    Wait For Title    PL NTB
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/full-app/filter-and-select-customer.js
    Wait For Title    PL NTB - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/full-app/goto-ntb-entry.js
    Wait For Title    NTB Entry - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    TRY
        Inject Script With Retry   ${CURDIR}/../../libs/tests/plntb/full-app/submit-full-app-to-pega.js
    EXCEPT    Error: page.evaluate: Execution context was destroyed, most likely because of a navigation.
        Take Screenshot
    END
    Wait For Title    NTB Entry - ${lastName[0]}
    Load And Init Libs 
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}

Send Full App Successfully to Pega
    ${product}=    Get Test Data    $.product
    IF    '${product[0]}' != 'PL NTB'
        Pass Execution    CRC NTB bỏ qua test case này
    END
    Go Page    ${HOME}index.php?module=fecntbentry&view=List&viewname=&app=SALES    wait_until=load
    Load And Init Libs
    New Test Case
    ${lastName}=    Get Test Data    $.lastName
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/full-app/filter-and-select-customer.js
    Wait For Title    PL NTB - ${lastName[0]}
    Load And Init Libs
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/full-app/goto-ntb-entry.js
    Wait For Title    NTB Entry - ${lastName[0]}
    Load And Init Libs
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/full-app/check-pega-info.js    retries=50    timeoutMs=2000    delayBetweenRetries=2000
    Sleep    1s
    Take Screenshot
    Inject Script With Retry    ${CURDIR}/../../libs/tests/plntb/full-app/check-workflow.js    retries=50    timeoutMs=2000    delayBetweenRetries=2000
    Take Screenshot
    ${logs}=    Get Test Logs
    Log Many    ${logs}