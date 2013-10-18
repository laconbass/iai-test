var assert = require( "chai" ).assert
  , test = require( ".." )
;

describe( "#builder", function(){
  it( "should validate the following", function(){
    function ola(){
      return Object.create( ola.prototype );
    }
    ola.prototype = {};
    test.builder( ola );
  })
})
