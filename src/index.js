/**
 * 1、入队
 * 2、出队
 */
function Queue() {}

//观察者
function Observer() {

}

//事件管理器：发布、订阅、取消订阅
var handlers = {};//存储所有事件
handler = {
    'test': {

    },
    'test1': {

    },
    'test2': {

    }
}
//具备防止嵌套循环的问题
function event() {
    //事件对象-初始化一个事件对象
    var event = {
        name: 'test',
        value: [], //事件回调函数队列
        related: [], //存放事件回调内部的自定义事件
        flag: ''
    };

    handlers[name] = event;
}

//事件管理器
var EventBus = {
    on: function(type, fn) {
        var events = new EventManager(type, fn);
    },
    off: function() {},
    trigger: function() {}
};

EventBus.on('test', function(data) {
    console.log('test:' + data);
});
Event.trigger('test');

