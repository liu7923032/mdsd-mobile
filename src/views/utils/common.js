 const common={
	//1:处理结果返回的结果
	procResult (data,success,error) {
		if(data.ok=="ok"){
			var jsonData=data.data;
			
			if(jsonData.Statu=="Y"){
				if(typeof(success)=="function"){
					success(data.data);
				}
			}
		}
		else if(data.status=="401"){
			//身份验证失败
		}
		else{
			//返回结果失败
			if(typeof(fail)=="function"){
				fail(data.data);
			}
		}
	},
	getUrlParam (paramName) {
		let url = location.href;
		var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
		var paraObj = {}
		
		for (let i = 0; i<paraString.length; i++) {
			let j=paraString[i];
			paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
		}
		var returnValue = paraObj[paramName.toLowerCase()];

		if (typeof (returnValue) == "undefined") {
			return "";
		} else {
			if (returnValue.indexOf('#') >= 0) {
				returnValue = returnValue.substring(0, returnValue.length - 1);
			}
			return returnValue;
		}
	}

}

export default common

