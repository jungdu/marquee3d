import {
	getItemPositionInCircle,
	getItemPositions,
	getItemPositionsInRow,
	getRowPositionYList,
	getStepAngle,
	Position3D,
} from "./marqueePosition";

describe("marqueePosition", () => {
	describe("getStepAngle function", () => {
		it("Get angle when there are 2 items in a row", () => {
			expect(getStepAngle(2)).toBe(Math.PI); // 180°
		});

		it("Get angle when there are 12 items in a row", () => {
			expect(getStepAngle(12)).toBe(Math.PI / 6); // 30°
		});
	});

	describe("getItemPositionInCircle function", () => {
		it("Get position when angle is 0°", () => {
			expect(getItemPositionInCircle(0, 1)).toEqual([1, 0, 0]);
			expect(getItemPositionInCircle(0, 5)).toEqual([5, 0, 0]);
			expect(getItemPositionInCircle(0, 10)).toEqual([10, 0, 0]);
		});

		it("Get position when angle is 90°", () => {
			const angle = Math.PI / 2;
			expect(mapFloatToInt(getItemPositionInCircle(angle, 1))).toEqual([
				0, 0, 1,
			]);
			expect(mapFloatToInt(getItemPositionInCircle(angle, 5))).toEqual([
				0, 0, 5,
			]);
			expect(mapFloatToInt(getItemPositionInCircle(angle, 10))).toEqual([
				0, 0, 10,
			]);
		});

		it("Get position when angle is 180°", () => {
			const angle = Math.PI;
			expect(mapFloatToInt(getItemPositionInCircle(angle, 1))).toEqual([
				-1, 0, 0,
			]);
			expect(mapFloatToInt(getItemPositionInCircle(angle, 5))).toEqual([
				-5, 0, 0,
			]);
			expect(mapFloatToInt(getItemPositionInCircle(angle, 10))).toEqual([
				-10, 0, 0,
			]);
		});

		it("Get position when angle is 270°", () => {
			const angle = (Math.PI * 3) / 2;
			console.log(
				"mapFloatToInt(getItemPositionInCircle(angle, 1)) :",
				mapFloatToInt(getItemPositionInCircle(angle, 1))
			);
			expect(mapFloatToInt(getItemPositionInCircle(angle, 1))).toEqual([
				0, 0, -1,
			]);
			expect(mapFloatToInt(getItemPositionInCircle(angle, 5))).toEqual([
				0, 0, -5,
			]);
			expect(mapFloatToInt(getItemPositionInCircle(angle, 10))).toEqual([
				0, 0, -10,
			]);
		});
	});

	describe("getItemPositionInRow function", () => {
		it("Get 12 positions in a row", () => {
			const positions = getItemPositionsInRow(12, 10);
			expect(positions.length).toBe(12);
			expect(mapFloatToInt(positions[0])).toEqual([10, 0, 0]);
			expect(mapFloatToInt(positions[3])).toEqual([0, 0, 10]);
			expect(mapFloatToInt(positions[6])).toEqual([-10, 0, 0]);
			expect(mapFloatToInt(positions[9])).toEqual([0, 0, -10]);
		});

		it("Get 12 positions in a row with offset 90°", () => {
			const offset = Math.PI / 2;
			const positions = getItemPositionsInRow(12, 10, offset);
			expect(positions.length).toBe(12);
			expect(mapFloatToInt(positions[0])).toEqual([0, 0, 10]);
			expect(mapFloatToInt(positions[3])).toEqual([-10, 0, 0]);
			expect(mapFloatToInt(positions[6])).toEqual([0, 0, -10]);
			expect(mapFloatToInt(positions[9])).toEqual([10, 0, 0]);
		});
	});

	describe("getRowPositionYList function", () => {
		it("Get y positions of rows", () => {
			expect(getRowPositionYList(2, 100)).toEqual([-50, 50]);
			expect(getRowPositionYList(5, 100)).toEqual([-200, -100, 0, 100, 200]);
		});

		it("Get y positions of rows with offset", () => {
			expect(getRowPositionYList(2, 100, 100)).toEqual([-100, 100]);
			expect(getRowPositionYList(5, 100, 100)).toEqual([
				-400, -200, 0, 200, 400,
			]);
		});
	});

	describe("getItemPositions function", () => {
		it("Check position count of row", () => {
			const row1 = getItemPositions({
				columnCount: 4,
				radius: 10,
				rowCount: 1,
				rowHeight: 100,
				rowOffset: 0,
			});

			const row2 = getItemPositions({
				columnCount: 4,
				radius: 10,
				rowCount: 2,
				rowHeight: 100,
				rowOffset: 0,
			});

			const row100 = getItemPositions({
				columnCount: 4,
				radius: 10,
				rowCount: 100,
				rowHeight: 100,
				rowOffset: 0,
			});

			expect(row1.length).toBe(1);
			expect(row2.length).toBe(2);
			expect(row100.length).toBe(100);
		});

		it("Check position count of column", () => {
			const column1 = getItemPositions({
				columnCount: 1,
				radius: 10,
				rowCount: 1,
				rowHeight: 100,
				rowOffset: 0,
			});

			const column2 = getItemPositions({
				columnCount: 2,
				radius: 10,
				rowCount: 1,
				rowHeight: 100,
				rowOffset: 0,
			});

			const column100 = getItemPositions({
				columnCount: 100,
				radius: 10,
				rowCount: 1,
				rowHeight: 100,
				rowOffset: 0,
			});

			expect(column1[0].length).toBe(1);
			expect(column2[0].length).toBe(2);
			expect(column100[0].length).toBe(100);
		});
	});
	describe("getItemPositions function", () => {
		it("Get positions of item with a row", () => {
			const result = getItemPositions({
				columnCount: 4,
				radius: 10,
				rowCount: 1,
				rowHeight: 100,
				rowOffset: 0,
			});

			expect(mapPositionValueToInt(result)).toEqual([
				[
					[10, 0, 0],
					[0, 0, 10],
					[-10, 0, 0],
					[0, 0, -10],
				],
			]);
		});

		it("Get positions of item with two row", () => {
			const result = getItemPositions({
				columnCount: 4,
				radius: 10,
				rowCount: 2,
				rowHeight: 100,
				rowOffset: 0,
			});

			expect(mapPositionValueToInt(result)).toEqual([
				[
					[10, -50, 0],
					[0, -50, 10],
					[-10, -50, 0],
					[0, -50, -10],
				],
				[
					[7, 50, 7],
					[-7, 50, 7],
					[-7, 50, -7],
					[7, 50, -7],
				],
			]);
		});
	});
});

function mapPositionValueToInt(arr: Position3D[][]) {
	return arr.map((row) => {
		return row.map((column) => {
			return mapFloatToInt(column);
		});
	});
}

function mapFloatToInt(arr: number[]) {
	return arr.map((value) => {
		const result = Math.round(value);
		if (result !== 0) {
			return result;
		}
		return 0;
	});
}
