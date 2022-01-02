import { getImageIndexInOrder, getImageSize } from "./utils";

describe("Marquee3D utils", () => {
	describe("getImageSize function", () => {
		it("Get image size when width is same as height", () => {
			const { width, height } = getImageSize(1);
			expect(width).toBe(1);
			expect(height).toBe(1);
		});

		it("Get image size when width is bigger than height", () => {
			const { width, height } = getImageSize(2);
			expect(width).toBe(1);
			expect(height).toBe(0.5);
		});

		it("Get image size when height is bigger than width", () => {
			const { width, height } = getImageSize(0.5);
			expect(width).toBe(0.5);
			expect(height).toBe(1);
		});
	});
  
  describe('getImageIndexInOrder function', () => {

    it('get index when rowCount is 1', () => {
      expect(getImageIndexInOrder(5, 1, 0, 0)).toBe(0);
      expect(getImageIndexInOrder(5, 1, 0, 1)).toBe(1);
      expect(getImageIndexInOrder(5, 1, 0, 2)).toBe(2);
      expect(getImageIndexInOrder(5, 1, 0, 3)).toBe(3);
      expect(getImageIndexInOrder(5, 1, 0, 4)).toBe(4);
      expect(getImageIndexInOrder(5, 1, 0, 0)).toBe(0);
    })

    it('get index when rowCount is 2', () => {
      expect(getImageIndexInOrder(5, 2, 0, 0)).toBe(0);
      expect(getImageIndexInOrder(5, 2, 1, 0)).toBe(1);
      expect(getImageIndexInOrder(5, 2, 0, 1)).toBe(2);
      expect(getImageIndexInOrder(5, 2, 1, 1)).toBe(3);
      expect(getImageIndexInOrder(5, 2, 0, 2)).toBe(4);
      expect(getImageIndexInOrder(5, 2, 1, 2)).toBe(0);
      expect(getImageIndexInOrder(5, 2, 0, 3)).toBe(1);
      expect(getImageIndexInOrder(5, 2, 1, 3)).toBe(2);
    })
  })

});
