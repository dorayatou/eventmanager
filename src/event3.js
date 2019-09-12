var eventManger = {
    cached: {},
    handlers: {},
    //类型,绑定事件 
    addHandler: function (type, handler) {
        if (typeof handler !== "function") return;

        if (typeof this.handlers[type] == "undefined") {
            this.handlers[type] = [];
        }
        this.handlers[type].push(handler);

        if (this.cached[type] instanceof Array) {
            //说明有缓存的 可以执行
            handler.apply(null, this.cached[type]);
        }
    },
    removeHandler: function (type, handler) {
        var events = this.handlers[type];
        for (var i = 0, len = events.length; i < len; i++) {
            if (events[i] == handler) {
                events.splice(i, 1);
                break;
            }
        }
    },
    trigger: function (type) {
        //如果有订阅的事件，这个时候就触发了
        if (this.handlers[type] instanceof Array) {
            var handlers = this.handlers[type];
            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0, len = handlers.length; i < len; i++) {
                handlers[i].apply(null, args);
            }
        }
        //默认缓存
        this.cached[type] = Array.prototype.slice.call(arguments, 1);
    }
};

eventManger.addHandler("test", function (res) {
    console.log("先订阅，后发布1", res);
})
eventManger.trigger("test", 2);

eventManger.addHandler("test", function (res) {
    console.log("先发布，后订阅2", res);
})

eventManger.addHandler("test", function (res) {
    console.log("先发布，后订阅3", res);
})

eventManger.trigger("test", 3);

