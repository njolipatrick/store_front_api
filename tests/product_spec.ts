import { ProductStore } from "../src/models/product.model";

const store = new ProductStore();

describe("Mythical Weapon Model", () => {
  it("should have an index method", () => {
    expect(store.index).toBeDefined();
  });
});
