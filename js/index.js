$(function(){
	//当天的天气
	function getNowWeather(url){
		$.ajax({
			url:url,
			method:'get',
			success:function(res){
				console.log(res);
				var status = res.HeWeather6[0].status;
				console.log(status);
				if (status === 'ok') {
					var now = res.HeWeather6[0].now;
					var city = res.HeWeather6[0].basic.location;
					//var daily_forecast = res.HeWeather6[0].daily_forecast;

					//实况天气图码
					var	cond_code = now.cond_code;
					var cond_txt = now.cond_txt;
					//当前的温度
					var tmp = now.tmp;
					var fl = now.fl;
					var wind_dir = now.wind_dir;
					var wind_sc = now.wind_sc;
					var hum = now.hum;
					var pcpn = now.pcpn;
					var pres = now.pres;

					//console.log(city,cond_code,cond_txt,tmp,fl);
					$('.city').html(city);
					$('.weatherImg').attr('src',`./images/cond-icon-heweather/${cond_code}.png`);
					$('.temp').html(tmp+'°');
					$('.cond_txt').html(cond_txt+' ');
					$('.wind_dir').html(wind_dir);
					$('.wind_sc').html(wind_sc+"级");
					$('.hum').html(hum+"%");
					$('.pcpn').html(pcpn+"mm");
					$('.pres').html(pres+"hpa");

					$('.fl').html(fl);
				}
			},
			error:function(err){
				console.log(err);
			}
		})
	}
	getForecastWeather('https://free-api.heweather.net/s6/weather/forecast?location=auto_ip&key=375ef2cc1a794d59b65171ea0e917324');
	getNowWeather('https://free-api.heweather.net/s6/weather/now?location=auto_ip&key=375ef2cc1a794d59b65171ea0e917324');
	//获取未来三天的天气
	//获取今天 ， 明天 ，后天
	function getDay(i){
		switch(i){
			case 0:
				return '今天'
				break;
			case 1:
				return '明天'
				break;
			case 2:
				return '后天'
				break;
		}
	}
	//获取未来三天的天气
	function getForecastWeather(url){

		//发送ajax的
		$.ajax({
			url:url,
			method:'get',
			success:function(res){
				var daily_forecast = res.HeWeather6[0].daily_forecast;
				console.log(daily_forecast);
				// var i = 2;
				$('#day ul li').each(function(i){
					// 图片
					console.log(i);
					var cond_code_d = daily_forecast[i].cond_code_d;
					//	最高温度
					var tmp_max = daily_forecast[i].tmp_max;
					var tmp_min = daily_forecast[i].tmp_min;
					// 最底温度
					var cond_txt_d = daily_forecast[i].cond_txt_d;
					//时间
					var date = daily_forecast[i].date;
					//通过时间，给推星期几
					var week = moment(date).format('dddd');
					//$(this).empty();
					$(this).append(`
						<img src="./images/cond-icon-heweather/${cond_code_d}.png" >
						<span>${week}·${getDay(i)}·</span>
						<span class="everday_txt">${cond_txt_d}</span>
						<span class="day_max">${tmp_max}°/${tmp_min}°</span>
						`);
				})
			}
		})
	}
})