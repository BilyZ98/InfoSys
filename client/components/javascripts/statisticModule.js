import tableData from './tableData.js'
import Highcharts from 'highcharts'

export default {
  createCharts: function(tableId, statData, barDom, pieDom) {
    /**
     * 图表配置
     */
    //bar
    var optionsBar = {
      chart: {
        type: 'bar'
      },
      title: {
        text: '条形统计图'
      },
      xAxis: {
        categories: [] // x 轴分类
      },
      yAxis: {
        title: {
          text: '' // y 轴标题
        },
        allowDecimals: false
      },
      series: [],
      credits: { //右下角链接
        enabled: false
      }
    }
    //pie
    var optionsPie = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
      },
      title: {
        text: '饼状统计图'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
            style: {
              color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
          }
        }
      },
      series: [{
        type: 'pie',
        name: '人数',
        data: []
      }],
      credits: {
        enabled: false
      }
    }

    //pie
    var pieArr = []
    var totalNum = 0
    for (let i = 0; i < statData.length; i++) {
      totalNum += statData[i]['statistic']
    }
    //bar
    for (let i = 0; i < statData.length; i++) {
      let statArr = statData[i]
      //xAxis
      let str = ''
      for (let item in statArr) {
        if (item != 'statistic')
          str = str + statArr[item] + ' '
      }
      optionsBar['xAxis']['categories'].push(str)
      //series
      let arr = []
      for (let j = 0; j < statData.length; j++) {
        arr[j] = 0
      }
      arr[i] = statArr['statistic']
      optionsBar['series'][i] = {}
      optionsBar['series'][i]['name'] = str
      optionsBar['series'][i]['data'] = arr
      //pie
      optionsPie['series'][0]['data'][i] = [str, 100 * statArr['statistic'] / totalNum]
      // 图表初始化函数
      Highcharts.chart(barDom, optionsBar)
      Highcharts.chart(pieDom, optionsPie)
    }
  }
}