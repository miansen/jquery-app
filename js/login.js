$(function () {
    // 链式调用
    $("#form").children().eq(2).click(function () {
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

        if (!password) {
            $(".alert-danger").show();
            $(".alert-danger").replaceWith("<span class='message' style='color: #d43f3a'>请输入密码<span/>");
            return;
        } else {
            $(".message").replaceWith("<div class=\"alert alert-danger\" role=\"alert\"></div>");
        }
    });
});