/*
 * WObj Javascript Library version ALPHA
 * Author: Mike Matovic
 * 
 * This library serves as a basic way to create javascript based windows that are 
 * managed in a collection.
 */

( function ( win ) {
	//create a global function for the window system entry point
	var _WObj = win.WObj;

	//WObj exposes the dispatcher
	WObj = function( WObjStruct ){
		return WObj.methods.dispatch( WObjStruct );
	};

	//create a global collection of window objects
	var _WObjCollection = WObj.WObjCollection = WObj.prototype = {};

	//a prototype for windows
	WObj.wnd = WObj.prototype = {
		height : 0,
		width : 0,
		id : null,

		constructor : function ( height, width, id ) {
			if ( height === 0 || width === 0 ) {
				return { message : "Dimensions provided are too small." };
			}

			if ( id == null || id == undefined ) {
				return { message : "No id was provided." };
			}

			this.height = height;
			this.width = width;
			this.id = id;
		}
	};

	//create a variable for the window object prototype
	var _wnd = WObj.wnd;

	WObj.methods = WObj.prototype = {

		//dispatch the WObjStruct to the appropriate functions. dispatch returns a
		//message indicating what transpired with the WObjStruct.
		dispatch: function ( WObjStruct ) {

			var messageText;
			var type = typeof WObjStruct;
			var hasId = false;

			//create a validation check
			var validate = function( obj ){

				if ( obj == null || obj == undefined ) {
					return false;
				}

				if (obj.length === 0 ) {
					return false;
				}

				//get an array of valid properties
				var validProps = ( function() {
					var returnProps = [];
					for ( key in _wnd ) {
						if ( typeof _wnd[key] != "function" ) {
							returnProps.push( key );
						}
					}

					return returnProps;
				})();

				//loop through the object properties
				var property;
				for ( property in obj ) {
					//loop through the validProps and if valid, move to the next property
					var propsIndex;
					var validProp = false;
					for ( propsIndex in validProps) {
						if ( validProps[propsIndex] === property ) {
							validProp = true;
							if ( validProps[propsIndex] === "id" ) {
								hasId = true;
							}
							break;
						}
					}

					//if the property is invalid return false
					if ( !validProp ) {
						return false;
					}
				}

				//if the search is completed without error and there is an Id
				//then return true; otherwise return false.
				if ( hasId ) {
					return true;	
				} else {
					return false;
				}
			};

			//create a parse to detect intended actions
			var parse = function ( obj ) {

			};

			if ( type === "object" ) {

				if ( validate( WObjStruct ) ) {
					
					messageText = "Congratulations! You have a valid WObjStruct!";
				} else {
					messageText = "Bad!";
				}
			}
			
			return { message : messageText };
		},

		//returns a given wndObj or returns false if it is now found
		findWnd: function ( id ) {
			if ( id == null || id == undefined ) {
				return false;
			}

			for ( wnd in _WObjCollection ) {
				if ( wnd.id ===  id ) {
					return wnd;
				}
			}

			return false;
		}
	};
})(window);