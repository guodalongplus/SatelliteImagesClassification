var myChart2 = echarts.init(document.getElementById('main2'));
var sdatax1;
var sdatay1;
var nb1=0;
var copydatax1;
var copydatay1;

setInterval(function() {
$.get('./static/json/jsondata1.json', function(res1) {
	//获取数据后，隐藏loading动画
	// myChart1.hideLoading();
	sdatax1 = res1.x
	sdatay1 = res1.y
	option = {
		// xAxis代表x轴的数据
		xAxis: {
			name:'训练次数',
			type:"category",
			nameTextStyle: {
				color: '#ffffff',
			},
			axisLine: { //坐标轴线条相关设置(颜色等)
				lineStyle: {
					color: '#ffffff'
				}
			},
			// 字段对应从json里面的字段
			data: res1.x.slice(0, 10),
			axisLabel: {
				show: true,
				interval: 'auto',
				textStyle: {
					color: '#ffffff',
				},
				
			},

		},
		// yAxis代表y轴的数据,不写会自动适应数据
		yAxis: {
			type: 'value',
			name: '损失值',
			nameTextStyle: {
				color: '#ffffff',
			},
			axisLine: { //坐标轴线条相关设置(颜色等)
				lineStyle: {
					color: '#ffffff'
				}
			},
			splitLine: { // gird 区域中的分割线
				show: true,
				lineStyle: {
					color: '#ffff00',
					width: 1,
					type: 'dashed'
				}
			},
			axisLabel: { // 坐标轴的标签
				show: true,
				color: '#F8F8FF',
				
		},
		},
		
		// series代表鼠标悬浮到图标上时提示的对应信息
		series: [{
			symbol: 'none',
			type: 'line',
			data: res1.y.slice(0, 300),
			// 字段对应从json里面的字段
			itemStyle: { //折线拐点的样式
				normal: {
					color: '#20aefc', //折线拐点的颜色
				}
			},
			lineStyle: { //线条的样式
				normal: {
					color: '#20aefc', //折线颜色
				}
			},
			areaStyle: { //区域填充样式
				normal: {
					//线性渐变
					color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						offset: 0,
						color: '#b1e3fe' // 0% 处的颜色
					}, {
						offset: 1,
						color: '#fff' // 100% 处的颜色
					}], false)
				}
			},
		}],
	};
	myChart2.setOption(option);
	var b1 = Array.prototype.slice.call(sdatax1)
	var b2 = Array.prototype.slice.call(sdatay1)

	if (nb1 > 125) {
		nb1 = 0
	} else {
		nb1 = nb1+ 5
		 copydatax1 = b1.slice(nb1, nb1 + 30)
		 copydatay1 = b2.slice(nb1, nb1 + 30)
		 // console.log(copydatax1)
		 // console.log(copydatay1)
		 // console.log("newindex=" + nb)
	}
myChart2.setOption({
		series: [{
			data: copydatay1,
		}],
		xAxis: {
			data: copydatax1,
		}
	
	});
	
	})},3000);
	
	
