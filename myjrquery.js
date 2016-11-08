var modulo = function(){

	return function(selector) {
		var that = this,
		el,
		sels,
		len,
		i = 0,
		nameKeys;

		that.toArray = function(obj){
			return Array.from(obj);
		}

		that.toTagNames = function(arr){
			var newArr = new Array;
			nameKeys = new Array;
			for(; i < len; i++){
				newArr.push(el[i].tagName);
			}

			nameKeys = newArr.filter(function(element, index){
				return newArr.indexOf(element) == index
			})

		}

		that.addClass = function(sclass){
			if(document.body.classList){
				if(typeof el == "object"){
					el.forEach(function(element,index,array){
						element.classList.add(sclass);
					});
				}else{
					el.classList.add(sclass)
				}

			}else{
				//fallback
			}
			return that;
		}

		that.removeClass = function(sclass){
			if(document.body.classList){
				if(typeof el == "object"){
					el.forEach(function(element,index,array){
						element.classList.remove(sclass);
					});
				}else{
					el.classList.remove(sclass)
				}

			}else{
				//fallback
			}
			return that;
		}

		that.on = function(event,call,parent){
			i = 0;
			var leng = nameKeys.length,
			position = -1;

			if(parent){
				parent = document.querySelector(parent);
				for(; i < leng; i++){

					parent.addEventListener(event,function(e){
						e.stopPropagation();
						position = nameKeys.indexOf(e.target.tagName);
						if(position >= 0){
							call(e);
							//nameKeys.splice(position,1)
						}

					});
				}
			}else{
				for(; i < len; i++){
					el[i].addEventListener(event,call);
				}

			}
		}

		// over here we select anything on the DOM
		if(selector != ""){
			if(document.querySelector){
				sels = document.querySelectorAll(selector);
				el = that.toArray(sels);
				len = el.length;
				that.toTagNames();
			}else{
				//fallback
			}
		}

		return that;
	}
}
