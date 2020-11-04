// x训练精度
var myChart1 = echarts.init(document.getElementById('main1'));
var sdatax;
var sdatay;
var copydatax;
var copydatay;
var i = 0;
var nb = 300;
setInterval(function() {
	$.get('./static/json/jsondata.json', function(res) {
	//获取数据后，隐藏loading动画
	// myChart1.hideLoading();
	sdatax = res.x
	sdatay = res.y
	sdatax = Array.prototype.slice.call(sdatax)
	sdatay = Array.prototype.slice.call(sdatax)
	
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
			data: sdatax.slice(0, 10),
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
			name: '模型准确度',
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
				formatter: function(value){
				                return (value).toFixed(2)+'%'
				              }
		},
		},
		
		
		// series代表鼠标悬浮到图标上时提示的对应信息
		series: [{
			symbol: 'none',
			type: 'bar',
			data: sdatay.slice(0, 300),
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
	myChart1.setOption(option);
	var a1 = Array.prototype.slice.call(sdatax)
	var a2 = Array.prototype.slice.call(sdatay)

	if (nb > 125) {
		nb = 0
	} else {
		nb = nb + 5
		 copydatax = a1.slice(nb, nb + 10)
		 copydatay = a2.slice(nb, nb + 10)
		// console.log("newindex=" + nb)
	}

	myChart1.setOption({
		series: [{
			data: copydatay,
		}],
		xAxis: {
			data: copydatax,
		}

	});
	myChart2.setOption({
		series: [{
			data: copydatay1,
		}],
		xAxis: {
			data: copydatax1,
		}
	
	});
})},2000);
