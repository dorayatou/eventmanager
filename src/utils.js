var utils = {
    bind: (function () {
        var eventObj = {};
        var cachedObj = {};
        return {
            on: function (name, func) {
                var arr = eventObj[name] || (eventObj[name] = []);
                if (typeof func === 'function') {
                    arr.push(func);
                }

                if (cachedObj[name] instanceof Array) {
                    //有缓存执行
                    func.apply(null, cachedObj[name]);
                }

            },
            off: function (name) {
                if (eventObj[name]) {
                    eventObj[name] = [];
                }
                return this;
            },
            trigger: function (name) {
                var args = Array.prototype.slice.call(arguments, 1);
                var arr = eventObj[name] || [];
                for (var i = 0, len = arr.length; i < len; i++) {
                    var func = arr[i];
                    func.apply(null, args);
                }

                // 默认缓存
                cachedObj[name] = args;
            }
        };
    }())
}
utils.bind.trigger('test1');
utils.bind.on('test1', function(res) {
    setTimeout(function(){
        console.log('test1');
    }, 5000);
});
utils.bind.off('test1');
utils.bind.on('test2', function(res) {
    console.log('test2');
    utils.bind.trigger('test1');
});

utils.bind.trigger('test2');

