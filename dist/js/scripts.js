(e=>{let t=e.getElementById("myCanvas"),r=t.getContext("2d"),l=t.width/2,a=t.height-30,i=(t.width-75)/2,d=4,o=-4,n=!1,h=!1,w=0,s=3,f=[];for(let e=0;e<11;e+=1){f[e]=[];for(let t=0;t<10;t+=1)f[e][t]={x:0,y:0,status:1}}drawBall=()=>{r.beginPath(),r.arc(l,a,10,0,2*Math.PI),r.fillStyle="red",r.fill(),r.closePath()},drawPaddle=()=>{r.beginPath(),r.rect(i,t.height-10,75,10),r.fillStyle="red",r.fill(),r.closePath()},drawBricks=()=>{for(let l=0;l<11;l++)for(let a=0;a<10;a++)if(1===f[l][a].status){var e=85*l+15,t=30*a+30;f[l][a].x=e,f[l][a].y=t,r.beginPath(),r.rect(e,t,75,20),r.fillStyle="red",r.fill(),r.closePath()}},draw=()=>{r.clearRect(0,0,t.width,t.height),drawBricks(),collisionDetection(),drawBall(),drawPaddle(),drawScore(),drawLives(),(l+d>t.width-10||l+d<10)&&(d=-d),a+o<10?o=-o:a+o>t.height-10&&(l>i&&l<i+75?o=1.05*-o:(s--,s?(l=t.width/2,a=t.height-30,d=4,o=-4,i=(t.width-75)/2):(alert("GAME OVER"),e.location.reload()))),l+=d,a+=o,n?(i+=7,i+75>t.width&&(i=t.width-75)):h&&(i-=7,i<0&&(i=0)),requestAnimationFrame(draw)},collisionDetection=()=>{for(var t=0;t<11;t++)for(var r=0;r<10;r++){var i=f[t][r];1==i.status&&l>i.x&&l<i.x+75&&a>i.y&&a<i.y+20&&(o=-o,i.status=0,w+=1,110===w&&(alert("YOU WIN, CONGRATULATIONS!"),e.location.reload()))}},drawScore=()=>{r.font="16px Arial",r.fillStyle="red",r.fillText("Score: "+w,8,20)},drawLives=()=>{r.font="16px Arial",r.fillStyle="red",r.fillText("Lives: "+s,t.width-65,20)},keyDownHandler=e=>{"Right"==e.key||"ArrowRight"==e.key?n=!0:"Left"!=e.key&&"ArrowLeft"!=e.key||(h=!0)},keyUpHandler=e=>{"Right"==e.key||"ArrowRight"==e.key?n=!1:"Left"!=e.key&&"ArrowLeft"!=e.key||(h=!1)},mouseMoveHandler=e=>{let r=e.clientX-t.offsetLeft;r>0&&r<t.width&&(i=r-37.5)},e.addEventListener("keydown",keyDownHandler,!1),e.addEventListener("keyup",keyUpHandler,!1),e.addEventListener("mousemove",mouseMoveHandler,!1),draw()})(document);