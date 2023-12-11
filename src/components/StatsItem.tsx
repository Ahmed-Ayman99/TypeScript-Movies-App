import { FC, ReactNode } from "react";

interface Props {
  label?: string | number;
  children: ReactNode;
}

const StatsItem: FC<Props> = ({ label, children }) => {
  return (
    <p>
      <span>{children}</span>
      <span>{label}</span>
    </p>
  );
};

export default StatsItem;
