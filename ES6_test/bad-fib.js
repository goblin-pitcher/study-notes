		function fib(num){
			if(num<3) return num
		    return (fib(num-1)+fib(num-2))
		}
		console.log(fib(40))