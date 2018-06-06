//public.js

function urlKey(keyName, newStr) {
  newStr = newStr ? newStr : location.href;
  var reg = new RegExp(keyName + "=([^&]*)(&|$)", "i");
  var keyValue = reg.test(newStr) ? reg.exec(newStr)[1] : "";
  return keyValue;
}

//锚点滚动
function LiftEffect(json) {
  var array = [];
  for (var i = 0; i < json.target.length; i++) {
    var t = $(json.target[i]).offset().top;
    array.push(t);

  }

  function Selected(index) {
    $(json.control2).children().eq(index).addClass(json.current).siblings().removeClass(json.current);
  }
  $(window).on("scroll", Check);
  var thisTag = $(json.control1);
  var startTop = thisTag.offset().top;
  var startRirct = thisTag.css("left");

  function Check() {
    var wst = $(window).scrollTop();

    if (wst >= startTop) {
      console.log(3434);
      var toBottom = $(document).height() - $(window).scrollTop() - $(window).height()
      // if ($(window).height() < 1040 && toBottom < $('#map').height()) {
      if (toBottom < $('#map').height()) {
        thisTag.css({
          'position': 'absolute',
          'left': startRirct
        });
        return
      }

      thisTag.css({
        'position': 'fixed',
        'left': thisTag.offset().left < 10 ? 10 : thisTag.offset().left,
        'top': startTop - $('.header').height()
      });
    } else {
      thisTag.css({
        'position': 'absolute',
        'left': startRirct
      });
    }

    var key = 0;
    var flag = true;
    for (var i = 0; i < array.length; i++) {
      key++;
      if (flag) {
        if (wst >= array[array.length - key] - 300) {
          var index = array.length - key;
          flag = false;
        } else {
          flag = true;
        }
      }
    }
    Selected(index);
  }

  $(json.control2).children().on("click", function() {
    //$(window).off("scroll");
    var index = $(this).index();
    Selected(index);
    var flag = true;
    for (var i = 0; i < array.length; i++) {
      if (flag) {
        if (index == i) {
          $("html,body").stop().animate({
            "scrollTop": array[i] - 50
          }, 500, function() {
            $(window).on("scroll", Check);
          });
          flag = false;
        } else {
          flag = true;
        }
      }
    }
  });
  var index = urlKey('index');
  if (index != '' && $('.lift-nav').length == 1)
    $('.lift-nav a').eq(index).click()
}

//url参数获取
function urlKey(keyName, newStr) {
  newStr = newStr ? newStr : location.href;
  var reg = new RegExp(keyName + "=([^&]*)(&|$)", "i");
  var keyValue = reg.test(newStr) ? reg.exec(newStr)[1] : "";
  return keyValue;
}


//表单验证
function valid(name) {
  var obj = $('[name=' + name + ']')
  var thisVal = obj.val()
  if (thisVal == '') {
    obj.addClass('err')
  } else {
    obj.removeClass('err')
  }
}
$(function() {

  //联系我们表单
  $('#formcontact').submit(function() {
    console.log('submit');
    valid('username');
    valid('contact');
    valid('demand');
    if ($('.err').length == 0) {
      var data = $(this).serialize();
      console.log(data);
      $(this).find('[type=submit]').attr('disabled', true).val('正在提交..')
      $.get('http://www.tederen.com/api/consult/?' + data, function(res) {
        $('#formcontact').find('[type=submit]').removeAttr('disabled').val('提交')
        $('#formcontact')[0].reset();
        $('.forminfo').text('提交成功');
        setTimeout(function() {
          $('.forminfo').text('');
        }, 3000)
      })
    }
    return false;
  })
  if ($('.lift-nav').length > 0) {
    LiftEffect({
      "control1": ".lift-nav", //侧栏电梯的容器
      "control2": ".lift", //需要遍历的电梯的父元素
      "target": [".t1", ".t2", ".t3", ".t4", ".t5", ".t6", ".t7", ".t8", ".t9", ".t10"], //监听的内容，注意一定要从小到大输入
      "current": "active" //选中的样式
    });
  }

  // 图片懒加载
  // $("img[data-original]").lazyload({
  //   effect: "fadeIn",
  //   // placeholder : "Img/load.gif"
  // });
})


//aos
if (window.AOS)
  AOS.init({
    easing: 'ease-in-out-sine',
    duration: 800
  });

//案例详情
var obj = $('#casedetail')
var id = urlKey('id');
if (obj.length > 0 && id != '') {
  var dataList = [{
      name: '鼎级剧场',
      time: '2017年6月-10月',
      industry: '影音视频播放行业',
      describe: '<p>时代华纳集团HBO电视网-鼎级剧场是美国华纳环球影业在中国大陆地区唯一合作伙伴，该项目的设计研发包括App端、Ipad端及Web端。HBO原创内容「鼎级剧场」，包括HBO原创内容在内的欧美大片和流行剧集的包月视频点播服务。此次APP端开发包含IOS和Android两个版本，设计风格区别于国内大多数影音应用，产品在设计上更加贴近终端用户使用习惯，页面简洁明了、操作简单，带给用户前所未有的视觉体验，用户观看数呈指数式增长，为企业营销带来有效的助力。</p> <ul> <li>采用最为先进的流媒体加密技术，实现视频源加密播放和解密播放，在满足多类型视频源播放的同时，达到的加密保护作用。</li> <li>满足多种移动支付方式，从用户使用需求出版，方便快捷；</li> <li>实现用户直接手机投屏电脑、电视等支持投影设备的新型操作；</li> <li>技术上研发了儿童锁功能。满足用户隐私保护；</li> <li>研发种加入影片评论、订阅、资讯动态、最新上架影片提醒、获奖节日单通知、预告片和幕后花絮管理、设备管理一系列功能。</li> </ul>'
    },
    {
      name: '卓越课堂',
      time: '2017年3月-5月',
      industry: '教育线上学习行业',
      describe: '<p>卓越课堂是为满足学校小考的需求为开发定制性产品，项目采用先进的图像智能识别技术和大数据分析技术，实现了试题智能识别、数据精准上传和错题统计分析等功能。同时，卓越课堂PC增加开发了后台管理平台，更加便于学校在日常管理工作中的应用。</p> <p>卓越课堂APP的以教育与课程改革为原则，以学生发展为核心理念，以转变教学模式和学习方式为目标，实现教学过程中师生的近距离沟通，理想化管理，突破传统教育鸿沟。</p> <ul><li> 在线直播：打破空间障碍，拉近学生与老师距离，感受轻松有趣的课堂。 </li> <li> 直播回放：1分钟生成直播回放，永久保存直播内容。 </li> <li> 在线点播：突破师资限制，生源不限，节约成本，充分利用明师资源。 </li> <li> 资料共享：能够在线浏览课件，同时可以开放课件下载权限。 </li> <li> 课程标签：每个机构都可以自定义课程标签，搭建自己专属的课程体系。 </li> <li> 在线支付：完整的支付流程，打通线上选课、支付、学习整个完整环节。 </li></ul>'
    },
    {
      name: '师说365',
      time: '2016年11月-2017年4月',
      industry: '教育线上管理行业',
      describe: '<p>由山东新坐标教育推出的一款手机在线学习app。师说365 app致力于教育数字化的软件研发和平台运营，共有一课一网、智能组案、智能组卷、智能组课件、在线考试、微课视频等功能，所有内容均精编精校，打造一个优质的教学平台，满足了包括授课老师、学生和家长三个不同角色在平台中的个性化需求。</p> <ul> <li>名师讲堂：名师的在线展示平台，包括教师介绍、专业领域、教学方式、课程介绍等功能设计。</li> <li>优课资源：优质课程资源的在线展示和传播平台，学习者可在线订购所学课程，并实现在线测试、在线学习、在线考试以及学习资料下载等功能。</li> <li>翻转课堂：满足教师线下教育和学生的线下学习的同时，实现课前预习、线上教学、在线讨论、在线提问、在线应答、在线考试等功能。</li> <li>万校优培：定位于线上辅导班与线上培训机构。培训机构通过在线展示特色培训课程与内容，学习者可在线选择学校、在线订购课程、在线学习和考试等。</li> </ul>'
    },
    {
      name: '试卷批阅',
      time: '2017年7月-12月',
      industry: '教育考试管理行业',
      describe: '<p>该系统通过采用国内外先进图像识别技术，可以对普通纸张印刷而成的答题卡进行快速的高度识别并完成后期的在线处理，从而完成的试卷智能批阅流程。系统在设计上不用改变老师批改习惯，实现客观题自动阅、主观题手动阅（系统识别得分），自动结分得快速阅卷目的，将老师从枯燥的阅卷工作中彻底解放出来，并全面的数据分析系统让老师更加精准、快速、轻松的提高教学质量，及时发现孩子成绩的波动情况并分析成绩波动原因给予家长相关建议，随时随地掌握孩子在校表现，进行满足更为高效、优质的教学过程。该项目包括APP和Web端，主要功能设计包括：</p> <ul> <li>智能识别：识别效率高，准确率高达99.9%，出错率低，查错与纠错能力强。</li> <li>数据分析：每题分析、分数综合性分析，实时查看学生练习、考试情况，协助学科老师制定应对方案。</li> <li>智能筛选：阅卷教师可登陆批阅系统查询考生试卷，支持在线分析试卷和按试题得分检索考生答卷。</li> <li>智能分析：可以生成不同使用者需要的报表，通过不同表示形式表现出来，并且针对不同学校要求，</li> <li>定制个性化报表，可及时打印。同时，还能智能生成学生错题试题，方便针对性复习。</li> <li>错题整理：自动创建错题本，错题管理，错题重练，针对薄弱环节重点出击。</li> <li>智能管理：试卷调取方便、批阅痕迹清晰、试卷电子存档。</li> <li>对点补救：可以全面了解学生学习情况，有针对性的进行教导，因材施教。</li> </ul>'
    },
    {
      name: '晓语典',
      time: '2017年6月-8月',
      industry: '教育资源分享行业',
      describe: '<p>晓语典项目定位于专业互动的语文在线资源共享平台。用户可在平台上实现优秀教学资源的分享和传播，同时产生个人收益。同时，平台上丰富的、国内专家的优质语文学习资源可满足不同类型学习者的知识获取。该项目包括web端和微信端，主要核心功能应用包括：</p> <ul> <li>语碘教育：悬赏定制、教子有方、归类学习、名师讲堂、练习</li> <li>语典资源：作文、修辞、积累、听阅、课件</li> <li>语典宝库：我的、语点交易、语典圆梦、语典书城、语典好物</li> </ul>'
    },
    {
      name: '现代财经',
      time: '2016年6月-8月',
      industry: '金融服务行业',
      describe: '<p>该项目是为天津财经大学《现代财经》期刊部定制开发的数字出版平台，是传统出版向数字出版转型升级的典型应用。平台在整体架构设计上了早读分享、精品导读以及在线交流等特色功能，同时实现了平台与刊物在线投稿、新刊推送、过刊浏览、稿件查询等系统的无缝对接，从而大大提升了刊物的传播力和出版响应速度，满足了刊物的读者、作者和期刊部之间的信息传递和交互需求，为期刊的转型升级发展提供了支持！</p>',
    },
    {
      name: '康医生',
      time: '2017年12月-2018年4月',
      industry: '医疗在线服务行业',
      describe: '<p>康医生医疗平台是一款整合了各类医学大数据资源、医疗资源的智能问诊系统，是个人终身的私人医生，系统基于互联网及人工智能等技术实现了涵盖：医学检验结果智能分析、在线自诊、健康科普、医生助手等系列应用，为解决民众的就医、健康以及医疗资源充分利用等问题提供了有效解决途径。</p>'
    },
    {
      name: '美农',
      time: '2017年6月-8月',
      industry: '农业现代化行业',
      describe: '<p>美农微信平台项目，定位于建立线上的动物医药销售体系、积分体系和返现体系，实现生活宠物网上医疗体验和在线交互渠道。产品在设计上页面清晰，操作简单，进一步为企业开拓营销渠道。</p>',
    },
    {
      name: '易电',
      time: '2016年2月-5月',
      industry: '电子商务行业',
      describe: '<p>项目根据客户需求，遵循快捷、省时、省事的原则，定位于企业级用电实时查看工具。功能设计上实现APP端与企业用电系统的绑定，通过人性化设计，满足用户随时随地点击查看，大大提升了用户的工作效率！</p>'
    }
  ];
  console.log(Number(id));
  if (Number(id) < dataList.length) {
    obj.find('.logobox').html('<img src="Img/other/服务案例_' + dataList[id].name + '.png" />');

    obj.find('.name').html(dataList[id].name);
    obj.find('.time').html(dataList[id].time);
    obj.find('.industry').html(dataList[id].industry);
    obj.find('.describe').html(dataList[id].describe);

    var imgHtml = '';
    var len = id == 8 ? 4 : 5;
    for (var i = 1; i < len; i++) {
      imgHtml += '<li><img src="Img/case/' + dataList[id].name + '/' + i + '.jpg" /></li>';
    }
    obj.find('.pageui').html(imgHtml);
  }
}


//案列跳转
$('#goodlist a').click(function() {
  location.href = 'casedetail.html?id=' + $(this).parents('li').index()
})


//map
var map = new AMap.Map('map', {
  resizeEnable: true,
  zoom: 15,
  center: [104.061086, 30.578114]
});
map.setMapStyle('amap://styles/light');
var marker = new AMap.Marker({
  position: [104.061086, 30.578114]
});
marker.setMap(map);
