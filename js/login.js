$(function () {

    /***页面加载时，按钮处于 "禁用" 状态，只有用户勾选了 "我已阅读并同意《平台用户协议》" 才启用***/
    $("#agree").click(function () {
        var checked = $("#agree").is(":checked");
        if(checked){
            $("#btn").removeAttr("disabled");
        }else{
            $("#btn").attr("disabled",true);
        }
    });

    // 链式调用
    $("#form").children().eq(3).click(function () {
        // 用户名正则
        var usernameReg = /^[a-zA-Z]([a-zA-Z0-9]){5,7}$/;

        // 密码正则
        var passwordReg = /^[\w\W]{8,12}$/;

        var username = $("#username").val();
        var password = $("#password").val();

        if (!username) {
            $(".alert-danger").show();
            // replaceWith
            $(".alert-danger").replaceWith("<span class='message' style='color: #d43f3a'>请输入用户名<span/>");
            return;
        } else {
            $(".message").replaceWith("<div class=\"alert alert-danger\" role=\"alert\"></div>");
        }

        if (!usernameReg.test(username)) {
            $(".alert-danger").show();
            $(".alert-danger").replaceWith("<span class='message' style='color: #d43f3a'>用户名只能是字母开头的6~8位数字串<span/>");
            return;
        } else {
            $(".message").replaceWith("<div class=\"alert alert-danger\" role=\"alert\"></div>");
        }

        if (!password) {
            $(".alert-danger").show();
            $(".alert-danger").replaceWith("<span class='message' style='color: #d43f3a'>请输入密码<span/>");
            return;
        } else {
            $(".message").replaceWith("<div class=\"alert alert-danger\" role=\"alert\"></div>");
        }

        if (!passwordReg.test(password)) {
            $(".alert-danger").show();
            $(".alert-danger").replaceWith("<span class='message' style='color: #d43f3a'>密码只能为8~12位字符串<span/>");
            return;
        } else {
            $(".message").replaceWith("<div class=\"alert alert-danger\" role=\"alert\"></div>");
        }

        window.location.href = "./index.html";
    });
});