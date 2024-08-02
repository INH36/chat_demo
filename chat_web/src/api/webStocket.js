// webSocket.js

class WebSocketClient {
    constructor(url, options = {}) {
        this.url = url;
        this.options = options;
        this.ws = null;

        // 添加默认回调函数
        this.onOpen = this.options.onOpen || (() => {});
        this.onMessage = this.options.onMessage || (() => {});
        this.onError = this.options.onError || (() => {});
        this.onClose = this.options.onClose || (() => {});
        this.init();
    }
    // 初始化连接
    init() {
        this.ws = new WebSocket(this.url);

        // 监听事件
        this.ws.onopen = () => {
            console.log('WebSocket connected');
            this.onOpen();
        };
        // 监听消息
        this.ws.onmessage = (event) => {
            console.log('Received:', event.data);
            this.onMessage(event.data);
        };
        // 监听错误
        this.ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            this.onError(error);
        };
        // 监听关闭
        this.ws.onclose = (event) => {
            console.log('WebSocket closed:', event);
            this.onClose(event);
        };
    }

    // 发送消息
    send(data) {
        if (this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(data);
        } else {
            console.warn('WebSocket is not open');
        }
    }
    // 关闭连接
    close() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.close();
        }
    }
}

export default WebSocketClient;