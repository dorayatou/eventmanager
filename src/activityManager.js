/**
 * 活动管理器
 */
var activityManager = {
    status: 0,
    high: [],
    low: [],
    cached: {},//注册的状态
    push: function(type, name, handler) {
        if (this.cached[name] == 0 || this.cached[name] == 1) {
            return;//如果当前队列中存在或者正在执行则不入队
        }
        this.cached[name] = 0;
        var wrapHandler = function() {
            activityManager.cached[name] = 1;
            handler();
        }
        wrapHandler[name] = name;
        if (type == 'high') {
            this.high.push(wrapHandler)
        } else if (type == 'low') {
            this.low.push(wrapHandler);
        }
        this.begin();
    },
    pop: function(type) {
        if (type == 'high' && this.high.length > 0) {
            this.status = 1;
            var currentActivity = this.high.shift();
            currentActivity.apply(null);
        }
        if (type == 'low' && this.low.length > 0) {
            this.status = 1;
            var currentActivity = this.low.shift();
            currentActivity.apply(null);
        }
        this.begin();//再去触发一下队列
    },
    begin: function() {
        if (this.status == 1) {
            return;
        }
        //这里不能是同步代码_需要展示等待的过程
        while(this.high.length > 0) {
            if (this.status == 0) {
                this.pop('high');
                break;
            }
        }

        while(this.low.length > 0) {
            if (this.status == 0) {
                this.pop('high');
            }
        }
    },
    remove: function(name) {
        this.status = 0;
        //消费一个，开始下一个
        delete this.cached[name];
        this.begin();
    }
};

activityManager.push('high', 'layer-1', function() {
    //触发具体活动
    console.log('layer-1')
});

activityManager.push('high', 'layer-2', function() {
    //触发具体活动
    console.log('layer-2')
});
activityManager.push('high', 'layer-3', function() {
    //触发具体活动
    console.log('layer-3')
});
//注册进去的活动，需要知道当前活动的状态
//活动关闭，通知活动管理器
activityManager.remove('layer-1');
// activityManager.remove('layer-2');