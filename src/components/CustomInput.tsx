import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface CustomInputProps {
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
}

export const CustomInput = ({ label, placeholder, register, error }: CustomInputProps) => {
  const labelColor = error ? 'text-light-red' : 'text-smokey-grey';
  const borderColor = error ? 'border-light-red' : 'border-light-grey focus:border-purple-custom';

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={register.name} className={`font-bold text-xs uppercase tracking-[0.2em] ${labelColor}`}>
        {label}
      </label>
      <input
        id={register.name}
        placeholder={placeholder}
        className={`p-3 border rounded-lg w-full text-xl lg:text-3xl font-bold text-off-black transition-colors ${borderColor}`}
        {...register}
      />
      {error && <span className="text-light-red text-xs italic">{error.message}</span>}
    </div>
  );
};
