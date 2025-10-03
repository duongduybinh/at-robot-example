*** Settings ***
Library     Browser
Library         OperatingSystem
Library    RequestsLibrary
Resource    ../keywords/vtiger.robot
# Suite Setup     Start Session    USER=${USER}    PASS=${PASS}
# Suite Teardown  End Session

*** Variables ***
${BROWSER}   chromium
${HOME}    https://fecredit-uat.od1.vtiger.ws/
${USER}    createnew6@gmail.com
${PASS}    Crm@0123
${API_USER}    createnew7@gmail.com
${API_PASS}    N2n7vlqrILWB8TQc
${DATA_PATH}    ${CURDIR}/../data/data.json

*** Test Cases ***
test 3
    Take Screenshot
    Go Page    https://fecredit-uat.od1.vtiger.ws/index.php?module=vtcmplntb&view=List&app=SALES    wait_until=commit
    Inject Script    ${CURDIR}/api.js
    Inject Script    ${CURDIR}/tester.js
    Execute Script    Tester.configApi('${HOME}', 'createnew7@gmail.com', 'N2n7vlqrILWB8TQc');    
    Wait For Load State    load    timeout=300s
    Inject Script    ${CURDIR}/testCase.js
    ${logs}=    Get Console Log    full=True
    Log Many       ${logs}
    Sleep    5s
    ${logs}=    Get Test Logs
    Log Many       ${logs}
    
    ${log}=    Execute Script    app.getViewName()
    Log    ${log}
    # open    https://fecredit-uat.od1.vtiger.ws/index.php?module=vtcmplntb&view=List&app=SALES
    App View Name
    Take Screenshot

Test Run with Retry
    Start Browser
    New Page    https://fecredit-uat.od1.vtiger.ws/    wait_until=load
    
    Load And Init Libs
    New Test Case
    TRY
        ${result}=    Execute Script With Retry    return 'Test run with retry'
        Log    ${result}
    EXCEPT
        ${testLog}=    Get Test Logs
        Log Many    ${testLog}
    END    
    
    ${testLog}=    Get Console Log    full=True
    Log Many    ${testLog}
    Take Screenshot
    

*** Keywords ***
Run injected code example
    ${script}=    Catenate    SEPARATOR=\n
    ...    console.log('Hello from injected script');
    ...    // Ví dụ await call
    ...    await window.someAsyncOperation && window.someAsyncOperation();
    ${res}=    Execute Script    ${script}
    Log To Console    Result: ${res}

