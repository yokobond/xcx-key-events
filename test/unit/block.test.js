import {blockClass} from '../../src/vm/extensions/block/index.js';

describe('blockClass', () => {
    const runtime = {
        formatMessage: function (msg) {
            return msg.default;
        },
        on: function () {}
    };

    test('should create an instance of blockClass', () => {
        const block = new blockClass(runtime);
        expect(block).toBeInstanceOf(blockClass);
    });

    test('getInfo() should define pressKeyWhile block', () => {
        const block = new blockClass(runtime);
        const info = block.getInfo();
        expect(info.id).toBe('keyEvents');
        expect(info.blocks.map(b => b.opcode)).toContain('pressKeyWhile');
    });
});
