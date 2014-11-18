While In Use
==========
This small utility (less than 400 bytes minified) allows you to schedule a callback to run on a given interval, but only if activity is detected on the page since the last time the callback ran. The callback will always execute after the first interval, regardless of whether any activity has happened on the page.

## Usage

To schedule a callback, pass it and an interval (in milliseconds) to $.whenInUse.
    
    function makeAwesomeSauce() {
      console.log('Sweet!');
    }
    
    $.whenInUse(makeAwesomeSauce, 1000);

To discontinue an interval, explicitly return false from the callback.
    
    //Only run this callback 4 times
    var count = 0;
    
    function stopAtFour() {
        return ++count != 4;
    }
    
    $.whenInUse(stopAtFour, 5000);

## Requirements
Requires [jQuery](http://jquery.com) - Tested with 2.1.1 but should work with any version that supports .one()

## License

Copyright (c) 2014 Rob Widmer.
While In Use is released under the MIT License. See the bundled LICENSE file for
details.
