var speed = 1500;
var content = document.getElementsByClassName("contentCir")[0];
var pic = document.getElementsByClassName("picCir");
var zindex = 0; //每张图片的层大小
var timer = null; //计时器
var index = 0;
var circle = document.getElementsByClassName("circleCir")[0].children;
var btn = document.getElementsByClassName("btnCir")[0].children;

function move(res, count) {
	for (var k = 0; k < count; k++) {
		//获取层、改变层赋值层
		for (var i = 0; i < pic.length; i++) {
			zindex = parseInt(pic[i].style.zIndex);
			if (res == "right") {
				zindex++;
				//zindex=6->7->1 透明度为0,层变为1
				if (zindex > pic.length) {
					zindex = 1;
					pic[i].style.opacity = "1";
				}
				//zindex=5->6 透明度为1
				if (zindex == pic.length) {
					pic[i].style.opacity = "0"
					index = i;
				}
			} else {
				zindex--;
				//zindex=0->6 透明度为1，层变为6
				if (zindex == 0) {
					zindex = 6;
					pic[i].style.opacity = "0";
					index = i;
				}
				//zindex=6->5的透明度为0
				else if (zindex == pic.length - 1) {
					pic[i].style.opacity = "1";
				}
			}
			pic[i].style.zIndex = zindex;
			addColor();
		}
	}
}

function animate() {
	timer = setInterval(function() {
		move("right", 1);
	}, speed);
}

//小圆点,颜色变化
function addColor() {
	for (var i = 0; i < circle.length; i++) {
		if (index == i) {
			circle[i].className = "bgc";
		} else {
			circle[i].className = "";
		}
	}
}

// 鼠标动作
window.onload = function() {
	animate();
	addColor();
	//鼠标进入与离开
	content.onmouseenter = function() {
		clearInterval(timer);
	}
	content.onmouseleave = function() {
		animate();
	}

	//鼠标触碰小圆点
	for (var i = 0; i < circle.length; i++) {
		circle[i].index = i;
		circle[i].onmouseenter = function() {
			count = this.index - index > 0 ? this.index - index : circle.length + (this.index - index);
			move("right", count);
			index = this.index;
			addColor();
		}
	}

	//btn事件  右边的箭头向右
	btn[0].onclick = function() {
		move("left", 1);
	}
	btn[1].onclick = function() {
		move("right", 1);
	}
}
