$(function(){

	// 获取图片长度
	var size = $('.section-1_word .section-1_round').length;
	// 插入和图片对应长度的li
	for(var i = 0; i < size; i++){
		$('.section-1_round-ul').append('<li></li>')
	}

	// 初始化轮播样式
	$('.section-1_word .section-1_round').eq(0).show();
	$('.section-1_round-ul li').eq(0).addClass('section-1_round-ul-active');

	var i = 0;
	
	// 手动轮播
	$('.section-1_round-ul li').click(function(){
		$(this).addClass('section-1_round-ul-active').siblings().removeClass('section-1_round-ul-active');
		var idx = $(this).index();
		i = idx;
		$('.section-1_word .section-1_round').eq(idx).fadeIn().siblings('.section-1_round').fadeOut();
	})

	// 鼠标划入停止动画
	$('.section-1_word').hover(function(){
		clearInterval(timeMove);
		$('.section-1_round-lr').show();
	},function(){
		timeMove=setInterval(move,3000)
		$('.section-1_round-lr').hide();
	})

	// 自动轮播
	var timeMove = setInterval(move,2000)

	// 点击右切换图片
	$('.section-1_round-right').click(function(){
		move()
	})

	// 点击左切换图片
	$('.section-1_round-left').click(function(){
		leftMove()
	})

	// 向左切换图片
	function leftMove(){
		i--;
		if(i == -1){
			i = size-1;
		}
		$('.section-1_round-ul li').eq(i).addClass('section-1_round-ul-active').siblings().removeClass('section-1_round-ul-active');
		$('.section-1_word .section-1_round').eq(i).fadeIn().siblings('.section-1_round').fadeOut();
	}

	// 图片切换
	function move(){
		i++;
		if(i >= size){
			i = 0;
		}
		$('.section-1_round-ul li').eq(i).addClass('section-1_round-ul-active').siblings().removeClass('section-1_round-ul-active');
		$('.section-1_word .section-1_round').eq(i).fadeIn().siblings('.section-1_round').fadeOut();
	}



	// 图片懒加载
	var $img = $('.section-2_title-word > img');
	var $win = $(window);
	var timer = null;

	bindEvent()
	load()

	// 绑定懒加载事件 并事件稀释
	function bindEvent(){
		$win.on('resize scroll',function(){
			if(timer) return

			timer=setTimeout(function(){
				load();
				timer = null
			},250)
			
		})
	}
	
	// 检测图片位置
	function pro(elem){
		return $win.scrollTop() + $win.height() >= $(elem).offset().top;
	}

	// 显示图片
	function look(elem){
		elem.src = $(elem).data('src');
	}

	// 加载图片
	function load(){
		$img.each(function(){
			if (pro(this)) {
				console.log(1)
				look(this)
			}
		})
	}

})