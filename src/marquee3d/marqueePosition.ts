export type Position3D = [x: number, y: number, z: number];

const YIndex = 1;

interface GetItemPositionsArg {
	columnCount: number;
	radius: number;
	rowCount: number;
	rowHeight: number;
	rowOffset: number;
}

export function getItemPositions({
	columnCount,
	radius,
	rowCount,
	rowHeight,
	rowOffset,
}: GetItemPositionsArg) {
	const result: Position3D[][] = [];
	const rowPositionYList = getRowPositionYList(rowCount, rowHeight, rowOffset);

	for (let i = 0; i < rowCount; i++) {
		const isEvenRow = i % 2 === 0 ? true : false;
		const stepAngle = getStepAngle(columnCount);
		const itemPositions = getItemPositionsInRow(
			columnCount,
			radius,
			isEvenRow ? 0 : stepAngle / 2
		);
		result[i] = itemPositions.map<Position3D>((position) => {
      position[YIndex] = rowPositionYList[i];
      return position
		});
	}

	return result;
}

export function getRowPositionYList(
	rowCount: number,
	rowHeight: number,
	rowOffset: number = 0
) {
	const result: number[] = [];
	const totalHeight = rowHeight * rowCount + rowOffset * (rowCount - 1);
	const centerPositionY = totalHeight / 2;

	for (let i = 0; i < rowCount; i++) {
		const positionY =
			i * rowHeight + Math.max(0, rowOffset * i) - centerPositionY;
		result.push(positionY);
	}

	return result;
}

export function getItemPositionsInRow(
	columnCount: number,
	radius: number,
	offset: number = 0
) {
	const result: Position3D[] = [];
	const stepAngle = getStepAngle(columnCount);

	for (let i = 0; i < columnCount; i++) {
		const itemAngle = stepAngle * i + offset;
		const position = getItemPositionInCircle(itemAngle, radius);
		result.push(position);
	}

	return result;
}

export function getStepAngle(columnCount: number) {
	return (Math.PI * 2) / columnCount;
}

export function getItemPositionInCircle(
	angle: number,
	radius: number
): Position3D {
	return [Math.cos(angle) * radius, 0, Math.sin(angle) * radius];
}
