var assert = require( "chai" ).assert
  , test
;

describe( "test", function(){
  it( "should be required without throwing errors", function(){
    assert.doesNotThrow(function(){
      test = require( ".." );
    });
  })
  it( "should expose a function", function(){
    assert.isFunction( test );
  })
  it( "should throw TypeError if argument 1 is a string", function(){
    assert.throws( function(){ test( 'some string' ); }, TypeError );
  })
  it( "should filter test.cases given a regexp")
})
