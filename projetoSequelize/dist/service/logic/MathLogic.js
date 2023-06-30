"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getOffsetValue(page, limit) {
    const response = page * limit;
    return response;
}
exports.default = {
    getOffsetValue
};
