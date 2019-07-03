;(function ($, window, document, undefined) {
    'use strict';
    var old = $.fn.pwcheck;
    var PWCheck = function (element, options) {
		
        this.$element = $(element);
		
        this.options = $.extend({}, $.fn.pwcheck.defaults, options);

        this.render();

        this.setupEvents();

        return this;
    };
	
	// 定义PWCheck的prototype
    PWCheck.prototype = {
		
        constructor: PWCheck,
        
        render: function() {
        	var base = this;
        	var html = '   <div class="pw_level">';
        	html+= '	<div class="pw_grap_box">';
        	html+= '		<div class="pw_grap_tab pw_grap_top">';
        	html+= '			<table width="100%" cellpadding="0" cellspacing="0" border="2">';
        	html+= '				<tr>';
        	html+= '					<td width="33%" height="8" style="background-color:#ec3701;border-radius:5px 0 0 5px;border-right:2px solid #fff;"></td>';
        	html+= '					<td width="33%" style="background-color:#f78115;border-right:2px solid #fff;border-left:2px solid #fff;"></td>';
        	html+= '					<td width="34%" style="background-color:#6ba001;border-radius:0 5px 5px 0;border-left:2px solid #fff;"></td>';
        	html+= '				</tr>';
        	html+= '			</table>';
        	html+= '		</div>';
        	html+= '		<div class="pw_grap_tab pw_grap_bot">';
        	html+= '			<table width="100%" cellpadding="0" cellspacing="0" border="2">';
        	html+= '				<tr>';
        	html+= '					<td width="33%" height="8" style="background-color:#e3e3e3;border-radius:5px 0 0 5px;border-right:2px solid #fff;"></td>';
        	html+= '					<td width="33%" style="background-color:#e3e3e3;border-right:2px solid #fff;border-left:2px solid #fff;"></td>';
        	html+= '					<td width="34%" style="background-color:#e3e3e3;border-radius:0 5px 5px 0;border-left:2px solid #fff;"></td>';
        	html+= '				</tr>';
        	html+= '			</table>';
        	html+= '		</div>';
        	html+= '	</div>';
        	html+= '	<div class="pw_text_box">';
        	html+= '		<table width="100%" cellpadding="0" cellspacing="0" border="0">';
        	html+= '			<tr>';
        	html+= '				<td width="33%">'+base.options.text[0]+'</td><td width="33%">'+base.options.text[1]+'</td><td width="33%">'+base.options.text[2]+'</td>';
        	html+= '			</tr>';
        	html+= '		</table>';
        	html+= '	</div>';
        	html+= '</div>';
			html+= '<div class="clear">';
			html+= '</div>';
			
			//定义密码判断区域为panel
			var panel = $(html);
			//设置密码判断区域的宽度
			panel.width(base.options.width);			
			//设置判断图形里彩条宽度
			$(".pw_grap_tab table",panel).width(parseInt(base.options.width - 8));			
			//设置判断图形里彩条边框宽度
			$(".pw_grap_box",panel).width(parseInt(base.options.width - 2));
			//在当前input对象后面插入密码判断功能区域
			this.$element.after(panel);
			//定义执行动画对象
			this.bar = panel.find(".pw_grap_top");
        },
		
        destroy: function () {
            this.$element.removeData('pwcheck');
            this.$element.unbind('keyup focus');
            return this;
        },
		//定义图形动画方法
		animateTo: function(per){
			this.bar.stop(true).animate({width:per},400);
		},
		//绑定keyup和focus事件，根据检查密码强度结果执行动画
        setupEvents: function () {
			var base = this;
			var element = this.$element;
			element.bind("keyup focus",function () {
				var pwd = element.val();

				// 没有输入时，不显示
				if(!pwd){
					base.animateTo("0");
					return;
				}

				// 如果密码长度小于8位，显示为 "弱"
				if(pwd.length<8){
					base.animateTo("33%");
					return;
				}

				// 计算密码的强度
				var r = base.checkPwd(pwd);

				// 不包含字母、数字、特殊字母中的任意一种，不显示
				if (r < 1) {
					base.animateTo("0");
					return;
				}

                // 只有字母、数字、特殊字母中的一种，显示为 "弱"
				if (r > 0 && r < 2) {
					base.animateTo("33%");

                    // 有两种，显示为 "中"
				} else if (r >= 2 && r < 4) {
					base.animateTo("66%");
					// 有三种，显示为 "强"
				} else if (r >= 4) {
					base.animateTo("100%");
				}            
			});
        },
		// 检查密码强度
		checkPwd: function(str) {
			var len = str.length;

            // 如果密码的长度等于0，则显示 "弱"
			if (len == 0) return 1;

			var cat = /.*[\u4e00-\u9fa5]+.*$/
			if (cat.test(str)) {
				return -1;
			}

            // 仅含有数字
			cat = /\d/;
			var maths = cat.test(str);

            // 仅含有字母
			cat = /[a-zA-Z]/;
			var smalls = cat.test(str);

            // 仅含有特殊字符
			cat = /(?=.*[~!@#$%^&*()_+`\-={}:";'<>?,.\/])/;
			var specials = cat.test(str);

            /**
			 * num=1 表示只含有一种
			 * num=2 表示含有两种
			 * num=3 表示含有三种
             */
			var num = maths + smalls + specials;

			// 如果密码小于8位，则显示 "弱"
			if (len < 8) {
                return 1;
			}else {
                if (num == 1) return 1;
                if (num == 2) return 3;
                if (num == 3) return 4;
			}
		},
    };



    $.fn.pwcheck = function (option) {
        var args = Array.prototype.slice.call(arguments, 1);
        var methodReturn;

        var $this = $(this);
        var data = $this.data('pwcheck');
        var options = typeof option === 'object' && option;

        if (!data) $this.data('pwcheck', (data = new PWCheck(this, options) ));
        if (typeof option === 'string') methodReturn = data[ option ].apply(data, args);

        return ( methodReturn === undefined ) ? $this : methodReturn;
    };
	
	//----------设置默认属性值-------------
    $.fn.pwcheck.defaults = {
        width: 180,
		text: ["弱","中","强"]
    };

    $.fn.pwcheck.Constructor = PWCheck;

    $.fn.pwcheck.noConflict = function () {
        $.fn.pwcheck = old;
        return this;
    };

})(jQuery, window, document);