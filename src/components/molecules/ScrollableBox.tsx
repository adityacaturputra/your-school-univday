import React, { ReactNode } from 'react';

type Props = {
    children: JSX.Element | Element | HTMLElement | HTMLDivElement | Element[] | Element[] | ReactNode
}

const ScrollableBox : React.FC<Props> = ({children}) => {
  return (
    <>
      <div className="h-[105vh] mt-[10vh] relative container mx-auto">
        <div className="max-h-[100%] overflow-y-auto overflow-x-hidden py-[5vh]">
          {children}
        </div>       
      </div>       
    </>
  );
};

export default ScrollableBox;
