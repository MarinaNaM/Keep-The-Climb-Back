"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSchoolDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_school_dto_1 = require("./create-school.dto");
class UpdateSchoolDto extends (0, mapped_types_1.PartialType)(create_school_dto_1.CreateSchoolDto) {
}
exports.UpdateSchoolDto = UpdateSchoolDto;
//# sourceMappingURL=update-school.dto.js.map