import React, { useRef } from 'react';
import { useResizeObserver } from 'usehooks-ts';

type MeasureDivChildProps = {
  width: number;
  height: number;
};

type MeasureDivProps = Omit<React.HTMLProps<HTMLDivElement>, 'children'> & {
  children: (props: MeasureDivChildProps) => React.ReactNode;
};

export const MeasureDiv: React.FC<MeasureDivProps> = ({ children, ...divProps }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { width, height } = useResizeObserver<HTMLDivElement>({ ref }); 
  return <div ref={ref} {...divProps}>{(width && height) ? children({ width: width ?? 0, height: height ?? 0 }) : null}</div>;

};

