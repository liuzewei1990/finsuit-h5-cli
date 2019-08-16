import Global from "./Global.js"

export default class Sudoku extends Global {
    constructor(options) {
        super();

        // 奖品列表
        this.awards = options.awards;
        // 九宫格的尺寸，一般为 canvas 的尺寸
        this.sudokuSize = options.sudokuSize;
        // 方块圆角阔值
        this.sudokuItemRadius = options.sudokuItemRadius || 0;
        // 方块padding
        this.sudokuItemPadding = options.sudokuItemPadding || 0;
        // 方块margin
        this.sudokuItemMargin = options.sudokuItemMargin || 0;

        this.sudokuItemScale = options.sudokuItemScale || 1;

        // 方块阴影偏移量
        this.sudokuItemShadowOffsetY = options.sudokuItemShadowOffsetY || 0;
        // 方块背景颜色
        this.sudokuItemUnactiveColor = options.sudokuItemUnactiveColor || 'rgb(255, 255, 255)';
        // 方块文本颜色
        this.sudokuItemUnactiveTxtColor = options.sudokuItemUnactiveTxtColor || 'rgb(48, 44, 43)';
        // 方块阴影颜色
        this.sudokuItemUnactiveShadowColor = options.sudokuItemUnactiveShadowColor || 'rgb(220, 220, 220)';

        // 方块跳动背景颜色
        this.sudokuItemActiveColor = options.sudokuItemActiveColor || 'rgb(240, 240, 240)';
        // 方块跳动文本颜色
        this.sudokuItemActiveTxtColor = options.sudokuItemActiveTxtColor || 'rgb(255, 255, 255)';
        // 方块跳动阴影颜色
        this.sudokuItemActiveShadowColor = options.sudokuItemActiveShadowColor || 'rgb(255, 193, 200)';

        // 按钮背景颜色
        this.buttonColor = options.buttonColor || 'rgb(255, 216, 1)';
        // 按钮文本颜色
        this.buttonTxtColor = options.buttonTxtColor || 'rgb(172, 97, 1)';
        // 按钮阴影颜色
        this.buttonShadowColor = options.buttonShadowColor || 'rgb(253, 177, 1)';

        // loading = true 状态下转动的速度
        this.speed = options.speed || 20;
        // 动画转动时长
        this.duration = options.duration || 4000;
        // 动画结尾转动速率
        this.velocity = options.velocity || 300;

        // 九宫格是否自带开始按钮 如果为false 用户可以手动创建自定义按钮定位到中间位置
        this.hasButton = options.hasButton || 'true';

        // 获取奖品信息后的回调，返回一个下标
        this.finish = options.finish;

        // 内部按钮点击后的回调
        this.onClick = options.onClick;

        this.nextTick = options.nextTick;

        // 默认中奖的方块
        this.delaultActiveIndex = (typeof options.delaultActiveIndex === "number") ? options.delaultActiveIndex : false;

        // 计算九宫格每行每列显示多少个方块 例如：8/4+1 = 3个
        this.AWARDS_ROW_LENGTH = Math.floor((this.awards.length) / 4) + 1;
        // 绘制的步数 2
        this.AWARDS_STEP = this.AWARDS_ROW_LENGTH - 1;
        // 计算实际绘制奖品的个数 = 绘制的步数 乘以 4个顶点位置
        this.AWARDS_LEN = this.AWARDS_STEP * 4;

        // 第一个顶点位置 ： 0
        this.LETF_TOP_POINT = 0;
        // 第二个顶点位置 ： 2
        this.RIGHT_TOP_POINT = this.AWARDS_STEP;
        // 第三个顶点位置 ： 4
        this.RIGHT_BOTTOM_POINT = this.AWARDS_STEP * 2;
        // 第四个顶点位置 ： 6
        this.LEFT_BOTTOM_POINT = this.AWARDS_STEP * 2 + this.AWARDS_STEP;

        // 方块之间的margin间距
        // this.SUDOKU_ITEM_MARGIN =   (this.sudokuSize / this.AWARDS_ROW_LENGTH) / 6;
        this.SUDOKU_ITEM_MARGIN = this.sudokuItemMargin;
        // 方块大小尺寸
        this.SUDOKU_ITEM_SIZE = (this.sudokuSize / this.AWARDS_ROW_LENGTH) - this.SUDOKU_ITEM_MARGIN;
        // 方块文字大小
        this.SUDOKU_ITEM_TXT_SIZE = `bold ${this.SUDOKU_ITEM_SIZE * .12}px Helvetica`;

        /**
         * 方块缩放比例  
         * =1 ：正方形 
         * >1 : 长方形（横版） 
         * <1 : 长方形（竖版）
         */
        this.SUDOKU_ITEM_SCALE = this.sudokuItemScale;

        // 中间按钮大小
        this.BUTTON_SIZE = this.sudokuSize - (this.SUDOKU_ITEM_SIZE * 2 + this.SUDOKU_ITEM_MARGIN * 3);
        // 中间按钮文字大小
        this.BUTTON_TXT_SIZE = `bold ${this.BUTTON_SIZE * .12}px Helvetica`;

        this._positions = [];
        this._buttonPosition = [];

        this._isAnimate = false;
        this._jumpIndex = 0;
        this._jumpingTime = 0;
        this._jumpTotalTime;
        this._jumpChange;

        this._canvasStyle;

        // 转动loding
        this._loading = true;

        // 中奖结果 false : 没有中奖结果 0-N ：后台返回的接口中奖结果奖品下标
        this._prizeIndex = false;

        // 缓存要绘制的image对象 因为在转动时会重复请求src造成闪烁问题， 所以在缓存取即可。
        this._cacheImages = {};

        this.timer = null;
    };

    /**
     * 绘制方块方法
     * @param {Obj} context 上下文对象
     */
    drawSudoku (context) {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        // 顶点坐标
        let maxPosition = this.AWARDS_STEP * this.SUDOKU_ITEM_SIZE + this.AWARDS_STEP * this.SUDOKU_ITEM_MARGIN + this.SUDOKU_ITEM_MARGIN / 2;

        for (let i = 0; i < this.AWARDS_LEN; i++) {
            // ----- 左上顶点范围的方块索引 举例： i 为 0、1的时候
            if (i >= this.LETF_TOP_POINT && i < this.RIGHT_TOP_POINT) {
                let row = i,
                    x = row * this.SUDOKU_ITEM_SIZE + row * this.SUDOKU_ITEM_MARGIN + this.SUDOKU_ITEM_MARGIN / 2,
                    y = 0 + this.SUDOKU_ITEM_MARGIN / 2;

                this._positions.push({ x, y });

                this.drawSudokuItem(
                    context,
                    x, y,
                    this.SUDOKU_ITEM_SIZE,
                    this.sudokuItemRadius,
                    this.awards[i].type, this.awards[i].content,
                    this.SUDOKU_ITEM_TXT_SIZE,
                    this.sudokuItemUnactiveTxtColor,
                    this.sudokuItemUnactiveColor,
                    this.sudokuItemUnactiveShadowColor
                )
            }
            // -----

            // ----- 右上顶点范围的方块索引 举例： i 为 2、3的时候
            if (i >= this.RIGHT_TOP_POINT && i < this.RIGHT_BOTTOM_POINT) {
                let row = Math.abs(this.AWARDS_STEP - i),
                    x = maxPosition,
                    y = row * this.SUDOKU_ITEM_SIZE / this.SUDOKU_ITEM_SCALE + row * this.SUDOKU_ITEM_MARGIN + this.SUDOKU_ITEM_MARGIN / 2;

                this._positions.push({ x, y });

                this.drawSudokuItem(
                    context,
                    x, y,
                    this.SUDOKU_ITEM_SIZE,
                    this.sudokuItemRadius,
                    this.awards[i].type, this.awards[i].content,
                    this.SUDOKU_ITEM_TXT_SIZE,
                    this.sudokuItemUnactiveTxtColor,
                    this.sudokuItemUnactiveColor,
                    this.sudokuItemUnactiveShadowColor
                )
            }
            // -----

            // ----- 右下顶点范围的方块索引 举例：i为 4、5的时候
            if (i >= this.RIGHT_BOTTOM_POINT && i < this.LEFT_BOTTOM_POINT) {
                let row = Math.abs(this.AWARDS_STEP * 2 - i),
                    reverseRow = Math.abs(row - this.AWARDS_STEP),
                    x = reverseRow * this.SUDOKU_ITEM_SIZE + reverseRow * this.SUDOKU_ITEM_MARGIN + this.SUDOKU_ITEM_MARGIN / 2,
                    y = this.AWARDS_STEP * this.SUDOKU_ITEM_SIZE / this.SUDOKU_ITEM_SCALE + this.AWARDS_STEP * this.SUDOKU_ITEM_MARGIN + this.SUDOKU_ITEM_MARGIN / 2;

                this._positions.push({ x, y });

                this.drawSudokuItem(
                    context,
                    x, y,
                    this.SUDOKU_ITEM_SIZE,
                    this.sudokuItemRadius,
                    this.awards[i].type, this.awards[i].content,
                    this.SUDOKU_ITEM_TXT_SIZE,
                    this.sudokuItemUnactiveTxtColor,
                    this.sudokuItemUnactiveColor,
                    this.sudokuItemUnactiveShadowColor
                )
            }
            // -----

            // ----- 左下顶点范围的方块索引 举例： i为 6、7的时候
            if (i >= this.LEFT_BOTTOM_POINT) {
                let row = Math.abs(this.AWARDS_STEP * 3 - i),
                    reverseRow = Math.abs(row - this.AWARDS_STEP),
                    x = 0 + this.SUDOKU_ITEM_MARGIN / 2,
                    y = reverseRow * this.SUDOKU_ITEM_SIZE / this.SUDOKU_ITEM_SCALE + reverseRow * this.SUDOKU_ITEM_MARGIN + this.SUDOKU_ITEM_MARGIN / 2;

                this._positions.push({ x, y });

                this.drawSudokuItem(
                    context,
                    x, y,
                    this.SUDOKU_ITEM_SIZE,
                    this.sudokuItemRadius,
                    this.awards[i].type, this.awards[i].content,
                    this.SUDOKU_ITEM_TXT_SIZE,
                    this.sudokuItemUnactiveTxtColor,
                    this.sudokuItemUnactiveColor,
                    this.sudokuItemUnactiveShadowColor
                )
            }
        };
    };

    /**
     * 
     * @param {Obj} context     上下文
     * @param {Num} x           方块的x坐标
     * @param {Num} y           方块的y坐标
     * @param {Num} size        方块的大小尺寸
     * @param {Num} radius      方块圆角数值
     * @param {Str} type        方块的类型
     * @param {Str} content     方块的内容
     * @param {Str} txtSize     方块的文本大小
     * @param {Str} txtColor    方块的文本颜色
     * @param {Str} bgColor     方块的背景颜色
     * @param {Str} shadowColor 方块的阴影颜色
     */
    drawSudokuItem (context, x, y, size, radius, type, content, txtSize, txtColor, bgColor, shadowColor) {

        // ----- 绘制方块
        // save：用来保存Canvas的状态。save之后，可以调用Canvas的平移、放缩、旋转、错切、裁剪等操作。 
        context.save();
        // 设置方块背景颜色
        context.fillStyle = bgColor;
        // 设置阴影偏移坐标
        context.shadowOffsetX = 0;
        context.shadowOffsetY = this.sudokuItemShadowOffsetY;
        // 设置阴影模糊程度
        context.shadowBlur = 0;
        // 设置阴影颜色
        context.shadowColor = shadowColor;

        // beginPath方法开始一条路径，或重置当前的路径
        context.beginPath();

        // 绘制圆角方块
        super.roundedRect(
            context,
            x, y,
            size, size / this.SUDOKU_ITEM_SCALE,
            radius
        );

        // 填充颜色
        context.fill();

        // restore：用来恢复Canvas之前保存的状态。防止save后对Canvas执行的操作对后续的绘制有影响。
        context.restore();



        // ----- 绘制图片与文字
        if (content && type === 'image') {


            let drawImage = (image) => {
                // border的比例 0-1之间
                // const borderScale = 0.1;
                // context.drawImage(
                //     image, 
                //     x + (size * borderScale / 2), y + (size * borderScale / 2), 
                //     size * (1 - borderScale), size * (1 - borderScale)
                // );

                // 5-24之前
                // context.drawImage(
                //     image,
                //     x + this.sudokuItemPadding, y + this.sudokuItemPadding - (size - this.sudokuItemPadding * 2 - size / this.SUDOKU_ITEM_SCALE) / 2 - (this.sudokuItemPadding),
                //     size - this.sudokuItemPadding * 2, size - this.sudokuItemPadding * 2
                //     // image.width, image.height
                // );

                // 5-24 改动的边框效果
                context.drawImage(
                    image,
                    x + this.sudokuItemPadding, y + this.sudokuItemPadding,
                    size - this.sudokuItemPadding * 2, (size / this.SUDOKU_ITEM_SCALE) - this.sudokuItemPadding * 2
                );
            };

            // 如果缓存有的话 使用缓存的image对象
            if (this._cacheImages[content]) {

                drawImage(this._cacheImages[content])

            } else {
                let image = new Image();
                image.src = content;

                if (!image.complete) {
                    image.onload = (e) => {
                        this._cacheImages[content] = image;
                        drawImage(image);
                    }
                } else {
                    this._cacheImages[content] = image;
                    drawImage(image);
                }
            }

        }

        if (content && (type === 'text' || type === 'losing')) {
            context.save();
            context.fillStyle = txtColor;
            context.font = txtSize;
            // translate() 方法重新映射画布上的 (0,0) 位置。
            context.translate(
                x + this.SUDOKU_ITEM_SIZE / 2 - context.measureText(content).width / 2,
                y + this.SUDOKU_ITEM_SIZE / 2 / this.SUDOKU_ITEM_SCALE + (parseInt(txtSize.split(" ")[1]) / 2 || 6)
            );
            context.fillText(content, 0, 0);
            context.restore();
        }

    };


    /**
     * 绘制中间按钮方法
     * @param {Obj} context 上下文对象
     */
    drawButton (context) {
        let x = this.SUDOKU_ITEM_SIZE + this.SUDOKU_ITEM_MARGIN + this.SUDOKU_ITEM_MARGIN / 2,
            y = this.SUDOKU_ITEM_SIZE / this.SUDOKU_ITEM_SCALE + this.SUDOKU_ITEM_MARGIN + this.SUDOKU_ITEM_MARGIN / 2;

        // ----- 绘制背景
        context.save();
        context.fillStyle = this.buttonColor;
        context.shadowOffsetX = 0;
        context.shadowOffsetY = this.sudokuItemShadowOffsetY;
        context.shadowBlur = 0;
        context.shadowColor = this.buttonShadowColor;
        context.beginPath();
        super.roundedRect(
            context, x, y,
            this.BUTTON_SIZE, this.BUTTON_SIZE / this.SUDOKU_ITEM_SCALE,
            this.sudokuItemRadius,
            this.buttonColor,
            this.buttonShadowColor
        );
        context.fill();
        context.restore();
        // -----

        // ----- 绘制文字
        context.save();
        context.fillStyle = this.buttonTxtColor;
        context.font = this.BUTTON_TXT_SIZE;
        context.translate(
            x + this.BUTTON_SIZE / 2 - context.measureText('立即抽奖').width / 2,
            y + this.BUTTON_SIZE / 2 / this.SUDOKU_ITEM_SCALE + (parseInt(this.BUTTON_TXT_SIZE.split(" ")[1]) / 2 || 10)
        );
        context.fillText('立即抽奖', 0, 0);
        context.restore();
        // -----

        this._buttonPosition = { x, y };
    };

    /**
     * 创建按钮点击范围的路径
     * @param {Obj} context 上下文
     */
    createButtonPath (context) {
        context.beginPath();
        super.roundedRect(
            context,
            this._buttonPosition.x, this._buttonPosition.y,
            this.BUTTON_SIZE, this.BUTTON_SIZE,
            this.sudokuItemRadius
        );
    };

    /**
     * 转动动画函数
     * @param {Obj} context 上下文
     */
    sudokuItemMove (context) {
        this._isAnimate = true;

        this._loading || (this._jumpingTime += 100);

        // 跳跃动画结束时 触发回调函数
        if (this._jumpingTime >= this._jumpTotalTime && typeof this._prizeIndex === "number" && this._prizeIndex === this._jumpIndex) {
            this._isAnimate = false;
            if (this.finish) {
                this.finish(this._prizeIndex);
            }
            return;
        };

        // 重绘方块
        this.drawSudoku(context);


        if (this.hasButton === 'true') this.drawButton(context);


        // 位置循环
        if (this._jumpIndex < this.AWARDS_LEN - 1) this._jumpIndex++;
        else if (this._jumpIndex >= this.AWARDS_LEN - 1) this._jumpIndex = 0;


        // this.awards[this._jumpIndex].content = this.awards[this._jumpIndex].backContent;
        // 绘制跳跃方块
        this.drawSudokuItem(
            context,
            this._positions[this._jumpIndex].x, this._positions[this._jumpIndex].y,
            this.SUDOKU_ITEM_SIZE, this.sudokuItemRadius,
            this.awards[this._jumpIndex].type, this.awards[this._jumpIndex].backContent || this.awards[this._jumpIndex].content,
            this.SUDOKU_ITEM_TXT_SIZE, this.sudokuItemActiveTxtColor,
            this.sudokuItemActiveColor,
            this.sudokuItemActiveShadowColor
        );

        (typeof this.nextTick === 'function') && this.nextTick(this._jumpIndex);

        // 根据loading切换 easeOut 状态
        let easeOut = this._loading ? this.speed : this.speed + super.easeOut(this._jumpingTime, 0, this._jumpChange, this._jumpTotalTime);
        // console.log("easeOut:",easeOut)
        this.timer = setTimeout(this.sudokuItemMove.bind(this, context), easeOut);
    };

    /**
     * 点击开始转动 api
     * @param {Obj} context 上下文
     */
    luckyDraw (context) {
        if (this._isAnimate) return;
        this._loading = true;
        this._jumpingTime = 0;
        // 动画总时长
        this._jumpTotalTime = Math.random() * 1000 + this.duration;
        // 动画结尾速率
        this._jumpChange = Math.random() * 3 + this.velocity;
        this.sudokuItemMove(context);
    }


    /**
     * render绘制函数 - 初始化
     * @param {Dom} canvas canvas
     * @param {Obj} context 上下文
     */
    render (canvas, context) {
        this._canvasStyle = canvas.getAttribute('style');

        // 绘制所有奖品方块
        this.drawSudoku(context);

        // 绘制默认选中的的方块
        if (this.delaultActiveIndex === false) {
            this._jumpIndex = Math.floor(Math.random() * this.AWARDS_LEN);
        } else {
            this.setDefaultActive(this.delaultActiveIndex);
        }


        // 绘制中间按钮方块
        if (this.hasButton === 'false') return;

        this.drawButton(context);

        // 注册事件
        ['mousedown', 'touchstart'].forEach((event) => {
            canvas.addEventListener(event, (e) => {
                let loc = super.windowToCanvas(canvas, e);
                // 创建按钮矩形路径 便于context.isPointInPath检查点击的坐标位置是否在路径范围之内
                this.createButtonPath(context);

                if (context.isPointInPath(loc.x, loc.y) && !this._isAnimate) {
                    // this.luckyDraw(context);
                    if (typeof this.onClick === "function") this.onClick();
                }
            })
        });

        canvas.addEventListener('mousemove', (e) => {
            let loc2 = super.windowToCanvas(canvas, e);
            // 创建按钮矩形路径 便于context.isPointInPath检查移动的坐标位置是否在路径范围之内
            this.createButtonPath(context);

            if (context.isPointInPath(loc2.x, loc2.y)) {
                canvas.setAttribute('style', `cursor: pointer;${this._canvasStyle}`);
            } else {
                canvas.setAttribute('style', this._canvasStyle);
            }
        })
    }

    /**
     * 设置默认中奖的方块
     * @param {Num} index 默认选中索引
     */
    setDefaultActive (index, context) {
        // 需要将index作为_jumpIndex二次转动的启动位置
        this._jumpIndex = index;

        this.drawSudokuItem(
            context,
            this._positions[this._jumpIndex].x, this._positions[this._jumpIndex].y,
            this.SUDOKU_ITEM_SIZE, this.sudokuItemRadius,
            this.awards[this._jumpIndex].type, this.awards[this._jumpIndex].content,
            this.SUDOKU_ITEM_TXT_SIZE, this.sudokuItemActiveTxtColor,
            this.sudokuItemActiveColor,
            this.sudokuItemActiveShadowColor
        );
    }

    /**
     * 重绘canvas
     * @param {Obj} context 上下文
     */
    reRender (context) {
        // 绘制所有奖品方块
        this.drawSudoku(context);

        // 绘制中间按钮方块
        if (this.hasButton === 'false') return;

        // 绘制按钮
        this.drawButton(context);
    }

    prize (prizeIndex) {
        if (typeof prizeIndex === 'number' && prizeIndex < this.AWARDS_LEN) {
            this._loading = false;
            this._prizeIndex = prizeIndex;
        } else {
            this.onerror("中奖结果出错啦~");
        }
    }

    /**
     * 错误时停止转动
     * @param {*} msg 
     */
    onerror () {
        clearTimeout(this.timer);
        this._isAnimate = false;
    }
}