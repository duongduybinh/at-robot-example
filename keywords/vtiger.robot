*** Settings ***
Library    Browser
Library    OperatingSystem
Library    JSONLibrary
Library    BuiltIn

*** Variables ***
${BROWSER}
${HOME}
${API_USER}
${API_PASS}
${DATA_PATH}

*** Keywords ***
Start Browser
    New Browser    ${BROWSER}    timeout=60000
    New Context    ignoreHTTPSErrors=True

End Browser
    Close Browser

Open New Page
    [Arguments]    ${url}
    New Page    ${url}    load

Start Session
    [Arguments]    ${USER}    ${PASS}
    Start Browser
    Login    USER=${USER}    PASS=${PASS}
    Load Test Data

End Session
    Logout
    End Browser

Login With Session
    Take Screenshot
    Click First Element    xpath=//a[contains(text(),'Sign Out')]
    Wait For Title    Dashboard

Login
    [Arguments]    ${USER}    ${PASS}
    Open New Page    ${HOME}
    Fill Text    id=username    ${USER}
    Fill Text    id=password    ${PASS}
    Press Keys    id=password    Enter
    Wait For Condition    Title    should not be        timeout=300s
    ${title}=    Get Title
    Take Screenshot
    Run Keyword If    '${title}' == 'Vtiger'    Login With Session
    ...    ELSE    Run Keyword If    '${title}' == 'Users'    Login
    ...    ELSE    Wait For Title    FECredit

Logout
    Go To    ${HOME}index.php?module=Users&action=Logout    wait_until=load    timeout=300s

Wait For Title
    [Arguments]    ${expected}
    Wait For Condition    Title     contains    ${expected}

Go Page
    [Arguments]    ${url}    ${wait_until}=load
    Go To    ${url}    wait_until=${wait_until}    timeout=300s

Click First Element
    [Arguments]    ${selector}
    Sleep    1s
    ${elements}=    Get Elements    ${selector}
    Should Not Be Empty    ${elements}
    Wait For Elements State    ${elements[0]}    visible
    Click    ${elements[0]}

Click Open New Tab
    [Arguments]    ${locator}
    ${relative}=    Get Attribute    ${locator}    href
    ${absolute}=    Catenate    SEPARATOR=    ${HOME}    ${relative}
    Go To    ${absolute}    wait_until=load    timeout=300s
    Take Screenshot

Select Field
    [Arguments]    ${selector}    ${option}
    Wait For Elements State    ${selector}    visible
    Scroll To Element    ${selector}
    Evaluate JavaScript    ${selector}
    ...    (selector) => $(selector).select2('open')
    Evaluate JavaScript    ${selector}
    ...    (selector, option) => $(selector).val(option).trigger('change')
    ...    arg=${option}

Wait For Visible
    [Arguments]    ${locator}
    Wait For Elements State    ${locator}    visible

Select Date
    [Arguments]    ${selector}    ${option}
    Wait For Elements State    ${selector}    visible
    Scroll To Element    ${selector}
    ${result}    Evaluate JavaScript    ${selector}
    ...    (selector,option) => {
    ...        $(selector).valid();
    ...        $(selector).datepicker("setDate",option);
    ...        $(selector).datepicker("hide");
    ...        return $(selector).datepicker( "getDate" );
    ...    }
    ...    arg=${option}
    Take Screenshot
Select Time
    [Arguments]    ${selector}    ${option}
    Wait For Elements State    ${selector}    visible
    ${result}    Evaluate JavaScript    ${selector}
    ...    (selector,option) => {
    ...        $(selector).valid();
    ...        $(selector).val(option);
    ...        $(selector).valid();
    ...        return $(selector).val();
    ...    }
    ...    arg=${option}
    Take Screenshot
Hide Popup
    Evaluate JavaScript    ${None}
    ...    () => $(\'.custom-popup\').hide()

App View Name
    ${result}    Evaluate JavaScript    ${None}
    ...    () => {
    ...        return app.getViewName();
    ...    }
    Log    ${result}

Inject Script
    [Arguments]    ${file}
    ${script}=    Get File    ${file}
    ${result}=    Execute Script    ${script} 
    RETURN    ${result}

Inject Script With Retry
    [Arguments]    ${file}    ${retries}=10    ${timeoutMs}=5000    ${delayBetweenRetries}=1000
    ${script}=    Get File    ${file}
    ${result}=    Execute Script With Retry    ${script}    ${retries}    ${timeoutMs}    ${delayBetweenRetries}
    RETURN    ${result}

Execute Script
    [Arguments]    ${script}
    Log    ${script}
    TRY
        ${retsult}=    Evaluate Javascript    ${None}
        ...    (script) => {
        ...        return eval(script);    
        ...    }
        ...    arg=${script}
        Log    ${retsult}
        RETURN    ${retsult}
    EXCEPT    AS     ${errorMessage}
        ${testLog}=    Get Console Log    full=True
        Log Many    ${testLog}
        Fail    ${errorMessage}
    END

Execute Script With Retry
    [Arguments]    ${script}    ${retries}=10    ${timeoutMs}=5000    ${delayBetweenRetries}=1000
    Log    ${script}
    ${js}=    Catenate    SEPARATOR=\n
    ...    (async () => await window.ClassProvider.Tester.runWithRetry(async () => {
    ...       ${script}
    ...    }, {
    ...       retries: ${retries},
    ...       timeoutMs: ${timeoutMs},
    ...       delayBetweenRetries: ${delayBetweenRetries}
    ...    }))();
    TRY
        ${result}=    Execute Script    ${js}
        RETURN    ${result}
    EXCEPT    AS     ${errorMessage}
        ${testLog}=    Get Test Logs
        Log Many    ${testLog}
        Fail    ${errorMessage}
    END
    

Async Execute Script
    [Arguments]    ${script}
    ${retsult}=    Evaluate Javascript    ${None}
    ...    (script) => {
    ...        return await eval(script);    
    ...    }
    ...    arg=${script}
    RETURN    ${retsult}

Get Test Logs
    [Arguments]    ${contains}=
    ${logs}=    Get Console Log    full=True
    ${filtered}=    Evaluate    [l["text"] for l in $logs if (l["text"].find("[Tester]") != -1)]
    RETURN    ${filtered}

Load Libs
    Inject Script    ${CURDIR}/../libs/classProvider.js
    Inject Script    ${CURDIR}/../libs/api.js
    Inject Script    ${CURDIR}/../libs/asyncEvent.js
    Inject Script    ${CURDIR}/../libs/page.js
    Inject Script    ${CURDIR}/../libs/filter.js
    Inject Script    ${CURDIR}/../libs/listView.js
    Inject Script    ${CURDIR}/../libs/detailView.js
    Inject Script    ${CURDIR}/../libs/tester.js

Load And Init Libs
    Load Libs
    Execute Script    window.Tester = window.ClassProvider.Tester.CreateInstance('${HOME}', '${API_USER}', '${API_PASS}'); 'Create Tester';
    Wait For Load State    load    timeout=300s
    ${logs}=    Get Console Log    full=True
    Log Many       ${logs}
    Take Screenshot

New Test Case
    Load Test Data
    ${json}=    Get File    ${DATA_PATH}
    Execute Script With Retry    Tester.newTestCase('${TEST NAME}', 0, ${json});

Get Test Step
    ${step}=    Execute Script With Retry   return Tester.getTestStep()

Set Test Step
    [Arguments]    ${step}
    Execute Script With Retry   Tester.setTestStep(${step})

Get Test Name
    ${step}=    Execute Script With Retry   return Tester.getTestName()

Load Test Data
    ${TEST_DATA}=    Load JSON From File    ${DATA_PATH}
    Set Global Variable    ${TEST_DATA}

Get Test Data
    [Arguments]    ${json_path}
    ${json}=    Get Variable Value    $TEST_DATA
    ${result}=    Get Value From Json    ${json}    ${json_path}
    RETURN    ${result}
    