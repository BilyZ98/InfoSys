	var imgArray = $('.container')[0].getElementsByTagName('img');
	var down = new downLoad(imgArray);
	down.init(document.getElementById('info-print'),$('.container')[0],'学生信息','a4');
	// new Vue({
	// 	el:".container",
	// 	data: {
	// 		basicInfo : {
	// 			name : "dawe",
	// 			sid : "dagie"
	// 		}
	// 	}
	// })
	// new Vue({
	// 	el:"#test",
	// 	data: {
	// 		course: {}
	// 	}
	// });
	// function down() {
 //            var dd = {
 //                content: [
 //                    $(".container").html()
 //                ],
 //                defaultStyle: {
 //                    font: '方正姚体'
 //                }
 //            };
 //            pdfMake.fonts = {
 //                Roboto: {
 //                    normal: 'Roboto-Regular.ttf',
 //                    bold: 'Roboto-Medium.ttf',
 //                    italics: 'Roboto-Italic.ttf',
 //                    bolditalics: 'Roboto-Italic.ttf'
 //                },
 //                方正姚体: {
 //                    normal: 'FZYTK.TTF',
 //                    bold: 'FZYTK.TTF',
 //                    italics: 'FZYTK.TTF',
 //                    bolditalics: 'FZYTK.TTF',
 //                }
 //            };
 //            pdfMake.createPdf(dd).download();
 //        }
 // $(document).ready(function(){
 // 	$("#info-print").click(function() {
 // 		html2canvas($(".container"), {
 //        onrendered: function(canvas) {

 //            //通过html2canvas将html渲染成canvas，然后获取图片数据
 //            var imgData = canvas.toDataURL('jpeg');

 //            //初始化pdf，设置相应格式
 //            var doc = new jsPDF("p", "mm", "a4");

 //            //这里设置的是a4纸张尺寸
 //            doc.addImage(imgData, 'JPEG', 0, 0,210,297);

 //            //输出保存命名为content的pdf
 //            doc.save('content.pdf');
 //        }
 //    });
 // 	})
 // });

// $(document).ready(function() {
// 	$("#info-print").click(function(){
// 		html2canvas($(".container"), {
//         onrendered: function(canvas) {

//             //通过html2canvas将html渲染成canvas，然后获取图片数据
//             var imgData = canvas.toDataURL('image/jpeg');

//             //初始化pdf，设置相应格式
//             var doc = new jsPDF("p", "mm", "a4");

//             //这里设置的是a4纸张尺寸
//             doc.addImage(imgData, 'JPEG', 0, 0,210,297);

//             //输出保存命名为content的pdf
//             doc.save('content.pdf');
//         }
//     	});
// 	})
// });