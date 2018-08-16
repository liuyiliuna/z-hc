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
                  console.log('res2', res);
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
                      </li>'
                      + sDrGoodRender +
                      '<li class="fl">\
                       <a href="javascript:void(0)">\
                        <span class="sk8">查看更多</span>\
                      </a>\
                    </li>'
                      '</ul>';
                  var $oTabContent = $('.tab-content');
                  var sRightRender  = '<div class="tab-right clearfix fl">'+sDrNameRender+sDrRankRender+sDrGoodRender+'</div>';
                  $oTabContent.html(
                    sPicRender + 
                    sRightRender
                  );

                  

                  // 添加表格中的数组
                  var part_4 = res.data.part_4;
                  console.log(part_4);
                  // 时间
                  var time = part_4[0];
                  console.log(time);
                  $.each(time, function (index, item) {
                    $(".time-tr1").append('<td>' + item + '</td>')
                  });
                  var part_5 = res.data.part_5;
                  var tr11 = part_5[0];
                  for (var i = 0; i < tr11.length; i++) {
                    $(".week2-tr1").append('<td>' + tr11[i] + '</td>');
                  };
                  // 预约
                  var time_tr2 = part_4[1];
                  console.log(time_tr2);
                  for (var i = 0; i < time_tr2.length; i++) {
                    $(".time-tr2").append('<td class=' + time_tr2[i] + '></td>');
                  };
                  $(".time-tr2 td[class='1']").append('<span class="yuyue">预约</span>');
                  var time_tr3 = part_4[2];
                  console.log(time_tr3);
                  for (var i = 0; i < time_tr3.length; i++) {
                    $(".time-tr3").append('<td class=' + time_tr3[i] + '></td>');
                  };
                  $(".time-tr3 td[class='1']").append('<span class="yuyue">预约</span>');
        
                  //part_5部分 预约
                  var time_tr2 = part_5[1];
                  console.log(time_tr2);
                  for (var i = 0; i < time_tr2.length; i++) {
                    $(".week2-tr2").append('<td class=' + time_tr2[i] + '></td>');
                  };
                  $(".week2-tr2 td[class='1']").append('<span class="yuyue">预约</span>');
                  var time_tr3 = part_5[2];
                  for (var i = 0; i < time_tr3.length; i++) {
                    $(".week2-tr3").append('<td class=' + time_tr2[i] + '></td>');
                  };
                  $(".week2-tr3 td[class='1']").append('<span class="yuyue">预约</span>');
                },
                error: function () {

                }
              })

            })
          });

          $aTabHead.eq(0).mouseover();


          // 遍历每个li添加鼠标移入事件获取医生详情
          // $(".team-tab").find("li").each(function (index, item) {
          //   $(".team-tab li").eq(index).mouseover(function () {
          //     // 获取当前li的索引
          //     var $index = $(this).index();
          //     alert($index);
          //     var docId = res.data[$index].id;
          //     console.log(docId);
          //     $.ajax({
          //       type: "post",
          //       url: "http://tp.hczxy.com/pc/ajax/getDocDetail",
          //       data: {
          //         id:docId
          //       },
          //       dataType: "json",
          //       success: function (res) {
          //         var part_1 = res.data.part_1;
          //         // console.log(part_1);
          //         // var part_2 = res.data.part_2;
          //         // console.log(part_2);
          //         $(".tab-content").html('');
          //         $(".tab-content").html('<div class="tab"><div class="tab-left fl"><a href=""><img src='+part_1.picture+' /></a></div></div>');
          //       },
          //       error: function () {

          //       }
          //     })
          //   })
          // });

        }
      },
      error: function () {

      }
    })






    // $.ajax({
    //   type: "get",
    //   url: "http://tp.hczxy.com/pc/ajax/getDocLabel",
    //   dataType: "json",
    //   success: function (data) {
    //     console.log(data);
    //     if (data.flag == 1) {
    //       $.each(data.data, function (index, item) {
    //         $(".team-tab").append('<li class="fl" id=' + item.id + '>\
    //         <a href="">' + item.title + '</a>\
    //         </li>');
    //       });
    //       $(".team-tab li:first").addClass("team-bg");
    //       //医生
    //       var docId = data.data[0].id; //初始化
    //       $.ajax({
    //         type: "post",
    //         url: "http://tp.hczxy.com/pc/ajax/getDocDetail",
    //         data: {
    //           id: docId
    //         },
    //         dataType: "json",
    //         success: function (data) {
    //           if (data.flag == 1) {
    //             console.log(data);
    //             var msg = data.data;
    //             $(".doc-title").append('<h2 class="fl">' + msg.part_1.title + '</h2>\
    //             <span class="sp">' + msg.part_1.position + '</span>\
    //             <span class="sp">' + msg.part_1.pos_title + '</span>');
    //             $(".tab-left a").append('<img src="http://tp.hczxy.com/Uploads/gb_doc_pic/2018-03-14/5aa8b3c53aa98.jpg" />');
    //             var part_2 = msg.part_2;
    //             $.each(part_2, function (index, value) {
    //               $(".pr-ad").append('<li>' + value + '</li>');
    //             });
    //             var part_3 = msg.part_3;
    //             $.each(part_3, function (index, value) {
    //               // console.log(value);
    //               $(".index-skill .more").before('<li class="fl">\
    //               <a href="">' + value + '</a>\
    //             </li>')
    //             });

    //             // 表格部分
    //             var part_4 = msg.part_4;
    //             console.log(part_4);
    //             // 时间
    //             var time_tr1 = part_4[0];
    //             console.log(time_tr1);
    //             $.each(time_tr1, function (index, item) {
    //               $(".time-tr1").append('<td>' + item + '</td>')
    //             });
    //             var part_5 = msg.part_5;
    //             var tr11 = part_5[0];
    //             for (var i = 0; i < tr11.length; i++) {
    //               $(".week2-tr1").append('<td>' + tr11[i] + '</td>');
    //             };
    //             // 预约
    //             var time_tr2 = part_4[1];
    //             console.log(time_tr2);
    //             for (var i = 0; i < time_tr2.length; i++) {
    //               $(".time-tr2").append('<td class=' + time_tr2[i] + '></td>');
    //               // $(".time-tr2 td[class='1']").addClass("yuyue").html("预约");宽高不起作用
    //             };
    //             $(".time-tr2 td[class='1']").append('<span class="yuyue">预约</span>');
    //             var time_tr3 = part_4[2];
    //             console.log(time_tr3);
    //             for (var i = 0; i < time_tr3.length; i++) {
    //               $(".time-tr3").append('<td class=' + time_tr3[i] + '></td>');
    //             };
    //             $(".time-tr3 td[class='1']").append('<span class="yuyue">预约</span>');

    //             //part_5部分 预约
    //             var time_tr2 = part_5[1];
    //             console.log(time_tr2);
    //             for (var i = 0; i < time_tr2.length; i++) {
    //               $(".week2-tr2").append('<td class=' + time_tr2[i] + '></td>');
    //             };
    //             $(".week2-tr2 td[class='1']").append('<span class="yuyue">预约</span>');
    //             var time_tr3 = part_5[2];
    //             for (var i = 0; i < time_tr3.length; i++) {
    //               $(".week2-tr3").append('<td class=' + time_tr2[i] + '></td>');
    //             };
    //             $(".week2-tr3 td[class='1']").append('<span class="yuyue">预约</span>');
    //           }
    //         }
    //       })
    //     }
    //   },
    //   error: function () {}
    // })
  };

  // 名医团队
  // $(".team-tab").on("mouseover", "li", function () {
  //   var _index = $(this).index();
  //   $(".tab-content .tab").hide();
  //   $(".tab-content .tab").removeClass('dn');
  //   $(".tab-content .tab").eq(_index).show();
  //   $(this).addClass("team-bg").siblings().removeClass("team-bg");
  // });
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