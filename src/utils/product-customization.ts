import type { ProductOptionGroup } from "../data/catalog";

export type OptionQuantities = Record<string, number>;

export function getOptionSelectionKey(groupId: string, optionId: string) {
  return `${groupId}:${optionId}`;
}

export function getGroupSelectedQuantity(
  group: ProductOptionGroup,
  selectedOptionQuantities: Readonly<OptionQuantities>,
) {
  return group.options.reduce(
    (total, option) => total + (selectedOptionQuantities[getOptionSelectionKey(group.id, option.id)] ?? 0),
    0,
  );
}

export function getDefaultOptionQuantities(groups: readonly ProductOptionGroup[]) {
  return Object.fromEntries(
    groups
      .filter((group) => group.defaultOptionId)
      .map((group) => [getOptionSelectionKey(group.id, group.defaultOptionId!), 1]),
  ) as OptionQuantities;
}

export function findInvalidGroup(
  groups: readonly ProductOptionGroup[],
  selectedOptionQuantities: Readonly<OptionQuantities>,
) {
  return groups.find((group) => {
    const selectedQuantity = getGroupSelectedQuantity(group, selectedOptionQuantities);

    if (group.selectionMode === "quantity") {
      return (
        selectedQuantity < (group.minimumQuantity ?? 0) ||
        selectedQuantity > (group.maximumQuantity ?? Number.MAX_SAFE_INTEGER)
      );
    }

    return group.required && selectedQuantity === 0;
  });
}

export function getCustomizationExtraPrice(
  groups: readonly ProductOptionGroup[],
  selectedOptionQuantities: Readonly<OptionQuantities>,
) {
  return groups.reduce(
    (total, group) =>
      total +
      group.options.reduce(
        (groupTotal, option) =>
          groupTotal + option.price * (selectedOptionQuantities[getOptionSelectionKey(group.id, option.id)] ?? 0),
        0,
      ),
    0,
  );
}

export function getSelectionSummary(
  groups: readonly ProductOptionGroup[],
  selectedOptionQuantities: Readonly<OptionQuantities>,
) {
  return groups.flatMap((group) => {
    const selectedOptions = group.options
      .map((option) => ({
        option,
        quantity: selectedOptionQuantities[getOptionSelectionKey(group.id, option.id)] ?? 0,
      }))
      .filter(({ quantity }) => quantity > 0);

    if (selectedOptions.length === 0) return [];

    const value = selectedOptions
      .map(({ option, quantity }) =>
        group.selectionMode === "quantity" ? `${quantity}x ${option.label}` : option.label,
      )
      .join(", ");

    return [{ title: group.summaryTitle ?? group.title, value }];
  });
}
