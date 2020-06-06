var b1 = document.querySelector("#p1");
var b2 = document.getElementById("p2");
var res = document.querySelector("#reset");
var s1 = document.querySelector("#s1");
var s2 = document.querySelector("#s2");
var numinput = document.querySelector("input")
var winningnum = document.querySelector("p span");
score1=0;
score2=0;
wvalue = 5;
gameover = false;
b1.addEventListener("click",function()
{
	if(!gameover)
	{
		score1++;
		s1.textContent = score1;
		if(score1==wvalue)
		{
			gameover = true;
			s1.classList.add("winner");
		}
	}
});
b2.addEventListener("click",function()
{
	if(!gameover)
	{
		score2++;
		s2.textContent = score2;
		if(score2==wvalue)
		{
			gameover=true;
			s2.classList.add("winner");
		}
	}
});
numinput.addEventListener("change", function()
{
	winningnum.textContent = numinput.value;
	wvalue = Number(numinput.value);

});
res.addEventListener("click",function() {
	gameover = false;
	score1=0;
	score2=0;
	s1.textContent=0;
	s2.textContent=0;
	s1.classList.remove("winner");
	s1.classList.remove("winner");
	wvalue = 5;
});