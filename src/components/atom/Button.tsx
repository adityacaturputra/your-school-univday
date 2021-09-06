import { NextPage } from 'next';

interface Props {
    title : string,
    onClick : VoidFunction,
    className: string
}

const Button : NextPage<Props> = ({title, onClick, className}) => {
  
  return (
    <div className={className} onClick={onClick}>
      <button className="w-auto hover:text-purple-600 text-purple-300 p-2 border-b-2 hover:border-purple-600 bg-purple-200 rounded bg-opacity-30 hover:bg-opacity-100 text-2xl transition duration-500 ease-in-out shadow-inner block" style={{minWidth: '300px'}}>{title}</button>
    </div>
  );
};

export default Button;
