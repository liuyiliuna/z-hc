$(function () {

  getDoc();

  function getDoc() {
    $.ajax({
      type: "post",
      url: "http://tp.hczxy.com/pc/ajax/getDocLabel",
      dataType: "json",
      success: function (res) {
        if (res.flag === 1) {
          console.log('res', res);

          var drHeadData = res.data;
          var $oTabHeadContainer = $(".team-tab");
          var sTabRender = '';
          $.each(drHeadData, function (index, item) {
            sTabRender +=
              '<li class="fl">\
              <a href="">' + item.title + '</a>\
            </li>'
          });
          $oTabHeadContainer.html(sTabRender);


          // 遍历每个li添加鼠标移入事件
          $aTabHead = $oTabHeadContainer.children('li');
          $aTabHead.each(function (index) {
            var $this = $(this);
            $this.on("mouseover", function () {
              $aTabHead.removeClass('team-bg');
              $this.addClass('team-bg');

              // 获取当前的索引
              var index = $this.index();
              // 获取医生id
              var docId = drHeadData[index].id;
              // 获取医生详情
              $.ajax({
                type: "post",
                url: "http://tp.hczxy.com/pc/ajax/getDocDetail",
                data: {
                  id: docId
                },
                dataType: "json",
                success: function (res) {
                  // console.log('res2', res);
                  //  追加到页面中
                  //  获取医生列表内容part_1;
                  var part_1 = res.data.part_1;
                  // 医生照片
                  var sPicRender =
                    '<div class="tab-left fl">\
                      <a href="">\
                        <img src="' + part_1.picture + '" />\
                      </a>\
                    </div>';

                  // 医生名称
                  var sDrNameRender =
                    '<div class="doc-title">\
                      <h2 class="fl">' + part_1.title + '</h2>\
                      <span class="sp">' + part_1.position + '</span>\
                      <span class="sp">' + part_1.pos_title + '</span>\
                    </div>';

                  // 医生荣誉
                  var part_2 = res.data.part_2;
                  var sDrRankRender = '';
                  $.each(part_2, function (index, rank) {
                    sDrRankRender += '<li>' + rank + '</li>';
                  });
                  sDrRankRender = '<ul class="pr-ad">' + sDrRankRender + '</ul>';

                  // 添加病种
                  var part_3 = res.data.part_3;
                  var sDrGoodRender = '';
                  $.each(part_3, function (index, dis) {
                    sDrGoodRender +=
                      '<li class="fl">\
                        <a href="javascript:void(0)">' + dis + '</a>\
                      </li>';
                  });
                  var sDrGoodRender =
                    '<ul class="index-skill clearfix">\
                      <li class="fl">\
                        <a href="javascript:void(0)">\
                          <span class="sk1">擅长领域</span>\
                        </a>\
                      </li>' +
                    sDrGoodRender +
                    '<li class="fl">\
                       <a href="javascript:void(0)">\
                        <span class="sk8">查看更多</span>\
                      </a>\
                    </li>'
                  '</ul>';

                  // 添加表格
                  // part_4部分
                  var part_4 = res.data.part_4;
                  var sTable = '';
                  // 时间
                  var time = part_4[0];
                  var sDataTime = ''
                  $.each(time, function (index, time) {
                    sDataTime +=
                      '<td>' + time + '</td>';
                  });

                  // 预约
                  var time_tr2 = part_4[1];
                  var sReservation = ''
                  $.each(time_tr2, function (index, yuyue) {
                    sReservation +=
                      '<td class=' + yuyue + '></td>';
                  });

                  var time_tr3 = part_4[2];
                  var sReservation1 = ''
                  $.each(time_tr3, function (index, yuyue) {
                    sReservation1 +=
                      '<td class=' + yuyue + '></td>';
                  });

                  // part_5部分
                  var part_5 = res.data.part_5;
                  // 时间
                  var time1 = part_5[0];
                  var oDataTime = ''
                  $.each(time1, function (index, time) {
                    oDataTime +=
                      '<td>' + time + '</td>';
                  });
                  // 预约
                  var time_tr22 = part_5[1];
                  var oReservation = ''
                  $.each(time_tr22, function (index, yuyue) {
                    oReservation +=
                      '<td class=' + yuyue + '></td>';
                  });
                  var time_tr33 = part_5[2];
                  var oReservation1 = ''
                  $.each(time_tr3, function (index, yuyue) {
                    oReservation1 +=
                      '<td class=' + yuyue + '></td>';
                  });
               
                  var sTable = '<table class="order-time">\
                  <tr>\
                    <td class="sw change td-bg1"></td>\
                    <td rowspan="3" class="index-apt">\
                      <div class="apt-time">\
                        <div class="time clearfix">\
                          <table class="fl">\
                            <tr>\
                             ' + sDataTime + '\
                            </tr>\
                            <tr class="time-tr1">\
                              ' + sReservation + '\
                            </tr>\
                            <tr class="time-tr1">\
                              ' + sReservation1 + '\
                            </tr>\
                          </table>\
                         <table class="fl">\
                            <tr>\
                              ' + oDataTime + '\
                            </tr>\
                            <tr class="time-tr1">\
                            ' + oReservation + '\
                            </tr>\
                            <tr class="time-tr1">\
                            ' + oReservation1 + '\
                            </tr>\
                          </table>\
                        </div>\
                      </div>\
                    </td>\
                    <td class="sw change td-bg2"></td>\
                  </tr>\
                  <tr>\
                    <td class="sw">上午</td>\
                    <td class="sw">\
                    </td>\
                  </tr>\
                  <tr>\
                    <td class="sw">下午</td>\
                    <td class="sw"></td>\
                  </tr>\
                </table>';
                  var $oTabContent = $('.tab-content');
                  var sRightRender = '<div class="tab-right clearfix fl">' + sDrNameRender + sDrRankRender + sDrGoodRender + sTable + '</div>';
                  $oTabContent.html(
                    sPicRender +
                    sRightRender
                  );
                  // 添加预约      
                  var yuyue = $(".time-tr1 td[class='1']");
                  yuyue.html('<span class="yuyue">预约</span>');
                  // 表格左右滑动  
                  $(".change").click(function () {
                    var _index = $(this).index();
                    if (_index == 0) {
                      $(".apt-time .time").stop().animate({
                        left: 0
                      }, 500)
                    }
                    if (_index == 2) {
                      $(".apt-time .time").stop().animate({
                        left: -700
                      }, 500)
                    }
                  });
                },
                error: function () {

                }
              })
            })
          });
          $aTabHead.eq(0).mouseover();
        }
      },
      error: function () {

      }
    })
  };
  // banner切换
  var unslider06 = $('#b06').unslider({
      speed: 1,
      delay: 2000,
    }),
    data06 = unslider06.data('unslider');

  // 讲堂切换
  $(".slider-box").slide({
    mainCell: ".bd ul",
    autoPage: true,
    effect: "left",
    autoPlay: true,
  });
  // 图片切换
  function picChange(el) {
    el.mouseenter(function () {
      var _index = $(this).index();
      $(this).parent().prev().children().stop(true).animate({
        left: -300 * _index + "px"
      }, 400);
    })
  };
  var pifuke = $(".btn-list li");
  var imgs = $(".imgs .imgs-item");
  picChange(pifuke);
  picChange(imgs);

  // 导航	
  $(".navbar-list .team").hover(function () {
    $(".item-navbar").addClass("dn");
    $(".icon-bg-weizi").addClass("tf");
  }, function () {
    $(".item-navbar").removeClass("dn");
    $(".icon-bg-weizi").removeClass("tf");
  });

  $(".sidebar-title").click(function () {
    $this = $(this);
    if ($this.hasClass("active")) {
      $(".dpt-slide-list").slideUp(300, 'linear', function () {
        $this.addClass("backgroundColor");
      });
      $this.removeClass("active");
    } else {
      $this.removeClass("backgroundColor");
      $(".dpt-slide-list").slideDown(300, 'linear');
      $this.addClass("active");
    }
  });
  //回到顶部
  $(".s3").click(function () {
    $("html,body").animate({
      scrollTop: 0
    }, 200);
  });
  // 显示隐藏效果
  function adClass(el1, data1, el2) {
    el1.mouseover(function () {
      var index = $(this).index();
      $(this).addClass(data1).siblings().removeClass(data1);
      el2.next().children().eq(index).removeClass("dn").siblings().addClass("dn");
    })
  };
  // 会议设备环境
  adClass($(".list-tab li"), "bor-color", $(".list-tab"));
  // 底部
  adClass($(".footer-address li"), "active1", $(".footer-address"));
});