import {blockClass} from '../../src/vm/extensions/block/index.js';

/**
 * Mouse IO device which converts client coordinates like scratch-vm.
 */
class FakeMouse {
    constructor () {
        this._scratchX = 0;
        this._scratchY = 0;
        this.posted = [];
        this.postData = jest.fn(data => {
            this.posted.push(data);
            if (data.x) {
                this._scratchX = Math.round(Math.min(Math.max(480 * ((data.x / data.canvasWidth) - 0.5), -240), 240));
            }
            if (data.y) {
                this._scratchY = Math.round(Math.min(Math.max(-360 * ((data.y / data.canvasHeight) - 0.5), -180), 180));
            }
        });
    }

    getScratchX () {
        return this._scratchX;
    }

    getScratchY () {
        return this._scratchY;
    }
}

const createTarget = (draggable, x, y) => {
    const target = {
        isStage: false,
        draggable,
        drawableID: 1,
        x,
        y,
        goToFront: jest.fn(),
        startDrag: jest.fn(),
        stopDrag: jest.fn(),
        setXY: jest.fn((newX, newY) => {
            target.x = newX;
            target.y = newY;
        })
    };
    return target;
};

const createRuntime = (targets = []) => ({
    formatMessage: function (msg) {
        return msg.default;
    },
    on: function () {},
    ioDevices: {mouse: new FakeMouse()},
    renderer: {
        canvas: {clientWidth: 960, clientHeight: 720},
        pick: jest.fn((x, y, w, h, ids) => (ids.includes(1) ? 1 : null))
    },
    targets
});

describe('blockClass', () => {
    const runtime = createRuntime();

    test('should create an instance of blockClass', () => {
        const block = new blockClass(runtime);
        expect(block).toBeInstanceOf(blockClass);
    });

    test('getInfo() should define blocks', () => {
        const block = new blockClass(runtime);
        const info = block.getInfo();
        expect(info.id).toBe('keyEvents');
        const opcodes = info.blocks.map(b => b.opcode);
        ['pressKeyWhile', 'moveMouseTo', 'clickMouseAt', 'setMouseButton', 'dragMouse'].forEach(opcode => {
            expect(opcodes).toContain(opcode);
        });
    });
});

describe('mouse blocks', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('moveMouseTo() should set the mouse position in Scratch coordinates', () => {
        const runtime = createRuntime();
        const block = new blockClass(runtime);
        const mouse = runtime.ioDevices.mouse;
        [[240, -180], [-240, 180], [0, 0], [123, -45], [999, -999]].forEach(([x, y]) => {
            block.moveMouseTo({X: x, Y: y});
            expect(mouse.getScratchX() + 0).toBe(Math.max(-240, Math.min(240, x)));
            expect(mouse.getScratchY() + 0).toBe(Math.max(-180, Math.min(180, y)));
        });
        const last = mouse.posted[mouse.posted.length - 1];
        expect(last.canvasWidth).toBe(960);
        expect(last.x).toBeGreaterThan(0);
        expect(last.x).toBeLessThan(960);
        expect(last).not.toHaveProperty('isDown');
    });

    test('clickMouseAt() should press and release the mouse button', async () => {
        const runtime = createRuntime();
        const block = new blockClass(runtime);
        const mouse = runtime.ioDevices.mouse;
        const done = block.clickMouseAt({X: 10, Y: 20, HOLD_TIME: 100});
        const downData = mouse.posted.filter(d => 'isDown' in d);
        expect(downData).toHaveLength(1);
        expect(downData[0].isDown).toBe(true);
        expect(mouse.getScratchX()).toBe(10);
        expect(mouse.getScratchY()).toBe(20);
        jest.advanceTimersByTime(100);
        await done;
        const upData = mouse.posted.filter(d => 'isDown' in d);
        expect(upData[1]).toMatchObject({isDown: false, wasDragged: false});
    });

    test('stopAll() should release the pressed mouse button', async () => {
        const runtime = createRuntime();
        const block = new blockClass(runtime);
        const mouse = runtime.ioDevices.mouse;
        const done = block.clickMouseAt({X: 0, Y: 0, HOLD_TIME: 10000});
        block.stopAll();
        await done;
        const states = mouse.posted.filter(d => 'isDown' in d).map(d => d.isDown);
        expect(states).toEqual([true, false]);
    });

    test('setMouseButton() should press and release at the current position', () => {
        const runtime = createRuntime();
        const block = new blockClass(runtime);
        const mouse = runtime.ioDevices.mouse;
        block.moveMouseTo({X: -50, Y: 60});
        block.setMouseButton({MOUSE_STATE: 'down'});
        block.setMouseButton({MOUSE_STATE: 'down'});
        block.setMouseButton({MOUSE_STATE: 'up'});
        const states = mouse.posted.filter(d => 'isDown' in d);
        expect(states.map(d => d.isDown)).toEqual([true, false]);
        expect(mouse.getScratchX()).toBe(-50);
        expect(mouse.getScratchY()).toBe(60);
    });

    test('dragMouse() should drag a draggable sprite', async () => {
        const target = createTarget(true, 5, 10);
        const runtime = createRuntime([target]);
        const block = new blockClass(runtime);
        const mouse = runtime.ioDevices.mouse;
        const done = block.dragMouse({X1: 0, Y1: 0, X2: 100, Y2: -50, TIME: 500});
        jest.advanceTimersByTime(600);
        await done;
        expect(target.goToFront).toHaveBeenCalled();
        expect(target.startDrag).toHaveBeenCalledTimes(1);
        expect(target.stopDrag).toHaveBeenCalledTimes(1);
        expect(target.x).toBe(105);
        expect(target.y).toBe(-40);
        expect(mouse.getScratchX()).toBe(100);
        expect(mouse.getScratchY()).toBe(-50);
        const states = mouse.posted.filter(d => 'isDown' in d);
        expect(states.map(d => d.isDown)).toEqual([true, false]);
        expect(states[1].wasDragged).toBe(true);
    });

    test('dragMouse() should not drag a sprite which is not draggable', async () => {
        const target = createTarget(false, 5, 10);
        const runtime = createRuntime([target]);
        const block = new blockClass(runtime);
        const done = block.dragMouse({X1: 0, Y1: 0, X2: 100, Y2: -50, TIME: 500});
        jest.advanceTimersByTime(600);
        await done;
        expect(target.startDrag).not.toHaveBeenCalled();
        expect(target.setXY).not.toHaveBeenCalled();
        const states = runtime.ioDevices.mouse.posted.filter(d => 'isDown' in d);
        expect(states[1].wasDragged).toBe(false);
    });

    test('press, move and release should drag a draggable sprite', () => {
        const target = createTarget(true, 0, 0);
        const runtime = createRuntime([target]);
        const block = new blockClass(runtime);
        block.moveMouseTo({X: 0, Y: 0});
        block.setMouseButton({MOUSE_STATE: 'down'});
        block.moveMouseTo({X: 0, Y: 0});
        expect(target.startDrag).not.toHaveBeenCalled();
        block.moveMouseTo({X: 30, Y: 40});
        block.setMouseButton({MOUSE_STATE: 'up'});
        expect(target.startDrag).toHaveBeenCalledTimes(1);
        expect(target.stopDrag).toHaveBeenCalledTimes(1);
        expect(target.x).toBe(30);
        expect(target.y).toBe(40);
    });
});
