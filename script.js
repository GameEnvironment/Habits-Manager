let elementcount=0;
    function start() {
          let account = localStorage.getItem("account");
        localStorage.clear();
        elementcount=0;
        localStorage.setItem("account", account);
        let accountshowed=+localStorage.getItem("account");
        document.getElementById("price_sold").innerHTML=accountshowed+"$";
        document.getElementsByClassName("transactions-elements")[0].innerHTML='';
        elementcount=0;
    }
    function verify() {
        let account = +localStorage.getItem('account');
        parseFloat(account);
        if (typeof account=="number") {
            document.getElementById("price_sold").innerHTML=account+"$";
        } else {
            start();
        }
        let newelementcount=+localStorage.getItem("elementcount");
        if (newelementcount != 0) {
            for (let i =1; i<=newelementcount; i++) {
                let actionSelector=i+"action";
                let priceSelector=i+"price";
                let action=localStorage.getItem(actionSelector);
                let price=localStorage.getItem(priceSelector);
                document.getElementsByClassName('transactions-elements')[0].innerHTML="<div class='transaction-item'><ul><li>"+ action+ " ("+price + "$)</li></ul></div>" + document.getElementsByClassName('transactions-elements')[0].innerHTML;
            }
        } else {
            newlementcount=0;
            localStorage.setItem("elementcount", newelementcount);
        }
    }
    function transaction(element, price) {
        let newelementcount= +localStorage.getItem("elementcount");
        newelementcount++;
        localStorage.setItem("elementcount", newelementcount);
        document.getElementsByClassName('transactions-elements')[0].innerHTML="<div class='transaction-item'><ul><li>"+ element+ " ("+price + "$)</li></ul></div>" + document.getElementsByClassName('transactions-elements')[0].innerHTML;
        let account=+localStorage.getItem("account");
        parseFloat(account);
        account+=price;
        if (price>0) {
            initConfetti();
            render();
            printmoney(price);
        } 
        localStorage.removeItem("account");
        localStorage.setItem("account", account);
        document.getElementById("price_sold").innerHTML= account + "$";
        modalshut();
        let converter= {
            action: element,
            price: price
        };
        save(converter);
    }
    function modalprint1() {
        let modal = document.getElementsByClassName('modal')[0];
        modal.style.display= "flex";
    }
    function modalprint2() {
        let modal = document.getElementsByClassName('modal')[1];
        modal.style.display= "flex";
    }
    function transactionspecialplus() {
        let element=document.getElementById('modalanstypeplus').value;
        let price=+document.getElementById('modalanspriceplus').value;
        transaction(element, price);
    }
    function transactionspecialminus() {
        let element=document.getElementById('modalanstypeminus').value;
        let price=+document.getElementById('modalanspriceminus').value;
        price*=-1;
        transaction(element, price);
    }
    function modalshut() {
        let modal1 = document.getElementsByClassName('modal')[0];
        let modal2 = document.getElementsByClassName('modal')[1];
        modal1.style.display="none";
        modal2.style.display="none";
    }
    document.getElementById('close1').onclick=function() {
        let modal = document.getElementsByClassName('modal')[0];
        modal.style.display="none";
    };
    document.getElementById('close2').onclick=function() {
        let modal = document.getElementsByClassName('modal')[1];
        modal.style.display="none";
    };
    function save(element) {
        let newelementcount=+localStorage.getItem("elementcount");
        let action=element.action;
        let price=element.price;
        let actionSelector=newelementcount+"action";
        let priceSelector=newelementcount+"price";
        localStorage.setItem(actionSelector, action);
        localStorage.setItem(priceSelector, price);
    }
    function deletelastitem() {
        let newelementcount=+localStorage.getItem("elementcount");
        let priceselector=newelementcount+"price";
        let officialprice=+localStorage.getItem(priceselector);
        if (newelementcount>0) {
            document.getElementsByClassName('transactions-elements')[0].innerHTML="";
            for (let i =1; i<newelementcount; i++) {
                let actionSelector=i+"action";
                let priceSelector=i+"price";
                let action=localStorage.getItem(actionSelector);
                let price=localStorage.getItem(priceSelector);
                document.getElementsByClassName('transactions-elements')[0].innerHTML="<div class='transaction-item'><ul><li>"+ action+ " ("+price + "$)</li></ul></div>" + document.getElementsByClassName('transactions-elements')[0].innerHTML;
    
            }
            newelementcount--;
            localStorage.setItem("elementcount", newelementcount);
            let newaccount=localStorage.getItem("account");
            newaccount-=officialprice;
            localStorage.setItem("account", newaccount);
            document.getElementById("price_sold").innerHTML=newaccount+"$";
        } else {
            alert("You have nothing left, you can't delete it");
        }
    }
    
    //confettis
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d")
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cx = ctx.canvas.width;
    cy = ctx.canvas.height;
    
    let confetti = [];
    const confettiCount = 300;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
    { front: 'red', back: 'darkred' },
    { front: 'green', back: 'darkgreen' },
    { front: 'blue', back: 'darkblue' },
    { front: 'yellow', back: 'darkyellow' },
    { front: 'orange', back: 'darkorange' },
    { front: 'pink', back: 'darkpink' },
    { front: 'purple', back: 'darkpurple' },
    { front: 'turquoise', back: 'darkturquoise' }];
    
    
    //-----------Functions--------------
    resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cx = ctx.canvas.width / 2;
      cy = ctx.canvas.height / 2;
    };
    
    randomRange = (min, max) => Math.random() * (max - min) + min;
    
    initConfetti = () => {
      for (let i = 0; i < confettiCount; i++) {
        confetti.push({
          color: colors[Math.floor(randomRange(0, colors.length))],
          dimensions: {
            x: randomRange(10, 20),
            y: randomRange(10, 30) },
    
          position: {
            x: randomRange(0, canvas.width),
            y: canvas.height - 1 },
    
          rotation: randomRange(0, 2 * Math.PI),
          scale: {
            x: 1,
            y: 1 },
    
          velocity: {
            x: randomRange(-25, 25),
            y: randomRange(0, -50) } });
    
    
      }
    };
    
    //---------Render-----------
    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    
      confetti.forEach((confetto, index) => {
        let width = confetto.dimensions.x * confetto.scale.x;
        let height = confetto.dimensions.y * confetto.scale.y;
    
        // Move canvas to position and rotate
        ctx.translate(confetto.position.x, confetto.position.y);
        ctx.rotate(confetto.rotation);
    
        // Apply forces to velocity
        confetto.velocity.x -= confetto.velocity.x * drag;
        confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
        confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
    
        // Set position
        confetto.position.x += confetto.velocity.x;
        confetto.position.y += confetto.velocity.y;
    
        // Delete confetti when out of frame
        if (confetto.position.y >= canvas.height) confetti.splice(index, 1);
    
        // Loop confetto x position
        if (confetto.position.x > canvas.width) confetto.position.x = 0;
        if (confetto.position.x < 0) confetto.position.x = canvas.width;
    
        // Spin confetto by scaling y
        confetto.scale.y = Math.cos(confetto.position.y * 0.1);
        ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
    
        // Draw confetti
        ctx.fillRect(-width / 2, -height / 2, width, height);
    
        // Reset transform matrix
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      });
    
      window.requestAnimationFrame(render);
    };
    function printmoney(price) {
        document.getElementById('displaymoney').style.display="flex";
        document.getElementById('displaymoney').innerHTML="<div id='moneyanimcontainer'>+"+price+"$!</div>";
        let elements = document.getElementsByClassName("element-text");
        for(let i = 0; i < elements.length; i++) {
            document.getElementsByClassName('element-text')[i].style.color="white";
            document.getElementsByClassName('element-text')[i].style.border="transparent";
            document.getElementById('canvas').style.zIndex=1;
        }
        setTimeout(() => {
            document.getElementById('displaymoney').style.display="none";
            document.getElementById('displaymoney').innerHTML="";
            let elements = document.getElementsByClassName("element-text");
            for(let i = 0; i < elements.length; i++) {
                document.getElementsByClassName('element-text')[i].style.color="black";
                document.getElementsByClassName('element-text')[i].style.border="solid black 1px";
                document.getElementById('canvas').style.zIndex=-1;
            }
        }, 7000);
    }
    
    window.onload=verify();