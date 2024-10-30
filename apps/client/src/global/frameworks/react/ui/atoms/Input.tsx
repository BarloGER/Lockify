interface InputProps {
  type: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
  label,
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-1">
          {label}
        </label>
      )}
      <input
        className="border p-2 w-full bg-backgroundColor"
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};
