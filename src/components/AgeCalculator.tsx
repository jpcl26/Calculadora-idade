import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { CustomInput } from './CustomInput';
import ArrowIcon from '../assets/icon-arrow.svg?react'; // Importando SVG como componente

// Tipos para os dados do formulário e para o resultado
type FormValues = {
  day: number;
  month: number;
  year: number;
};

interface AgeResult {
  years: number;
  months: number;
  days: number;
}

export const AgeCalculator = () => {
  const [age, setAge] = useState<AgeResult | null>(null);
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormValues>();

  const isDateValid = (day: number, month: number, year: number) => {
    const date = new Date(year, month - 1, day);
    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const birthDate = new Date(data.year, data.month - 1, data.day);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setAge({ years, months, days });
  };

  return (
    <div className="bg-white p-6 md:p-12 rounded-3xl rounded-br-[100px] lg:rounded-br-[200px] w-full max-w-3xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Inputs do Formulário */}
        <div className="grid grid-cols-3 gap-4 lg:gap-8">
          <CustomInput
            label="Day"
            placeholder="DD"
            register={register('day', {
              required: 'This field is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Must be a valid day' },
              max: { value: 31, message: 'Must be a valid day' },
              validate: (value) => isDateValid(value, getValues('month'), getValues('year')) || 'Must be a valid date'
            })}
            error={errors.day}
          />
          <CustomInput
            label="Month"
            placeholder="MM"
            register={register('month', {
              required: 'This field is required',
              valueAsNumber: true,
              min: { value: 1, message: 'Must be a valid month' },
              max: { value: 12, message: 'Must be a valid month' },
            })}
            error={errors.month}
          />
          <CustomInput
            label="Year"
            placeholder="YYYY"
            register={register('year', {
              required: 'This field is required',
              valueAsNumber: true,
              max: { value: new Date().getFullYear(), message: 'Must be in the past' },
            })}
            error={errors.year}
          />
        </div>

        {/* Divisor e Botão */}
        <div className="my-16 lg:my-8 flex items-center relative">
          <hr className="flex-grow border-t border-light-grey" />
          <button
            type="submit"
            aria-label="Calculate age"
            className="bg-purple-custom p-4 lg:p-6 rounded-full absolute right-1/2 translate-x-1/2 lg:right-0 lg:translate-x-0 hover:bg-off-black transition-colors"
          >
            <ArrowIcon className="w-6 h-6 lg:w-10 lg:h-10" />
          </button>
        </div>
      </form>

      {/* Resultados */}
      <div className="text-5xl lg:text-8xl font-extrabold italic leading-tight">
        <h1><span className="text-purple-custom">{age ? age.years : '--'}</span> years</h1>
        <h1><span className="text-purple-custom">{age ? age.months : '--'}</span> months</h1>
        <h1><span className="text-purple-custom">{age ? age.days : '--'}</span> days</h1>
      </div>
    </div>
  );
};
