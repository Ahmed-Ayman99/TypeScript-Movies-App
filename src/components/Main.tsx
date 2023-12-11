import { FC, ElementType, ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<ElementType>;

const Main: FC<Props> = ({ children }) => {
  return <main className="main">{children}</main>;
};

export default Main;
