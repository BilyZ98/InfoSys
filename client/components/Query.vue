<template>
  <div>
    <h3 class="text-center">基本信息查询</h3>
    <div class="container">
      <div class="col-md-6">
        <form class="form-horizontal">
          <div class="form-group">
            <label for="studentID" class="col-md-2 control-label innerCol">学号：</label>
            <div class="col-md-4 innerCol">
              <input type="text" class="form-control" id="studentID" placeholder="请输入学生学号">
            </div>
          </div>
          <div class="form-group innerCol">
            <label for="studentName" class="col-md-2 control-label innerCol">姓名：</label>
            <div class="col-md-4 innerCol">
              <input type="text" class="form-control" id="studentName" placeholder="学生姓名">
            </div>
          </div>
          <div class="form-group innerCol">
            <div class="col-dm-offset-2 col-dm-4 innerCol">
              <div class="checkbox">
                <label>
                  <input type="checkbox" checked> 选项框
                </label>
              </div>
            </div>
          </div>
        </form>
        <div>
          <label>请选择年级：</label>
          <select class="form-control" id="selectGrade">
            <option>2012</option>
            <option>2013</option>
            <option>2014</option>
            <option>2015</option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
          </select>
        </div>
        <div>
          <label>请选择专业：</label>
          <select multiple class="form-control" id="selectMajor">
            <option>软件工程</option>
            <option>计算机类</option>
            <option>信息与计算科学</option>
          </select>
        </div>
      </div>
      <div class="col-md-6">
        <div>其他查询条件</div>
        <div class="col-dm-4 col-dm-offset-1 innerCol">
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" checked> 男
          </label>
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"> 女
          </label>
          <label class="radio-inline">
            <input type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"> 其他
          </label>
        </div>
        <div class="col-md-5 col-dm-offset-1 innerCol">
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox1" value="option1"> test1
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox2" value="option2"> test2
          </label>
          <label class="checkbox-inline">
            <input type="checkbox" id="inlineCheckbox3" value="option3"> test3
          </label>
        </div>
      </div>
      <div class="col-md-1 col-md-offset-11">
        <button type="button" class="btn btn-primary" id="btnSend" @click="queryClick">查询</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return { }
  },
  methods: {
    queryClick () {
      this.$router.push({
        //这里只有用name导航才能通过params成功传递参数，用path就不可以,另一个问题是list页面刷新后会丢失params
        name:'list',
        params: {
            sid: $('#studentID').val()
        }
      })
    }
  }
}
</script>

<style>

/*-------------*/

[class*="col-"] {
  padding-top: 15px;
  padding-bottom: 15px;
  background-color: #eee;
  background-color: rgba(86, 61, 124, 0.1);
  border: 1px solid #ddd;
  border: 1px solid rgba(86, 61, 124, .2);
}

.innerCol {
  border: 0px;
  background-color: transparent;
  padding: 5px;
}

.col-md-1 {
  background-color: #fff;
  border: 0px
}
</style>
