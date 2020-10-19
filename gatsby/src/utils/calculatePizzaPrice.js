const sizes = {
  S: 0.75,
  M: 1,
  L: 1.24,
};

export default function calculatePizzaPrice(cents, size) {
  return cents * sizes[size];
}
