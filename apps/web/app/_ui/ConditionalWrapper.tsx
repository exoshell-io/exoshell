export const ConditionalWrapper: React.FC<
  React.PropsWithChildren<{
    condition: boolean;
    wrapper: (children: React.ReactNode) => React.ReactNode;
  }>
> = ({ condition, wrapper, children }) => {
  if (condition) return wrapper(children);
  return children;
};
