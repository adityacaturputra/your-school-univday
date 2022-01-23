interface Props {
    title : string,
    onClick : VoidFunction,
    className: string
}

const Button : React.FC<Props> = ({title, onClick, className}) => {
  
  return (
    <div className={className} onClick={onClick}>
      <button className="w-auto text-gray-600 hover:text-gray-800 p-2 border-b-2 hover:border-gray-600 bg-gray-200 rounded bg-opacity-30 hover:bg-opacity-100 text-2xl transition duration-500 ease-in-out shadow-inner block min-w-full">{title}</button>
    </div>
  );
};

export default Button;
