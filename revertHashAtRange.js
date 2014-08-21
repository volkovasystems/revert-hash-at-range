
var revertHashAtRange = function revertHashAtRange( parameterList, callback ){

	var parameterList = parameterList.trim( );
	var parameterListSet = parameterList.split( /[,]|[" "]/ );
	var parameterListSetLength = parameterListSet.length;

	var parameters = [ ];

	parameterListSet[0]= removeLeadingZero( parameterListSet[0] );

	for( var i=0; i<parameterListSetLength; i++ ){

		if ( parameterListSet[i] != "" )
			parameters.push( parameterListSet[i].trim( ) );	
	}

	console.log(parameters.join( " " ) );
	var revertHashByPartitionCommand = "java revertHashAtRange.revertHashAtRange " + parameters.join( " " );

	work( revertHashByPartitionCommand,
		function onResult( error, isValid, result ){
			if( error ){
				console.error( error );
				callback( error );

			}else if( isValid ){
				var stringValue = result;

				console.log( stringValue );
				callback(  stringValue );

			}else{
				var error = new Error( "invalid result" );
				console.error( error );
				callback( error );
			}
		} );
};	

var work = require( "../work/work.js" );

module.exports = revertHashAtRange;

// remove leading zero at the beginning of hash
var removeLeadingZero = function removeLeadingZero( hash ){
	var hashValue = hash.trim( );
	hashValue = hashValue.split( "" );
	var j = true;
	var i = 0;

	while( j == true ){
		if ( hashValue[i] == "0" )
		{
			i++;
		}else{
			j = false;
		}
	}
	hashValue = hashValue.slice(i).join("");
	return hashValue;
};
module.exports = removeLeadingZero;


//java revertHashByPartition.revertHashByPartition 1f3870be274f6c49b3e31a0c6728957f abcdefghijklmnopqrstuvwxyz 5 2 md5

revertHashAtRange("000006d80eb0c50b49a509b49f2424e8c805 abcdefghijklmnopqrstuvwxyz 1, 5000, md5",function(){});
