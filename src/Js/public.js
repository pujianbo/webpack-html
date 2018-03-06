//提示消息
function msg(msg, timeout) {
    if (timeout == undefined) {
        timeout = 3000;
    }
    $('#mask').show();
    $('#msg').show().find('span').html(msg);
    setTimeout(function() {
        $('#mask').hide();
        $('#msg').hide();
    }, timeout);
}

$(function() {
    console.log('server running');
});
