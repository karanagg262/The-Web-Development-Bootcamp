age = 34;
if(age<0)
{
	console.log("Enter correct age");
}
else if(age===21)
{
	console.log("Happy 21st birthday");
}
else if(age%2!==0)
{
	console.log("Your age is odd");
}
else if(age%Math.sqrt(age)===0)
{
	console.log("Your age is perfect square");
}