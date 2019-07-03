$(function () {
    $("#password").pwcheck();

    /***页面加载时，按钮处于 "禁用" 状态，只有用户勾选了 "我已阅读并同意《平台用户协议》" 才启用***/
    $("#agree").click(function () {
        var checked = $("#agree").is(":checked");
        if(checked){
            console.log(checked)
            $("#btn").removeAttr("disabled");
        }else{
            $("#btn").attr("disabled",true);
        }
    });

    $("#btn").click(function () {

        // 用户名正则
        var usernameReg = /^[a-zA-Z]([a-zA-Z0-9]){5,7}$/;

        var passwordReg = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,12}$/;

        var username = $("#username").val();
        var password = $("#password").val();
        var confirmPassword = $("#confirm-password").val()

        if (!username) {
            $(".message").show();
            $(".message").text("请输入用户名");
            return;
        } else {
            $(".message").hide();
        }

        if (!usernameReg.test(username)) {
            $(".message").show();
            $(".message").text("用户名只能是字母开头的6~8位数字串");
            return;
        } else {
            $(".message").hide();
        }

        if (!password) {
            $(".message").show();
            $(".message").text("请输入密码");
            return;
        } else {
            $(".message").hide();
        }

        if (!passwordReg.test(password)) {
            $(".message").show();
            $(".message").text("密码只能为8~12位字符串");
            return;
        } else {
            $(".message").hide();
        }

        if (!confirmPassword) {
            $(".message").show();
            $(".message").text("请确认密码");
            return;
        } else {
            $(".message").hide();
        }

        if (password != confirmPassword) {
            $(".message").show();
            $(".message").text("两次输入的密码不一致");
            return;
        } else {
            $(".message").hide();
        }
    });
});