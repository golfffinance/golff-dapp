import Vue from 'vue'

export const numToString = (num) => {
    let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
};

export const mToUpperCase = (e) => {
    if(e === 'weth'){
        return 'wETH';
    }
    return e.toUpperCase();
}

export const keepDecimalsDown = (num,digits = 4) =>{
    num = num + '';
    if(num.indexOf('.') === -1 || (num.indexOf('.') > -1 && num.split('.')[1].length <= 3)){
        return num;
    }
    return Math.floor(num * eval(`1e${digits}`)) / eval(`1e${digits}`);
}
export const hiddenAddress = (e) => {
    if (e && e.length > 0) {
        let left = e.substring(0, 6);
        let right = e.substring(e.length - 4, e.length)
        return left + '...' + right;
    } else {
        return '';
    }
}

export const toNonExponential = (num) => {
    if (isNaN(num)) {
        return num;
    };
    let m = num.toExponential().match(/\d(?:\.(\d*))?e([+-]\d+)/);
    return num.toFixed(Math.max(0, (m[1] || '').length - m[2]));
}

export const goTo = (val, type) => {
    if (val === '/home') {
        let suffix = window.location.hostname.split('.').slice(-1)[0];
        window.location.href = "https://golff."+suffix;
        return;
    }
    if (type === undefined || type === 0) {
        Vue.routerGo.push(val)
    }
    else if (type === 1) {
        window.location.href = e;
    }

}

export const isEmpty = (val) => {
    if (val === null || typeof val === 'undefined') {
        return true;
    }
    if (typeof val === 'string') {
        if (trim(val) === '') {
            return true;
        }
    }
    if (Object.prototype.toString.call(val) === '[object Array]') {
        if (val.length === 0) {
            return true;
        }
    }
    return false;
}


export const isUrl = (e) => {
    var RegUrl = new RegExp('^([hH][tT]{2}[pP]://|[hH][tT]{2}[pP][sS]://)(([A-Za-z0-9-~]+).)+([A-Za-z0-9-~/])+$');
    return (RegUrl.test(e));
};

export const isAndroid = (name, value) => {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 || u.indexOf('.android.') > -1; // android终端
    return isAndroid;
};

export const isiOS = (name, value) => {
    let u = navigator.userAgent;
    let isiOS = u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || /iPhone|iPad|iPod|\.ios\./i.test(u); // ios终端
    return isiOS;
};

export const isH5 = (name, value) => {
    let sUserAgent = navigator.userAgent.toLowerCase();
    let bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    let bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    let bIsMidp = sUserAgent.match(/midp/i) == "midp";
    let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    let bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    let bIsUcBrowser = sUserAgent.match(/ucbrowser/i) == "ucbrowser";
    let bIsAndroid = sUserAgent.match(/android/i) == "android";
    let bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    let bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";

    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || bIsUcBrowser) {
        return true;
    } else {
        return false;
    }
};

export const leftTime = (e) => {
    let Time = {
        day: '00',
        hour: '00',
        minutes: '00',
        seconds: '00'
    };
    let Distance = e;

    if (Distance > 0) {
        Time.day = Math.floor(Distance / 86400000);
        Distance -= Time.day * 86400000;
        Time.hour = Math.floor(Distance / 3600000);
        Distance -= Time.hour * 3600000;
        Time.minutes = Math.floor(Distance / 60000);
        Distance -= Time.minutes * 60000;
        Time.seconds = Math.floor(Distance / 1000).toFixed(0);
        Distance -= Time.seconds * 1000;
        if (Time.day < 10) {
            Time.day = '0' + Time.day;
        }
        if (Time.hour < 10) {
            Time.hour = '0' + Time.hour;
        }
        if (Time.minutes < 10) {
            Time.minutes = '0' + Time.minutes;
        }
        if (Time.seconds < 10) {
            Time.seconds = '0' + Time.seconds;
        }
        return Time;
    } else {
        return Time;
    }
    
}
