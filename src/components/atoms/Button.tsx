interface Props {
    title : string,
    onClick : VoidFunction,
    className: string
}

const Button : React.FC<Props> = ({title, onClick, className}) => {
  
  return (
    <div className={className} onClick={onClick}>
      <button className="w-auto text-gray-600 hover:text-gray-800 p-2 lg:px-11 border-b-2 border-gray-100 hover:border-gray-600 bg-white rounded bg-opacity-80 hover:bg-opacity-100 text-2xl transition duration-500 ease-in-out block min-w-full backdrop-blur-sm">{title}</button>
    </div>
  );
};

export default Button;
