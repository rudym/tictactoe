var s=process.argv[2];
var n=parseInt(s,16);
var a=[292,146,73,448,56,7,273,84];
var q=[];
a.forEach(function(e,i,a){
	e=parseInt(n&e,10)<e?parseInt(n&e,10)>0?1:2:3;
	q.push(e);
});
n=Math.max.apply(null,q);
console.log(n==1?'cat':n==2?'lose':'win');