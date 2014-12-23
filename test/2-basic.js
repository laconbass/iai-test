var assert = require( "chai" ).assert
  , test = require( ".." )
;

describe( "#exportsSomething", function(){
  it( "should be a function", function(){
    assert.isFunction( test.exportsSomething );
  })
  it( "should throw given empty object", function(){
    assert.throws(function(){
      test.exportsSomething( {} );
    });
  })
  it( "should not throw given object with enumerable attribute", function(){
    assert.doesNotThrow(function(){
      test.exportsSomething( { foo: null } );
    });
  })
  it( "should not throw given a function", function(){
    assert.doesNotThrow(function(){
      test.exportsSomething( function(){} );
    });
  })
})
