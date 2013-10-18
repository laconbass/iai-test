var assert = require( 'assert' )
  , isFn = require( 'iai-is' )( 'Function' )
;

/**
 * # test utils #
 * @function test: returns a set of pre-defined test cases
 *   @param cases [String]: must be within Object.keys( test.cases );
 */

var exports = module.exports = test;

exports.version = "1";
exports.stability = 1;

function test( cases ){
  if( !~Object.keys( test.cases ).indexOf(cases) ){
    throw Error( "["+cases+"] is not within test.cases");
  }
  return test.cases[ cases ];
}

/**
 * ## Generic test cases ##
 *
 * A collection of generic test cases, meant to be used on unit testing.
 *
 */

test.cases = {
  "primitive string empty": "",
  "primitive string whitespace characters": "        ",
  "primitive string tab characters": "\t\t",
  "primitive string alphanumeric characters": "abcdefghijklm1234567890",
  "primitive string non-numeric characters": "xabcdefx",
  "primitive string numeric with preceding non-numeric characters": "bcfed5.2",
  "primitive string numeric with trailling non-numeric characters": "7.2acdgs",

  "primitive string integer decimal number zero": "0",
  "primitive string integer decimal negative number": "-10",
  "primitive string integer decimal positive number": "5",
  "primitive string integer octal number": "040",
  "primitive string integer hexadecimal number": "0xFF",
  "primitive string floating-point negative number": "-1.6",
  "primitive string floating-point positive number": "4.536",
  "primitive string floating-comma negative number": "-4,536",
  "primitive string floating-comma positive number": "4,536",
  "primitive string exponential notation number": "123e-2",

  "primitive integer decimal number zero": 0,
  "primitive integer decimal negative number": -16,
  "primitive integer decimal positive number": 32,
  "primitive integer octal number": 0144,
  "primitive integer hexadecimal number": 0xFFF,

  "primitive floating-point negative number": -2.6,
  "primitive floating-point negative number": 3.1415,
  "primitive exponential notation number": 8e5,

  "primitive boolean true": true,
  "primitive string true": "true",
  "primitive boolean false": false,
  "primitive string false": "false",

  "primitive infinity": Infinity,
  "positive infinity": Number.POSITIVE_INFINITY,
  "negative infinity": Number.NEGATIVE_INFINITY,

  "primitive undefined": undefined,
  "primitive null": null,
  "primitive NaN": NaN,

  "primitive array object": [ 1, 2, 3, 4 ],
  "primitive regexp object": /.*/,
  "primitive object empty": {},

  "object date": new Date(2009,1,1),
  "object empty": new Object(),

  "anonymous function": function(){},
  "named function": function name(){}
};

/**
 * ## Object property testers ##
 *
 * @function defined: Asserts `o` has a property named `pname`.
 *   @param o [Any]: The object to be tested
 *   @param pname [String]: The property name
 *   @returns: the property descriptor
 *
 * see [Object.getOwnPropertyDescriptor reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor)
 *
 */

test.defined = function( o, pname ){
  var descriptor = Object.getOwnPropertyDescriptor( o, pname );
  assert( descriptor, o + "#" + pname + " is not defined" );
  return descriptor;
};

/**
 * @function methods: Asserts `o` has defined methods named by arg 2 and onwards.
 *   @param o [Any]: The object to be tested
 *   @param name1 [String]: A method name
 *   @param name2 [String]: A method name
 *   @param nameN [String]: A method name
 *
 */
test.methods = function( o ){
  Array.prototype.slice.call( arguments, 1 )
  .forEach(function(value){
    test.defined( o, value );
    assert( isFn( o[value] ), o+"#"+value+" is not a function" );
  })
}

/**
 * @function chainableApi: Asserts api implements methods, and methods return api
 *   @param api [Object]: the object to be tested
 *   @param methods [Hash]: keys are method names, values arrays with valid arguments
 *
 * Ex:
 *     test.chainableApi( foo, {
 *       "bar": [ "each", "item", "is", "an", "argument" ],
 *       "baz": [ "arg1", "arg2", "..." ]
 *     })
 *
 * This snipnet asserts:
 *   - foo implements the properties "bar" and "baz" as functions.
 *   - bar and baz, when applied foo and its argument array, return foo.
 */
test.chainableApi = function( api, methods ){
  for( var name in methods ){
    assert( isFn( api[name] ), api+'#'+name+' is not a function' );
    assert.deepEqual( api[ name ].apply( api, methods[name] ), api,
                      api+'#'+name+' does not return current context'
    );
  }
};

/**
 * @function builder: Asserts fn is a builder
 *   @param fn [Function]: the function to be tested
 *   @param args [Array]: the params to be a applied for the third assertion
 *
 * This function asserts:
 *   - fn is a function
 *   - fn has owns a "prototype" property
 *   - fn returns an instanceof itself when applied its prototype plus given args
 */

test.builder = function( fn, args ){
  var name = (fn.name||fn)
  assert( isFn(fn),  name+" should be a function" );
  assert( fn.hasOwnProperty("prototype"),
          name+" should own a prototype property" );
  assert( fn.apply( {}, args||[] ) instanceof fn,
          name+" should return instances of itself" );
};
