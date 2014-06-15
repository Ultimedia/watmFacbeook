
/**
* Loader class to detect if we are running from the browser or as a native app
*/
var app = {
    // Application Constructor
    initialize: function() {
        var app = document.URL.indexOf( 'http://' ) === -1 && document.URL.indexOf( 'https://' ) === -1;
        if ( app ) {
            console.log('native so wait for device ready');            
            document.addEventListener('deviceready', this.onDeviceReady, false);
        }else{
            appData.start(false);
        }
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {

        // add device specific stylesheets if need (older android eg)
        switch(device.platform){

            case "Android":

                // webkit issues in android 4.2.2 so we need a custom css here
                switch(device.version){
                    case "4.2.2":
                        // testing only
                        $('body').addClass('422');
                        $('html head').append('<link rel="stylesheet" type="text/css" href="public/css/android422.css" />');
                    break;
                }

            break;

        }


        appData.start(true);
    }
};