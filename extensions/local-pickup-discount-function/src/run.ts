import type {
  RunInput,
  FunctionRunResult
} from "../generated/api";

const EMPTY_DISCOUNT: FunctionRunResult = {
  discounts: [],
};

type Configuration = {};

export function run(input: RunInput): FunctionRunResult {
  let selectedPickupInStore = false;
  const deliveryOptions: {
    deliveryOption: {
      handle: string
    }
  }[] = [];

  for (const deliveryGroup of input.cart.deliveryGroups) {
    for (const option of deliveryGroup.deliveryOptions) {
      if (option.title === "Pickup in store") {
        selectedPickupInStore = true;
        deliveryOptions.push({
          deliveryOption: {
            handle: option.handle
          }
        });
      }
    }
  }

  if (!selectedPickupInStore) {
    return EMPTY_DISCOUNT;
  }

  return {
    discounts: [
      {
        targets: deliveryOptions,
        value: {
          fixedAmount: {
            amount: 20
          }
        }
      }
    ]
  };
}
