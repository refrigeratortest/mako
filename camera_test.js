
//sudo node camera_test.js

var fs = require('fs');
var spawn = require('child_process').spawn;
var sleep = require('sleep');
//var sleep = require('sleep');

var inPinNo = '24';
var count = 0;

function flash(d) {

    count++;
    var filename = d + "_" + String(count) + ".jpg";
    var option = ['-o', filename, '-t', '10', '-w', '300', '-h', '300'];
    var raspistill = spawn('raspistill', option);

    raspistill.on('close', function (code, signal) {
        console.log('Ealife Photo OK ' + filename);
    });
}

try {

    // Raspberry Pi GPIOのピンを入力モードに設定する
    fs.writeFileSync('/sys/class/gpio/export', inPinNo);
    fs.writeFileSync('/sys/class/gpio/gpio' + inPinNo + '/direction', 'in');

    // 無限ループでピンの状態を表示し続ける（ONなら1、OFFなら0）
    // ONとなったらループを抜けて終了
    var value = 0;

    console.log("Push Button!!!");

    while (1) {
        value = fs.readFileSync('/sys/class/gpio/gpio' + inPinNo + '/value', 'ascii');

        if (value == 1) {

            require('date-utils');//Dateクラスの機能を強化

            var dt = new Date();
            var d = dt.toFormat("YYYYMMDDHH24MISS");

            //flash(d);
            //sleep.sleep(10);
            //flash(d);

            for (var i = 0; i < 30; i++) {
                flash(d);
                sleep.sleep(10);
            }

            break;
        }
    }
} finally {

    // ループを抜けたら、24番ピンの使用を解除して終了
    fs.writeFileSync('/sys/class/gpio/unexport', inPinNo);
}
















//var fs = require('fs');
//var inPinNo = '24';


//// Raspberry Pi GPIOのピンを入力モードに設定する
//fs.writeFileSync('/sys/class/gpio/export', inPinNo);
//fs.writeFileSync('/sys/class/gpio/gpio' + inPinNo + '/direction', 'in');


//// 無限ループでピンの状態を表示し続ける（ONなら1、OFFなら0）
//// ONとなったらループを抜けて終了
//var value = 0;

//console.log("Push Button!!!");

//while (1) {
//    value = fs.readFileSync('/sys/class/gpio/gpio' + inPinNo + '/value', 'ascii');

//    if (value == 1) {

//        var option_t = '10';

//        require('date-utils');
//        var dt = new Date();
//        var filename = dt.toFormat("YYYYMMDDHH24MISS") + "_1" + ".jpg";
//        var option = ['-o', filename, '-t', option_t, '-w', '300', '-h', '300'];

//        var spawn = require('child_process').spawn;
//        var raspistill = spawn('raspistill', option);

//        //raspistill.on('close', function (code, signal) {
//        //    console.log('Ealife Photo 1 OK ' + filename);
//        //});

//        filename = null;
//        option = null;
//        span = null;
//        raspistill = null;

//        var filename2 = dt.toFormat("YYYYMMDDHH24MISS") + "_2" + ".jpg";
//        var option2 = ['-o', filename2, '-t', option_t, '-w', '300', '-h', '300'];
//        var spawn2 = require('child_process').spawn;
//        var raspistill2 = spawn2('raspistill', option2);

//        raspistill2.on('close', function (code, signal) {
//            console.log('Ealife Photo 2 OK ' + filename2);
//        });


//        //filename = dt.toFormat("YYYYMMDDHH24MISS") + "_3" + ".jpg";
//        //option = ['-o', filename, '-t', option_t, '-w', '300', '-h', '300'];
//        //raspistill = spawn('raspistill', option);

//        //raspistill.on('close', function (code, signal) {
//        //    console.log('Ealife Photo 3 OK ' + filename);
//        //});

//        break;
//    }
//}

//// ループを抜けたら、24番ピンの使用を解除して終了
//fs.writeFileSync('/sys/class/gpio/unexport', inPinNo);



