import { ComponentPropsWithoutRef, ElementType, FC } from "react";

type Props = ComponentPropsWithoutRef<ElementType>;

const WatchedList: FC<Props> = ({ children }) => {
  return <ul className="list watched-list">{children} </ul>;
};

export default WatchedList;
