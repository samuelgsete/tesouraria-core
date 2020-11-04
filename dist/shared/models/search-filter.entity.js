"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchFilter = void 0;
class SearchFilter {
    constructor(_word, _page) {
        this.word = (_word == null || _word == "") ? "%%" : "%" + _word + "%";
        this.page = _page <= 0 ? 1 : _page;
    }
    nextPage() {
        return (this.page - 1) * 6;
    }
}
exports.SearchFilter = SearchFilter;
//# sourceMappingURL=search-filter.entity.js.map