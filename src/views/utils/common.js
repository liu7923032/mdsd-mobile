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
	}

}