'use strict';

var UTIL = (function () {

    var flatten = {};

    flatten['reduce'] = function flattenReduce(input) {

        var result;

        if(Array.isArray(input)) {

            result = input.reduce(function (holder, current) {

                return holder.concat(Array.isArray(current) ? flattenReduce(current) : current);

            }, []);
        }

        return result;
    }

    flatten['singleLoop'] = function flattenSingleLoop(input) {

        var result = [];

        if(Array.isArray(input)) {

            for(var i = 0; i < input.length; i++) {

                if(Array.isArray(input[i])) {
                    
                    result = result.concat(flattenSingleLoop(input[i]));
                }
                else {
                    result.push(input[i]);
                }
            }
        }

        return result;
    }

    // http://stackoverflow.com/questions/10865025/merge-flatten-an-array-of-arrays-in-javascript/39000004#39000004

    flatten['nestedLoop'] = function flattenNestedLoop(arr, result = []) {

        for (let i = 0, length = arr.length; i < length; i++) {

            const value = arr[i];

            if (Array.isArray(value)) {

                for (let i = 0, length = value.length; i < length; i++) {

                    const value2 = value[i]

                    if (Array.isArray(value2)) {

                        flattenNestedLoop(value2, result)
                    } 
                    else {
                        result.push(value2)
                    }
                }
            } 
            else {
                result.push(value)
            }
        }

        return result
    }

    function percentDecrease(a, b) {
        return parseFloat( ( ( (a - b) / a) * 100).toFixed(2) );
    }

    function percentIncrease(a, b) {
        return parseFloat( ( ( (a - b) / b) * 100).toFixed(2) );
    }

    function testFunc(input, func, iterations) {
                
        var sum = 0;
        var t0, t1;

        for(var i = 0; i < iterations; i++) {

            t0 = performance.now();
            func(input);
            t1 = performance.now();
            sum += (t1 - t0);
        }

        return sum;
    }

    return {
        flatten: flatten,
        percentDecrease: percentDecrease,
        percentIncrease: percentIncrease,
        testFunc: testFunc
    };

}());