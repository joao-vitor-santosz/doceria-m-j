import type { ProductOptionGroup } from "../data/catalog";

export function getOptionSelectionKey(groupId: string, optionId: string) {
  return `${groupId}:${optionId}`;
}

export function getGroupSelectedQuantity(
  group: ProductOptionGroup,
  selectedOptionQuantities: Readonly<Record<string, number>>,
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
  ) as Record<string, number>;
}
