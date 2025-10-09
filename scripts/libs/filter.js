console.log(new Date().toLocaleTimeString(), '[Tester][Info][Inject]', '|', 'filter.js')
class Filter {
    
    constructor(){

    }

    preventHover = () => {
        Tester.console.log('Prevent Filter hover');
        $('.module-action-bar .listComponent > .dropdown').off('mouseenter mouseleave');
    }

    open = () => {
        $('.module-action-bar .listComponent > .dropdown').find('.dropdown-menu').first().stop(true, true).delay(100).fadeIn(200);
    }

    close = () => {
        $('.module-action-bar .listComponent > .dropdown').find('.dropdown-menu').first().stop(true, true).delay(100).fadeOut(200);
    }

    select = (filterName) => {
        let $select = $('#module-filters a').filter(function() {
            return $(this).text() === filterName;
        });
        $select.click();
        return $select;
    } 

}

window.ClassProvider.Filter = Filter;