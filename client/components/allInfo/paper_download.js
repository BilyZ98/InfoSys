export default class downLoad{
	constructor(imgArray) {
		this.arr = [];
		this.imgCount = 0;
		this.imgArray = imgArray;
		this.imgLength = imgArray.length;
		this.transfer = 0;
	}
}

downLoad.prototype.getImg = function(){
	console.log(this.imgArray)
	var imgArray = this.imgArray;
	for(var i = 0; i < imgArray.length; i++){
		var src = imgArray[i].src;
		imgArray[i].setAttribute('crossOrigin', 'anonymous');
		this.requestImg(imgArray[i],src);
	}
}
downLoad.prototype.requestImg = function(img,src){
	var _this = this
	var src = src;
	img.src = src;
	img.onerror = function(){
		var timeStamp = +new Date();
		_this.requestImg(img,src+'?'+timeStamp);
	}
	img.onload = function(){
		_this.imgCount++;
	}
}
downLoad.prototype.getBase64Image = function(image,ext){
	var canvas = document.createElement("canvas");
	canvas.width = image.width;
	canvas.height = image.height;
	var context = canvas.getContext("2d");
	context.drawImage(image,0,0,image.width,image.height);
	
	var base64 = canvas.toDataURL("image/"+ext);
	return base64;
}
downLoad.prototype.init = function(dom,target,fileName,paperSize){
	var _this = this;
	var targetId = targetId || 'content';
	var fileName = fileName || 'content';
	var paperSize = paperSize || 'a4';
	this.getImg();

		document.body.scrollTop = document.body.scrollHeight - screen.height;
		document.body.scrollTop = 0;
		try{
			
			//$('.test-lists').find('.test-lists-bottom,.test-lists-sy,.test-lists-xy,.test-lists-score,.test-lists-remove').hide();
		}catch(e){
			console.log('导出失败');
		}
		target.style.background = 'white';
		if(_this.imgCount == _this.imgArray.length){
			if(_this.transfer == 0){
				for(var i = 0; i < _this.imgArray.length; i++){
				_this.arr.push(_this.getBase64Image(_this.imgArray[i],'png'))
				}
				for(var i = 0; i < _this.arr.length; i++){
					_this.imgArray[i].src = _this.arr[i];
				}
				_this.transfer = 1;
			}
			renderPDF(target,fileName,paperSize, function(){
				_this.arr = [];
				try{
					
					//$('.test-lists').find('.test-lists-bottom,.test-lists-sy,.test-lists-xy,.test-lists-score,.test-lists-remove').show();
				}catch(e){
					console.log('导出失败');
				}
        	});
		
	}
}

 var pdfFormat = {
        'a0': [2383.94, 3370.39],
        'a1': [1683.78, 2383.94],
        'a2': [1190.55, 1683.78],
        'a3': [841.89, 1190.55],
        'a4': [595.28, 841.89],
        'a5': [419.53, 595.28],
        'a6': [297.64, 419.53],
        'a7': [209.76, 297.64],
        'a8': [147.40, 209.76],
        'a9': [104.88, 147.40],
        'a10': [73.70, 104.88],
        'b0': [2834.65, 4008.19],
        'b1': [2004.09, 2834.65],
        'b2': [1417.32, 2004.09],
        'b3': [1000.63, 1417.32],
        'b4': [708.66, 1000.63],
        'b5': [498.90, 708.66],
        'b6': [354.33, 498.90],
        'b7': [249.45, 354.33],
        'b8': [175.75, 249.45],
        'b9': [124.72, 175.75],
        'b10': [87.87, 124.72],
        'c0': [2599.37, 3676.54],
        'c1': [1836.85, 2599.37],
        'c2': [1298.27, 1836.85],
        'c3': [918.43, 1298.27],
        'c4': [649.13, 918.43],
        'c5': [459.21, 649.13],
        'c6': [323.15, 459.21],
        'c7': [229.61, 323.15],
        'c8': [161.57, 229.61],
        'c9': [113.39, 161.57],
        'c10': [79.37, 113.39],
        'dl': [311.81, 623.62],
        'letter': [612, 792],
        'government-letter': [576, 756],
        'legal': [612, 1008],
        'junior-legal': [576, 360],
        'ledger': [1224, 792],
        'tabloid': [792, 1224]
    }

    // the width and height of content decided by the format of pdf
    // 'a0': [2383.94, 3370.39], 'a1': [1683.78, 2383.94],
    // 'a2': [1190.55, 1683.78], 'a3': [841.89, 1190.55],
    // 'a4': [595.28, 841.89], 'a5': [419.53, 595.28],
    // 'a6': [297.64, 419.53], 'a7': [209.76, 297.64],
    // 'a8': [147.40, 209.76], 'a9': [104.88, 147.40],
    // 'a10': [73.70, 104.88], 'b0': [2834.65, 4008.19],
    // 'b1': [2004.09, 2834.65], 'b2': [1417.32, 2004.09],
    // 'b3': [1000.63, 1417.32], 'b4': [708.66, 1000.63],
    // 'b5': [498.90, 708.66], 'b6': [354.33, 498.90],
    // 'b7': [249.45, 354.33], 'b8': [175.75, 249.45],
    // 'b9': [124.72, 175.75], 'b10': [87.87, 124.72],
    // 'c0': [2599.37, 3676.54], 'c1': [1836.85, 2599.37],
    // 'c2': [1298.27, 1836.85], 'c3': [918.43, 1298.27],
    // 'c4': [649.13, 918.43], 'c5': [459.21, 649.13],
    // 'c6': [323.15, 459.21], 'c7': [229.61, 323.15],
    // 'c8': [161.57, 229.61], 'c9': [113.39, 161.57],
    // 'c10': [79.37, 113.39], 'dl': [311.81, 623.62],
    // 'letter': [612, 792],
    // 'government-letter': [576, 756],
    // 'legal': [612, 1008],
    // 'junior-legal': [576, 360],
    // 'ledger': [1224, 792],
    // 'tabloid': [792, 1224]
    function renderPDF(content, pdfName, format, onSuccess){

        pdfName = pdfName || "content";

        if(pdfName.indexOf(".pdf") < 0){
            pdfName = pdfName + ".pdf";
        }

        format = format || "a4";

        var copyContent = content.cloneNode();

        copyContent.innerHTML = content.innerHTML;
        copyContent.style.position = "absolute";
        copyContent.style.zIndex = "-999";

        content = copyContent;

        document.body.appendChild(content);

        var pdfProportion = pdfFormat[format][0] / pdfFormat[format][1];

        var contentHeight = content.offsetHeight;
        var contentWidth = content.offsetWidth;
        
        var pageHeight = contentWidth / pdfProportion;
        var pageWidth = contentWidth;

        function renderPages(imgData){

            var pdf = new jsPDF("p", "pt", format);

            if(contentHeight < pageHeight){
                
                pdf.addImage(imgData, 'JPEG', 0, 0,pdfFormat[format][0],pdfFormat[format][1]/pageHeight*contentHeight);

                pdf.save(pdfName);

            }
            else{

                var index = 0;
                var count = parseInt(contentHeight / pageHeight);

                var page = document.createElement("div");
                
                page.style.position = "absolute";
                page.style.width = contentWidth + "px";
                page.style.height = pageHeight + "px";
                page.style.backgroundImage = "url(" + imgData + ")";
                page.style.backgroundRepeat = "norepeat";

                document.body.appendChild(page);

                function addPage(i, onFinished){

                    page.style.backgroundPositionY = -pageHeight * i + "px";
                    
                    html2canvas(page, {

                        onrendered: function(canvas) {

                            var pageData = canvas.toDataURL('image/jpeg');

                            pdf.addImage(pageData, 'JPEG', 0, 0,pdfFormat[format][0],pdfFormat[format][1]);

                            if(i + 1 < count){
                                pdf = pdf.addPage();
                                addPage(i + 1, onFinished);
                            }
                            else{
                                onFinished()
                            }

                        }
                    });

                }

                addPage(index, function(){

                    page.style.backgroundPositionY = -pageHeight * count + "px";

                    var lastPageHeight = contentHeight % pageHeight;
                    page.style.height = lastPageHeight + "px";

                    html2canvas(page, {

                        onrendered: function(canvas) {

                            var pageData = canvas.toDataURL('image/jpeg');

                            pdf = pdf.addPage();
                            pdf.addImage(pageData, 'JPEG', 0, 0,pdfFormat[format][0], pdfFormat[format][1]/pageHeight*lastPageHeight);

                            document.body.removeChild(page);
                            document.body.removeChild(content);

                            onSuccess && onSuccess();

                            pdf.save(pdfName);

                        }
                    });


                });

            }
                        
            
        }

        html2canvas(content, {

            // 渲染完成时调用，获得 canvas
            onrendered: function(canvas) {

                // 从 canvas 提取图片数据
                var imgData = canvas.toDataURL('image/jpeg');
                
                renderPages(imgData);

            }
        });
    }