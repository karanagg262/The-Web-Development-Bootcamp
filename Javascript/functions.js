function isEven(a)
{
	console.log(a%2===0);
}
isEven(4);
isEven(21);
isEven(68);
isEven(333);

function factorial(a)
{
	sum = 1;
	while(a>1)
	{
		sum = sum * a;
		a = a-1;
	}
	console.log(sum);
}
factorial(5);
factorial(2);
factorial(10);
factorial(0);

function kebabtosnake(a)
{
	b =a.replace(/-/g,"_");
	console.log(b);
}
kebabtosnake("hello-world");
kebabtosnake("dogs-are-awesome");
kebabtosnake("blah");
