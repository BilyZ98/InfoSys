import tableData from './tableData.js'

export default { //导出函数
  downloadClick: function(students) {
    //alert(this.getExplorer());
    if (this.getExplorer() == 'ie' || this.getExplorer() == undefined) {
      alert(JSON.stringify(students));
      //ie不能用方法检测，返回的是undefined...
      //console.log($('.container-card-list')[0])
      //var curTbl = $('.container-card-list')[0]
      var curTbl = students
      var oXL;
      try {
        oXL = new ActiveXObject("Excel.Application") //创建AX对象excel
      } catch (e) {
        alert("无法启动Excel!\n\n如果您确信您的电脑中已经安装了Excel，" + "那么请调整IE的安全级别。\n\n具体操作：\n\n" + "工具 → Internet选项 → 安全 → 自定义级别 → 对没有标记为安全的ActiveX进行初始化和脚本运行 → 启用")
        return
      }
      var oWB = oXL.Workbooks.Add();
      var xlsheet = oWB.Worksheets(1);
      /*
      var sel = document.body.createTextRange();
      sel.moveToElementText(curTbl);
      sel.select;
      sel.execCommand("Copy");
      xlsheet.Paste();
      */
      xlsheet = this.getJsonContentForIE(xlsheet, curTbl)
      oXL.Visible = true;
      try {
        //alert("ie");
        var fname = oXL.Application.GetSaveAsFilename("数据表.xls", "Excel Spreadsheets (*.xls), *.xls");
      } catch (e) {
        print("Nested catch caught " + e);
      } finally {
        oWB.SaveAs(fname);
        //这里在excel生成后不保存关闭会报错，待处理
        oWB.Close(savechanges = false);
        oXL.Quit();
        oXL = null;
        idTmr = window.setInterval("Cleanup();", 1);
      }
    } else {
      //叫jsoncontent，实际上传入的是一个对象而不是json
      var str = this.getJsonContent(students);
      let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      //通过创建a标签实现
      var link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名，可以改成其他名字
      link.download = "数据表.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
  mubanDownload: function(tableName) {//下载表格模板
    if (this.getExplorer() == 'ie' || this.getExplorer() == undefined) {
        alert("ie");
     }
    else
    {
      //叫jsoncontent，实际上传入的是一个对象而不是json
      var str = this.getTableHead(tableName);
      //alert(str);
      let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
      //通过创建a标签实现
      var link = document.createElement("a");
      link.href = uri;
      //对下载的文件命名，可以改成其他名字
      link.download = tableData[tableName]['name'] + "表格模板.csv";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  },
  getTableHead: function(tableName) {//获得模板的表头
    var str = "";
    //alert(tableName);
    for(let item in tableData[tableName]['records'])
    {
      if(str=="") str+=tableData[tableName]['records'][item]['name'];
      else str += (","+tableData[tableName]['records'][item]['name']);
    }
    return str;
  },
  //给出保存json的全局变量然后导出，格式：[{},{},{}]
  getJsonContent: function(jsonData) {
    //console.log(tableData.length)
    var str = ''
    //表名部分
    for (let item in jsonData[0]) {
      //id转换name，先找到表
      let table = {}
      for (let ite in tableData) {
        if (item == ite) {
          table = tableData[ite]
          break;
        }
      }
      str += table['name']
      for (let record in jsonData[0][item]) {
        for (let ite in table['records']) {
          if (ite == record) {
            str += ','
          }
        }
      }
    }
    str += '\n'
    //字段名部分
    for (let item in jsonData[0]) {
      //id转换name，先找到表
      let table = {}
      for (let ite in tableData) {
        if (item == ite) {
          table = tableData[ite]
          break
        }
      }
      for (let record in jsonData[0][item]) {
        for (let ite in table['records']) {
          if (ite == record) {
            str += table['records'][ite].name
            str += ','
          }
        }
      }
    }
    str += '\n'
    //数据部分
    for (let i = 0; i < jsonData.length; i++) {
      for (let item in jsonData[i]) {
        for (let record in jsonData[i][item]) {
          //在头或尾加入制表符'\t'能让长数字的字符串不显示为科学记数法
          str = str + '\t' + jsonData[i][item][record]
          str += ','
        }
      }
      str += '\n'
    }
    return str
  },
  getJsonContentForIE: function(xlsheet, jsonData) {
    //console.log(Test.length)
    //表名部分
    let y = 0
    for (let item in jsonData[0]) {
      //id转换name，先找到表
      let table = {}
      for (let ite in tableData) {
        if (item == ite) {
          table = tableData[ite]
          break;
        }
      }
      console.log(table['name'])
      xlsheet.Cells(1, y + 1).value = table['name']
      y++
      console.log(y)
      for (let record in jsonData[0][item]) {
        for (let ite in table['records']) {
          if (ite == record) {
            y++
          }
        }
      }
    }
    //字段名部分
    y = 0
    for (let item in jsonData[0]) {
      //id转换name，先找到表
      var table = {}
      for (let ite in tableData) {
        if (item == ite) {
          table = tableData[ite]
          break;
        }
      }
      for (let record in jsonData[0][item]) {
        for (let ite in table['records']) {
          if (ite == record) {
            xlsheet.Cells(2, y + 1).value = table['records'][ite].name
            y++
          }
        }
      }
    }
    //数据部分
    for (let i = 0; i < jsonData.length; i++) {
      y = 0
      for (let item in jsonData[i]) {
        for (let record in jsonData[i][item]) {
          xlsheet.Cells(i + 3, y + 1).value = '\t' + jsonData[i][item][record]
          y++
        }
      }
    }
    return xlsheet
  },
  getExplorer: function() {
    var explorer = window.navigator.userAgent;
    //ie
    if (explorer.indexOf("MSIE") >= 0) {
      return 'ie'
    }
    //firefox
    else if (explorer.indexOf("Firefox") >= 0) {
      return 'Firefox'
    }
    //Chrome
    else if (explorer.indexOf("Chrome") >= 0) {
      return 'Chrome'
    }
    //Opera
    else if (explorer.indexOf("Opera") >= 0) {
      return 'Opera'
    }
    //Safari
    else if (explorer.indexOf("Safari") >= 0) {
      return 'Safari'
    }
  }
}
