;(function() {
  var oSelect = document.getElementsByClassName('J_select')[0],
      //省
      oProvince = oSelect.getElementsByClassName('province')[0],
      oProvinceDropdown = oProvince.getElementsByClassName('dropdown')[0],
      oProvinceRes = oProvince.getElementsByClassName('res')[0],
      //市
      oCity = oSelect.getElementsByClassName('city')[0],
      oCityDropdown = oCity.getElementsByClassName('dropdown')[0],
      oCityRes = oCity.getElementsByClassName('res')[0],
      //县
      oArea = oSelect.getElementsByClassName('area')[0],
      oAreaDropdown = oArea.getElementsByClassName('dropdown')[0],
      oAreaRes = oArea.getElementsByClassName('res')[0],
      jsonDatas = [];

  var resCache = {};  //给后端联动数据

  var dropdownHeight = '200px';  //item高度  max-height需到css文件修改

  var init = function () {
    getJson()
    bindEvent()
  }

  function getJson() {
    $.ajax({
      url: 'js/data.json',
      type: 'GET',
      success: function (data){
        jsonDatas = data.data;

        _initProvinces(jsonDatas)
      }
    })
  }
  function bindEvent() {
    oSelect.addEventListener('click', selectClick, false);
    document.addEventListener('click', closeOptions, true);
  }

  function selectClick(e) {
    var e = e || window.event,
        tar = e.target || e.srcElement,
        className = tar.className;

    switch(className) {

      //省init
      case 'res province':
        oProvinceDropdown.style.height = dropdownHeight;
        oCityDropdown.style.height = '0px';
        oAreaDropdown.style.height = '0px';
      break;

      //show市
      case 'res city':
        if(resCache.province) {
          oCityDropdown.style.height = dropdownHeight;
        }
      break;

      //选择省
      case 'dd-item province':
        var text = tar.innerHTML;
        resCache.province = text;
        oProvinceRes.innerHTML = text;

        oCityRes.innerHTML = '选择市';
        oAreaRes.innerHTML = '选择区/县';
        resCache.city = '';
        resCache.area = '';
        console.log(resCache)

        _initCity(jsonDatas, resCache.province);
      break;

      //选择市
      case 'dd-item city':
        var text = tar.innerHTML;
        resCache.city = text;
        oCityRes.innerHTML = text;
        resCache.city = text;

        oAreaRes.innerHTML = '选择区/县';
        resCache.area = '';
        console.log(resCache)

        _initArea(jsonDatas, resCache.province, resCache.city);
      break;

      //show县
      case 'res area':
        if(resCache.city) {
          oAreaDropdown.style.height = dropdownHeight;
        }
      break;

      //选择县
      case 'dd-item area':
        var text = tar.innerHTML;
        oAreaRes.innerHTML = text;
        resCache.area = text;
        console.log(resCache)
      break;
    }
  }

  //隐藏Dropdown
  function closeOptions() {
    oProvinceDropdown.style.height = '0px';
    oCityDropdown.style.height = '0px';
    oAreaDropdown.style.height = '0px';
  }

  //省
  function _initProvinces(data){
    var provinceArr = [],
        list = '';

    for (var province in data) {
      provinceArr.push(province);
    }

    provinceArr.forEach( (el) => {
      list += `<li class="dd-item province">${el}</li>`;
    })

    oProvinceDropdown.innerHTML = list;
  }

  //市
  function _initCity(data, provinceres){
    var cityArr = [],
        list = '';

    for (var city in data[provinceres]) {
      cityArr.push(city);
    }

    cityArr.forEach( (el) => {
      list += `<li class="dd-item city">${el}</li>`;
    })

    oCityDropdown.innerHTML = list;
  }

  //县
  function _initArea(data, provinceres, city) {
    var areaArr = data[provinceres][city],
        list = '';

    areaArr.forEach( (el) => {
      list += `<li class="dd-item area">${el}</li>`;
    })

    oAreaDropdown.innerHTML = list;
  }

  /* 
  函数式编程

    1.抽象函数
    2.函数提纯
    3.用纯函数，偏函数，函数组合，函数柯里化，函数扁平化，高阶函数编程
  */
  init()
})()

