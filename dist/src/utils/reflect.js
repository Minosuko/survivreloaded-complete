"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BulletReflectionCalculator = void 0;
class BulletReflectionCalculator {
	static calculateReflectedBulletVector(bulletPosition, bulletDirection, objectPosition) {
		const vectorToObject = objectPosition.sub(bulletPosition);
		const normalizedVector = vectorToObject.clone().normalize();
		const dotProduct = bulletDirection.clone().dot(normalizedVector);
		const reflectedDirection = bulletDirection.sub(normalizedVector.mul(2 * dotProduct));
		const reflectedBulletVector = bulletPosition.add(reflectedDirection);
		return reflectedBulletVector;
	}
}
exports.BulletReflectionCalculator = BulletReflectionCalculator;
//# sourceMappingURL=reflect.js.map